"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, Search, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ProductDialog } from "@/components/product/product-dialog";
import { getProductCategoryLabel, type Product } from "@/data/products";
import { site } from "@/data/site";

export function CommandPalette() {
  const { text } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const pages = site.navigation.map((item) => ({
    ...item,
    label: text.nav[item.label as keyof typeof text.nav],
  }));
  const categoryLabel = (category: string) =>
    getProductCategoryLabel(category, text.catalog.categories);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matchingPages = pages.filter((page) =>
    `${page.label} ${page.href}`.toLocaleLowerCase().includes(normalizedQuery),
  );
  const matchingProducts = catalogProducts
    .filter((product) =>
      `${product.name} ${product.category} ${product.summary}`
        .toLocaleLowerCase()
        .includes(normalizedQuery),
    )
    .slice(0, 6);

  useEffect(() => {
    if (!open) return;

    let active = true;
    setCatalogLoading(true);
    setCatalogError("");
    fetch("/api/products", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Product catalogue request failed (${response.status}).`);
        const products = (await response.json()) as Product[];
        if (active) setCatalogProducts(products);
      })
      .catch((error: unknown) => {
        console.error("Could not load products for site search.", error);
        if (active) setCatalogError("Product search could not be loaded.");
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    const handleOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("spi:open-search", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("spi:open-search", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <ProductDialog
      onClose={() => setOpen(false)}
      open={open}
      title={text.command.title}
      size="max-w-2xl"
    >
      <div className="p-4 sm:p-6">
        <label className="relative block">
          <span className="sr-only">{text.command.placeholder}</span>
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          />
          <input
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/10  "
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.command.placeholder}
            ref={inputRef}
            type="search"
            value={query}
          />
        </label>

        {catalogLoading && (
          <p className="mt-3 text-xs text-slate-500" role="status">
            Loading products...
          </p>
        )}
        {catalogError && (
          <p className="mt-3 text-xs text-rose-700" role="alert">
            {catalogError}
          </p>
        )}

        <div className="mt-5 max-h-[55dvh] space-y-5 overflow-y-auto">
          {matchingPages.length > 0 && (
            <section>
              <h3 className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {text.command.pages}
              </h3>
              <ul className="space-y-1">
                {matchingPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-brand-purple   "
                      href={page.href}
                      onClick={() => setOpen(false)}
                    >
                      <span className="inline-flex items-center gap-3">
                        <FileText aria-hidden="true" className="size-4 text-slate-400" />
                        {page.label}
                      </span>
                      <ArrowUpRight aria-hidden="true" className="size-4 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {matchingProducts.length > 0 && (
            <section>
              <h3 className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {text.command.products}
              </h3>
              <ul className="space-y-1">
                {matchingProducts.map((product) => (
                  <li key={product.slug}>
                    <Link
                      className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition hover:bg-slate-50 "
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <Zap aria-hidden="true" className="size-4 shrink-0 text-brand-orange" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-slate-800 ">
                            {product.name}
                          </span>
                          <span className="mt-0.5 block text-[10px] text-slate-500 ">
                            {categoryLabel(product.category)}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-slate-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {matchingPages.length === 0 && matchingProducts.length === 0 && (
            <p className="px-1 py-8 text-center text-sm text-slate-500 ">
              {text.command.noResults}
            </p>
          )}
        </div>
        <p className="mt-4 border-t border-slate-100 pt-4 text-[10px] text-slate-400 ">
          {text.command.keyboard}
        </p>
      </div>
    </ProductDialog>
  );
}
