"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  Boxes,
  Check,
  CircleDollarSign,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  PackagePlus,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import {
  productCategories,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { formatPrice } from "@/lib/currency";

type Draft = Omit<Product, "id">;
type AdminSessionResponse = { authenticated?: boolean; error?: string };

function emptyDraft(): Draft {
  return {
    slug: "",
    name: "",
    category: "Earthing",
    price: null,
    summary: "",
    description: "",
    specifications: [],
    features: [],
    applications: [],
    image: "",
    imageAlt: "",
  };
}

function makeDraft(product: Product): Draft {
  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    price: product.price ?? null,
    summary: product.summary,
    description: product.description,
    specifications: product.specifications,
    features: product.features,
    applications: product.applications,
    image: product.image,
    imageAlt: product.imageAlt,
    guideSections: product.guideSections,
    protectionRadius: product.protectionRadius,
  };
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function responseError(response: Response) {
  const body = (await response.json().catch(() => ({}))) as { error?: string };
  return body.error ?? `Request failed (${response.status}).`;
}

export function AdminProductDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadProducts() {
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    if (!response.ok) throw new Error(await responseError(response));
    setProducts((await response.json()) as Product[]);
  }

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (response) => {
        const body = (await response.json()) as AdminSessionResponse;
        if (!response.ok) throw new Error(body.error ?? "Could not check admin access.");
        if (active && body.authenticated) {
          setAuthenticated(true);
          await loadProducts();
        }
      })
      .catch((cause: unknown) => {
        if (active) setError(cause instanceof Error ? cause.message : "Could not check admin access.");
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [product.name, product.category, product.summary, product.slug]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, products, query]);

  const pricedProducts = products.filter((product) => product.price != null).length;
  const categoryCount = new Set(products.map((product) => product.category)).size;

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      setAuthenticated(true);
      setPassword("");
      await loadProducts();
    } catch (cause) {
      setAuthenticated(false);
      setError(cause instanceof Error ? cause.message : "Admin sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/session", { method: "DELETE" });
      if (!response.ok) throw new Error(await responseError(response));
      setAuthenticated(false);
      setProducts([]);
      setNotice("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign out.");
    } finally {
      setBusy(false);
    }
  }

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft());
    setPriceInput("");
    setError("");
  }

  function openEdit(product: Product) {
    setEditingId(product.id);
    setDraft(makeDraft(product));
    setPriceInput(product.price == null ? "" : String(product.price));
    setError("");
  }

  function closeEditor() {
    setDraft(null);
    setEditingId(null);
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;

    setBusy(true);
    setError("");
    setNotice("");
    const payload = {
      ...draft,
      price: priceInput.trim() === "" ? null : Number(priceInput),
      slug: slugify(draft.slug || draft.name),
    };
    if (
      payload.price !== null &&
      (!Number.isFinite(payload.price) || payload.price < 0)
    ) {
      setError("Enter a valid non-negative price, or leave the field blank.");
      setBusy(false);
      return;
    }

    try {
      const response = await fetch(
        editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) throw new Error(await responseError(response));
      await loadProducts();
      closeEditor();
      setNotice(editingId ? "Product updated and published." : "Product added to the catalogue.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save product.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct(product: Product) {
    if (!window.confirm(`Delete “${product.name}” from the public catalogue?`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(await responseError(response));
      await loadProducts();
      setNotice(`${product.name} was removed from the catalogue.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete product.");
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-5">
        <LoaderCircle aria-label="Checking admin session" className="size-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-slate-950 px-5 py-20">
        <div aria-hidden="true" className="absolute -left-32 -top-32 size-96 rounded-full bg-brand-purple/30 blur-[110px]" />
        <div aria-hidden="true" className="absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-brand-orange/15 blur-[120px]" />
        <section className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
          <div className="grid size-12 place-items-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/20">
            <ShieldCheck aria-hidden="true" className="size-6" />
          </div>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple">
            Surya Power Industries
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-slate-950">
            Admin sign in
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Secure access to your product catalogue, categories and pricing.
          </p>

          {error && (
            <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-800" role="alert">
              {error}
            </p>
          )}

          <form className="mt-7 space-y-4" onSubmit={signIn}>
            <label className="block text-xs font-semibold text-slate-700">
              Admin email
              <input
                autoComplete="username"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>
            <label className="block text-xs font-semibold text-slate-700">
              Password
              <input
                autoComplete="current-password"
                className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-purple px-5 text-sm font-bold text-white transition hover:bg-purple-800 disabled:cursor-wait disabled:opacity-70"
              disabled={busy}
              type="submit"
            >
              {busy && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
              Sign in to dashboard
            </button>
          </form>
          <p className="mt-5 text-center text-[11px] leading-5 text-slate-500">
            Configure database and admin credentials using <code>.env.local</code>.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-[#f7f8fc] px-4 py-8 dark:bg-slate-950 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/15">
              <LayoutDashboard aria-hidden="true" className="size-5" />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-purple dark:text-orange-300">
                Surya Power Industries
              </p>
              <h1 className="font-heading text-xl font-semibold text-slate-950 dark:text-white">
                Product studio
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition hover:border-brand-purple/40 hover:text-brand-purple dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
              href="/products"
            >
              <ArrowDownToLine aria-hidden="true" className="size-3.5 rotate-[-90deg]" />
              View public catalogue
            </Link>
            <button
              className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-rose-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300"
              onClick={signOut}
              title="Sign out"
              type="button"
            >
              <LogOut aria-hidden="true" className="size-4" />
            </button>
          </div>
        </header>

        <section className="mt-8 overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#1a1235] via-[#291957] to-[#44208d] p-6 text-white shadow-xl shadow-brand-purple/10 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-orange-200">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Live catalogue management
              </span>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Your products, <span className="text-orange-300">beautifully organized.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                Create listings, update pricing and manage every category from one workspace.
                Changes publish to the website as soon as they are saved.
              </p>
            </div>
            <button
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-5 text-sm font-bold text-brand-navy transition hover:bg-orange-300"
              onClick={openCreate}
              type="button"
            >
              <Plus aria-hidden="true" className="size-4" />
              Add a product
            </button>
          </div>
        </section>

        <section aria-label="Catalogue overview" className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total products", value: products.length, Icon: Boxes, tone: "text-brand-purple bg-violet-50 dark:bg-violet-400/10" },
            { label: "Active categories", value: categoryCount, Icon: PackagePlus, tone: "text-orange-600 bg-orange-50 dark:bg-orange-400/10" },
            { label: "Products with pricing", value: pricedProducts, Icon: CircleDollarSign, tone: "text-emerald-700 bg-emerald-50 dark:bg-emerald-400/10" },
          ].map(({ label, value, Icon, tone }) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900" key={label}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
                <span className={`grid size-9 place-items-center rounded-xl ${tone}`}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="mt-4 font-heading text-3xl font-semibold text-slate-950 dark:text-white">{value}</p>
            </article>
          ))}
        </section>

        {(error || notice) && (
          <div
            className={`mt-5 flex items-start justify-between gap-4 rounded-xl px-4 py-3 text-sm ${
              error
                ? "border border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200"
                : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200"
            }`}
            role={error ? "alert" : "status"}
          >
            <span>{error || notice}</span>
            <button
              aria-label="Dismiss message"
              className="shrink-0 opacity-70 hover:opacity-100"
              onClick={() => {
                setError("");
                setNotice("");
              }}
              type="button"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-950 dark:text-white">Product catalogue</h2>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {visibleProducts.length} of {products.length} products
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative">
                <span className="sr-only">Search products</span>
                <Search aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs outline-none focus:border-brand-purple sm:w-56 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products..."
                  value={query}
                />
              </label>
              <label>
                <span className="sr-only">Filter by category</span>
                <select
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-brand-purple sm:w-48 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                  onChange={(event) => setCategory(event.target.value as ProductCategory | "All")}
                  value={category}
                >
                  <option value="All">All categories</option>
                  {productCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Boxes aria-hidden="true" className="mx-auto size-8 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-200">No products match this search.</p>
              <p className="mt-1 text-xs text-slate-500">Try another name or category.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {visibleProducts.map((product) => (
                <article className="flex flex-col gap-4 p-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:px-5 dark:hover:bg-white/[0.03]" key={product.id}>
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-violet-50 text-brand-purple dark:from-orange-400/10 dark:to-violet-400/10 dark:text-orange-300">
                    <Boxes aria-hidden="true" className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">{product.name}</h3>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        {product.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{product.summary}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="min-w-28 text-sm font-bold text-slate-900 dark:text-white">
                      {product.price == null ? <span className="text-xs font-medium text-slate-400">Price on request</span> : formatPrice(product.price)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        aria-label={`Edit ${product.name}`}
                        className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-purple hover:text-brand-purple dark:border-white/10 dark:text-slate-300"
                        onClick={() => openEdit(product)}
                        type="button"
                      >
                        <Pencil aria-hidden="true" className="size-3.5" />
                      </button>
                      <button
                        aria-label={`Delete ${product.name}`}
                        className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-white/10 dark:text-slate-300 dark:hover:bg-rose-400/10"
                        disabled={busy}
                        onClick={() => removeProduct(product)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <p className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <ShieldCheck aria-hidden="true" className="size-3.5 text-emerald-600" />
          Protected admin session · changes are stored in your product database
        </p>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
          <section aria-labelledby="product-editor-title" aria-modal="true" className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900" role="dialog">
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10 sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-purple dark:text-orange-300">
                  Catalogue editor
                </p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-slate-950 dark:text-white" id="product-editor-title">
                  {editingId ? "Update product" : "Add a product"}
                </h2>
              </div>
              <button aria-label="Close editor" className="grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" onClick={closeEditor} type="button">
                <X aria-hidden="true" className="size-4" />
              </button>
            </header>

            <form className="max-h-[75vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-7" onSubmit={saveProduct}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                  Product name *
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10 dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    maxLength={180}
                    onChange={(event) => {
                      const name = event.target.value;
                      setDraft({ ...draft, name, ...(editingId === null ? { slug: slugify(name) } : {}) });
                    }}
                    required
                    value={draft.name}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Category *
                  <select
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    onChange={(event) => setDraft({ ...draft, category: event.target.value as ProductCategory })}
                    value={draft.category}
                  >
                    {productCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Price (INR)
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    min="0"
                    onChange={(event) => setPriceInput(event.target.value)}
                    placeholder="Leave empty for quote-based pricing"
                    step="0.01"
                    type="number"
                    value={priceInput}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                  URL slug *
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    maxLength={180}
                    onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                    placeholder={slugify(draft.name) || "product-name"}
                    value={draft.slug}
                  />
                  <span className="mt-1 block font-normal text-slate-400">Used in the public product page URL.</span>
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                  Short description *
                  <textarea
                    className="mt-2 min-h-20 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    maxLength={500}
                    onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                    required
                    value={draft.summary}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
                  Product details
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                    value={draft.description}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Image URL (optional)
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                    placeholder="https://example.com/product-photo.jpg"
                    value={draft.image}
                  />
                  <span className="mt-1 block font-normal text-slate-400">Use a full HTTPS URL; leave empty to use the product illustration.</span>
                </label>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Image description
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple dark:border-white/10 dark:bg-slate-950 dark:text-white"
                    onChange={(event) => setDraft({ ...draft, imageAlt: event.target.value })}
                    value={draft.imageAlt}
                  />
                </label>
              </div>
              <div className="flex flex-wrap justify-end gap-2 border-t border-slate-200 pt-4 dark:border-white/10">
                <button className="min-h-10 rounded-full px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10" onClick={closeEditor} type="button">
                  Cancel
                </button>
                <button className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-purple px-5 text-xs font-bold text-white transition hover:bg-purple-800 disabled:opacity-60" disabled={busy} type="submit">
                  {busy ? <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> : <Check aria-hidden="true" className="size-3.5" />}
                  {editingId ? "Save changes" : "Publish product"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
