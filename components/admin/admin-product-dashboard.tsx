"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  Boxes,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Eye,
  EyeOff,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Menu,
  PackagePlus,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Tags,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  productCategories,
  type Product,
  type ProductCategory,
} from "@/data/products";
import { BrandLogo } from "@/components/shared/brand-logo";
import { formatPrice } from "@/lib/currency";

type Draft = Omit<Product, "id">;
type AdminSessionResponse = { authenticated?: boolean; error?: string };

function emptyDraft(category: ProductCategory): Draft {
  return {
    slug: "",
    name: "",
    category,
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

export function AdminProductDashboard({ mode }: { mode: "dashboard" | "login" }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([...productCategories]);
  const [activeView, setActiveView] = useState<"products" | "categories">("products");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");
  const [productPage, setProductPage] = useState(1);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
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

  async function loadCategories() {
    const response = await fetch("/api/admin/categories", { cache: "no-store" });
    if (!response.ok) throw new Error(await responseError(response));
    setCategories((await response.json()) as ProductCategory[]);
  }

  useEffect(() => {
    let active = true;
    let sessionVerified = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then(async (response) => {
        const body = (await response.json()) as AdminSessionResponse;
        if (!response.ok) throw new Error(body.error ?? "Could not check admin access.");
        if (active && !body.authenticated && mode === "dashboard") {
          router.replace("/admin/login");
        } else if (active && body.authenticated) {
          sessionVerified = true;
          setAuthenticated(true);
          if (mode === "login") router.replace("/admin");
          else await Promise.all([loadProducts(), loadCategories()]);
        }
      })
      .catch((cause: unknown) => {
        if (active) {
          setError(cause instanceof Error ? cause.message : "Could not check admin access.");
          if (mode === "dashboard" && !sessionVerified) router.replace("/admin/login");
        }
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, [mode, router]);

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
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / pageSize));
  const currentPage = Math.min(productPage, pageCount);
  const pageProducts = visibleProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const pricedProducts = products.filter((product) => product.price != null).length;
  const categoryCount = categories.length;

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
      setPasswordVisible(false);
      router.replace("/admin");
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
      router.replace("/admin/login");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign out.");
    } finally {
      setBusy(false);
    }
  }

  function openCreate(category = categories[0] ?? "") {
    clearImageSelection();
    setEditingId(null);
    setDraft(emptyDraft(category));
    setPriceInput("");
    setError("");
  }

  function openEdit(product: Product) {
    clearImageSelection();
    setEditingId(product.id);
    setDraft(makeDraft(product));
    setPriceInput(product.price == null ? "" : String(product.price));
    setError("");
  }

  function closeEditor() {
    clearImageSelection();
    setDraft(null);
    setEditingId(null);
  }

  function clearImageSelection() {
    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImageFile(null);
    setImagePreview("");
    setUploadedImageUrl("");
    setUploadingImage(false);
  }

  function chooseProductImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp", "image/avif"].includes(file.type)) {
      setError("Choose a JPEG, PNG, WebP, or AVIF image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Choose an image smaller than 5 MB.");
      return;
    }

    if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setError("");
    setImageFile(file);
    setUploadedImageUrl("");
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadProductImage(file: File) {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/admin/product-images", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error(await responseError(response));

      const result = (await response.json()) as { url?: string };
      if (!result.url?.startsWith("https://")) {
        throw new Error("Image upload did not return a valid secure URL.");
      }
      setUploadedImageUrl(result.url);
      setImagePreview(result.url);
      return result.url;
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!response.ok) throw new Error(await responseError(response));
      const created = (await response.json()) as { name: string };
      await loadCategories();
      setNewCategoryName("");
      setCategoryDialogOpen(false);
      setNotice(`Category "${created.name}" is ready for products and the public catalogue.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not create category.");
    } finally {
      setBusy(false);
    }
  }

  async function saveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;

    setBusy(true);
    setError("");
    setNotice("");
    const price = priceInput.trim() === "" ? null : Number(priceInput);
    if (
      price !== null &&
      (!Number.isFinite(price) || price < 0)
    ) {
      setError("Enter a valid non-negative price, or leave the field blank.");
      setBusy(false);
      return;
    }

    try {
      const image = imageFile
        ? uploadedImageUrl || await uploadProductImage(imageFile)
        : draft.image;
      const payload = {
        ...draft,
        image,
        imageAlt: imageFile
          ? draft.imageAlt.trim() || imageFile.name.replace(/\.[^.]+$/, "")
          : draft.imageAlt,
        price,
        slug: slugify(draft.slug || draft.name),
      };
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
      setProductPage(1);
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
      setProductPage(1);
      setNotice(`${product.name} was removed from the catalogue.`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete product.");
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession || (mode === "login" && authenticated)) {
    if (mode === "login") {
      return (
        <div className="grid min-h-screen place-items-center bg-slate-50 px-5">
          <div className="flex items-center gap-3">
            <BrandLogo compact />
            <span className="font-heading text-sm font-bold text-slate-900">
              Surya Power Industries
            </span>
            <LoaderCircle
              aria-label="Checking admin session"
              className="ml-2 size-5 animate-spin text-brand-purple"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="grid min-h-[70vh] place-items-center px-5">
        <LoaderCircle aria-label="Checking admin session" className="size-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (mode === "login") {
    return (
      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-50 px-5 py-12">
        <div aria-hidden="true" className="absolute -left-32 -top-32 size-96 rounded-full bg-brand-purple/10 blur-[110px]" />
        <div aria-hidden="true" className="absolute -bottom-40 -right-20 size-[28rem] rounded-full bg-brand-orange/10 blur-[120px]" />
        <section className="relative w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_rgb(15_23_42/10%)] sm:p-9">
          <div className="flex items-center gap-3">
            <BrandLogo compact />
            <p className="font-heading text-sm font-bold tracking-tight text-slate-900">
              Surya Power Industries
            </p>
          </div>
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
              <span className="relative mt-2 block">
                <input
                  autoComplete="current-password"
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                  aria-pressed={passwordVisible}
                  className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-slate-500 transition hover:text-brand-purple focus-visible:outline-offset-[-3px]"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  type="button"
                >
                  {passwordVisible ? (
                    <EyeOff aria-hidden="true" className="size-4" />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" />
                  )}
                </button>
              </span>
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
        </section>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="grid min-h-[70vh] place-items-center px-5">
        <LoaderCircle aria-label="Redirecting to admin sign in" className="size-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] lg:flex">
      {mobileSidebarOpen && (
        <button
          aria-label="Close admin navigation"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          type="button"
        />
      )}
      <aside
        aria-label="Admin sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <BrandLogo compact />
          <div>
            <p className="font-heading text-xs font-bold tracking-wide text-slate-900">
              SURYA POWER
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Admin console
            </p>
          </div>
        </div>
        <p className="px-6 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.17em] text-slate-400">
          Workspace
        </p>
        <nav aria-label="Admin navigation" className="space-y-1 px-3">
          <button
            aria-current={activeView === "products" ? "page" : undefined}
            className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${
              activeView === "products"
                ? "bg-brand-purple/10 text-brand-purple"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
            onClick={() => {
              setActiveView("products");
              setCategory("All");
              setQuery("");
              setProductPage(1);
              setMobileSidebarOpen(false);
            }}
            type="button"
          >
            <Boxes aria-hidden="true" className="size-4" />
            <span className="flex-1">Products</span>
            <span className="text-xs tabular-nums">{products.length}</span>
          </button>
          <button
            aria-current={activeView === "categories" ? "page" : undefined}
            className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${
              activeView === "categories"
                ? "bg-brand-purple/10 text-brand-purple"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
            onClick={() => {
              setActiveView("categories");
              setMobileSidebarOpen(false);
            }}
            type="button"
          >
            <Tags aria-hidden="true" className="size-4" />
            <span className="flex-1">Categories</span>
            <span className="text-xs tabular-nums">{categories.length}</span>
          </button>
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 p-4">
          <Link
            className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-brand-purple"
            href="/products"
          >
            <ArrowDownToLine aria-hidden="true" className="size-4 rotate-[-90deg]" />
            View public catalogue
          </Link>
          <button
            className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700 disabled:opacity-60"
            disabled={busy}
            onClick={signOut}
            type="button"
          >
            <LogOut aria-hidden="true" className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label={mobileSidebarOpen ? "Close admin navigation" : "Open admin navigation"}
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 lg:hidden"
              onClick={() => setMobileSidebarOpen((open) => !open)}
              type="button"
            >
              {mobileSidebarOpen ? (
                <X aria-hidden="true" className="size-4" />
              ) : (
                <Menu aria-hidden="true" className="size-4" />
              )}
            </button>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Surya Power Industries / Admin
              </p>
              <h1 className="truncate font-heading text-lg font-semibold text-slate-950 sm:text-xl">
                {activeView === "products" ? "Products" : "Categories"}
              </h1>
            </div>
          </div>
          {activeView === "products" ? (
            <button
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-brand-purple px-3.5 text-xs font-bold text-white transition hover:bg-purple-800 sm:px-4"
              onClick={() => openCreate()}
              type="button"
            >
              <Plus aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Add product</span>
              <span className="sm:hidden">Add</span>
            </button>
          ) : (
            <button
              className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl bg-brand-purple px-3.5 text-xs font-bold text-white transition hover:bg-purple-800 sm:px-4"
              onClick={() => {
                setError("");
                setNewCategoryName("");
                setCategoryDialogOpen(true);
              }}
              type="button"
            >
              <Plus aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Add category</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-7 lg:px-10">
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              {activeView === "products"
                ? "Create, update, price, and publish your product listings."
                : "Create categories, see product counts, and add products directly to a category."}
            </p>
          </div>

        <section aria-label="Catalogue overview" className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total products", value: products.length, Icon: Boxes, tone: "text-brand-purple bg-violet-50 " },
            { label: "Active categories", value: categoryCount, Icon: PackagePlus, tone: "text-orange-600 bg-orange-50 " },
            { label: "Products with pricing", value: pricedProducts, Icon: CircleDollarSign, tone: "text-emerald-700 bg-emerald-50 " },
          ].map(({ label, value, Icon, tone }) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-5  " key={label}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500 ">{label}</p>
                <span className={`grid size-9 place-items-center rounded-xl ${tone}`}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="mt-4 font-heading text-3xl font-semibold text-slate-950 ">{value}</p>
            </article>
          ))}
        </section>

        {(error || notice) && (
          <div
            className={`mt-5 flex items-start justify-between gap-4 rounded-xl px-4 py-3 text-sm ${
              error
                ? "border border-rose-200 bg-rose-50 text-rose-800   "
                : "border border-emerald-200 bg-emerald-50 text-emerald-800   "
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

        {activeView === "products" ? (
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4  sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <h2 className="font-heading text-lg font-semibold text-slate-950 ">Product catalogue</h2>
              <p className="mt-1 text-[11px] text-slate-500 ">
                Showing {visibleProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                {"–"}
                {Math.min(currentPage * pageSize, visibleProducts.length)} of{" "}
                {visibleProducts.length} products
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative">
                <span className="sr-only">Search products</span>
                <Search aria-hidden="true" className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-xs outline-none focus:border-brand-purple sm:w-56   "
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setProductPage(1);
                  }}
                  placeholder="Search products..."
                  value={query}
                />
              </label>
              <label>
                <span className="sr-only">Filter by category</span>
                <select
                  className="min-h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-brand-purple sm:w-48   "
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setProductPage(1);
                  }}
                  value={category}
                >
                  <option value="All">All categories</option>
                  {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Boxes aria-hidden="true" className="mx-auto size-8 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-700 ">No products match this search.</p>
              <p className="mt-1 text-xs text-slate-500">Try another name or category.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="divide-y divide-slate-100"
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                key={currentPage}
                transition={{ duration: 0.18 }}
              >
              {pageProducts.map((product) => (
                <article className="flex flex-col gap-4 p-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:px-5 " key={product.id}>
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-orange-50 to-violet-50 text-brand-purple   ">
                    <Boxes aria-hidden="true" className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-900 ">{product.name}</h3>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600  ">
                        {product.category}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-500 ">{product.summary}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="min-w-28 text-sm font-bold text-slate-900 ">
                      {product.price == null ? <span className="text-xs font-medium text-slate-400">Price on request</span> : formatPrice(product.price)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        aria-label={`Edit ${product.name}`}
                        className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-purple hover:text-brand-purple  "
                        onClick={() => openEdit(product)}
                        type="button"
                      >
                        <Pencil aria-hidden="true" className="size-3.5" />
                      </button>
                      <button
                        aria-label={`Delete ${product.name}`}
                        className="grid size-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600   "
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
              </motion.div>
            </AnimatePresence>
          )}
          {pageCount > 1 && (
            <nav
              aria-label="Product pages"
              className="flex flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
            >
              <p className="text-xs text-slate-500">
                Page <span className="font-semibold text-slate-800">{currentPage}</span> of{" "}
                <span className="font-semibold text-slate-800">{pageCount}</span>
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Previous product page"
                  className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-brand-purple/40 hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setProductPage((page) => Math.max(1, page - 1))}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" className="size-4" />
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    aria-current={page === currentPage ? "page" : undefined}
                    aria-label={`Go to product page ${page}`}
                    className={`grid size-9 place-items-center rounded-lg text-xs font-semibold transition ${
                      page === currentPage
                        ? "bg-brand-purple text-white shadow-sm"
                        : "border border-slate-200 text-slate-600 hover:border-brand-purple/40 hover:text-brand-purple"
                    }`}
                    key={page}
                    onClick={() => setProductPage(page)}
                    type="button"
                  >
                    {page}
                  </button>
                ))}
                <button
                  aria-label="Next product page"
                  className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-brand-purple/40 hover:text-brand-purple disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === pageCount}
                  onClick={() => setProductPage((page) => Math.min(pageCount, page + 1))}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </nav>
          )}
          </section>
        ) : (
          <section className="mt-6">
            <div className="mb-5">
              <h2 className="font-heading text-lg font-semibold text-slate-950">
                Product categories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View each category&apos;s product count or add a new product directly to it.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((item) => {
                const count = products.filter((product) => product.category === item).length;
                return (
                  <article
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-purple/30 hover:shadow-md"
                    key={item}
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-brand-purple">
                        <Tags aria-hidden="true" className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-slate-900">{item}</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {count} {count === 1 ? "product listed" : "products listed"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-brand-purple/30 hover:text-brand-purple"
                        onClick={() => {
                          setCategory(item);
                          setQuery("");
                          setActiveView("products");
                          setMobileSidebarOpen(false);
                        }}
                        type="button"
                      >
                        View products <ArrowRight aria-hidden="true" className="size-3.5" />
                      </button>
                      <button
                        className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-brand-purple/10 px-3 text-xs font-semibold text-brand-purple transition hover:bg-brand-purple/15"
                        onClick={() => openCreate(item)}
                        type="button"
                      >
                        <Plus aria-hidden="true" className="size-3.5" />
                        Add product
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <p className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-500 ">
          <ShieldCheck aria-hidden="true" className="size-3.5 text-emerald-600" />
          Protected admin session · changes are stored in your product database
        </p>
      </div>
      </div>

      {draft && (
        <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6">
          <section aria-labelledby="product-editor-title" aria-modal="true" className="my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]" role="dialog">
            <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4  sm:px-7">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-purple ">
                  Catalogue editor
                </p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-slate-950 " id="product-editor-title">
                  {editingId ? "Update product" : "Add a product"}
                </h2>
              </div>
              <button aria-label="Close editor" className="grid size-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100 " onClick={closeEditor} type="button">
                <X aria-hidden="true" className="size-4" />
              </button>
            </header>

            {error && (
              <p className="mx-5 mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800 sm:mx-7" role="alert">
                {error}
              </p>
            )}

            <form className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7" onSubmit={saveProduct}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold text-slate-700  sm:col-span-2">
                  Product name *
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10   "
                    maxLength={180}
                    onChange={(event) => {
                      const name = event.target.value;
                      setDraft({ ...draft, name, ...(editingId === null ? { slug: slugify(name) } : {}) });
                    }}
                    required
                    value={draft.name}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700 ">
                  Category *
                  <select
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple   "
                    onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                    value={draft.category}
                    required
                  >
                    {categories.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
                <label className="text-xs font-semibold text-slate-700 ">
                  Price (INR)
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple   "
                    min="0"
                    onChange={(event) => setPriceInput(event.target.value)}
                    placeholder="Leave empty for quote-based pricing"
                    step="0.01"
                    type="number"
                    value={priceInput}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700  sm:col-span-2">
                  URL slug *
                  <input
                    className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple   "
                    maxLength={180}
                    onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
                    placeholder={slugify(draft.name) || "product-name"}
                    value={draft.slug}
                  />
                  <span className="mt-1 block font-normal text-slate-400">Used in the public product page URL.</span>
                </label>
                <label className="text-xs font-semibold text-slate-700  sm:col-span-2">
                  Short description *
                  <textarea
                    className="mt-2 min-h-20 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-brand-purple   "
                    maxLength={500}
                    onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
                    required
                    value={draft.summary}
                  />
                </label>
                <label className="text-xs font-semibold text-slate-700  sm:col-span-2">
                  Product details
                  <textarea
                    className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-normal leading-6 outline-none focus:border-brand-purple   "
                    onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                    value={draft.description}
                  />
                </label>
                <section aria-label="Product image" className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:col-span-2">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative grid aspect-square w-full max-w-36 shrink-0 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-300">
                      {(imagePreview || draft.image) ? (
                        <Image
                          alt={draft.imageAlt || `${draft.name || "Product"} image preview`}
                          className="object-cover"
                          fill
                          sizes="144px"
                          src={imagePreview || draft.image}
                          unoptimized
                        />
                      ) : (
                        <ImagePlus aria-hidden="true" className="size-9" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">Product image</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Browse your device. JPEG, PNG, WebP or AVIF, up to 5 MB. Images are optimized for the website.
                      </p>
                      <label className="mt-3 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-brand-purple/40 hover:text-brand-purple">
                        <Upload aria-hidden="true" className="size-4" />
                        Browse image
                        <input
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          className="sr-only"
                          disabled={busy}
                          onChange={chooseProductImage}
                          type="file"
                        />
                      </label>
                      {imageFile && (
                        <p className="mt-2 max-w-xs truncate text-[11px] text-slate-500">
                          Selected: {imageFile.name}
                        </p>
                      )}
                      {uploadingImage && (
                        <p className="mt-2 text-[11px] font-medium text-brand-purple" role="status">
                          Uploading and optimizing image...
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Image URL (optional)
                      <input
                        className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple"
                        onChange={(event) => {
                          clearImageSelection();
                          setDraft({ ...draft, image: event.target.value });
                        }}
                        placeholder="https://example.com/product-photo.jpg"
                        value={draft.image}
                      />
                    </label>
                    <label className="text-xs font-semibold text-slate-700">
                      Image description
                      <input
                        className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-brand-purple"
                        onChange={(event) => setDraft({ ...draft, imageAlt: event.target.value })}
                        value={draft.imageAlt}
                      />
                    </label>
                  </div>
                </section>
              </div>
              <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 border-t border-slate-200 bg-white pt-4 pb-1">
                <button className="min-h-10 rounded-full px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100  " onClick={closeEditor} type="button">
                  Cancel
                </button>
                <button className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-purple px-5 text-xs font-bold text-white transition hover:bg-purple-800 disabled:opacity-60" disabled={busy || uploadingImage} type="submit">
                  {busy ? <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> : <Check aria-hidden="true" className="size-3.5" />}
                  {uploadingImage ? "Uploading image..." : editingId ? "Save changes" : "Publish product"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
      {categoryDialogOpen && (
        <div className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
          <section
            aria-labelledby="category-editor-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-brand-purple">
                  Catalogue setup
                </p>
                <h2 className="mt-1 font-heading text-xl font-semibold text-slate-950" id="category-editor-title">
                  Add a category
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  It will be available in the product form and public catalogue filters.
                </p>
              </div>
              <button
                aria-label="Close category form"
                className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                onClick={() => setCategoryDialogOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            {error && (
              <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800" role="alert">
                {error}
              </p>
            )}
            <form className="mt-5 space-y-4" onSubmit={saveCategory}>
              <label className="block text-xs font-semibold text-slate-700">
                Category name
                <input
                  autoFocus
                  className="mt-2 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-normal outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10"
                  maxLength={80}
                  onChange={(event) => setNewCategoryName(event.target.value)}
                  placeholder="e.g. Solar Mounting"
                  required
                  value={newCategoryName}
                />
              </label>
              <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
                <button
                  className="min-h-10 rounded-full px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  onClick={() => setCategoryDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-purple px-5 text-xs font-bold text-white transition hover:bg-purple-800 disabled:opacity-60"
                  disabled={busy || newCategoryName.trim().length < 2}
                  type="submit"
                >
                  {busy ? <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> : <Check aria-hidden="true" className="size-3.5" />}
                  Create category
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
