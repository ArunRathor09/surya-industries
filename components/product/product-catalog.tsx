"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ProductCard } from "@/components/product/product-card";
import { ProductCompareDialog } from "@/components/product/product-compare-dialog";
import { ProductQuickView } from "@/components/product/product-quick-view";
import {
  getProductCategoryLabel,
  type Product,
  type ProductCategory,
} from "@/data/products";

type CategoryFilter = ProductCategory | "All";
type SortOrder = "name-asc" | "name-desc" | "newest";

export function ProductCatalog({
  initialProducts,
  initialCategories,
}: {
  initialProducts: Product[];
  initialCategories: ProductCategory[];
}) {
  const { text } = useLanguage();
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-asc");
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareNotice, setCompareNotice] = useState("");
  const [quickProduct, setQuickProduct] = useState<Product | null>(null);

  const categories = useMemo(
    () => Array.from(new Set([...initialCategories, ...initialProducts.map((product) => product.category)])),
    [initialCategories, initialProducts],
  );

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const matched = initialProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchable = [
        product.name,
        product.category,
        product.summary,
        product.description,
        ...product.features,
        ...product.specifications.flatMap((spec) => [spec.label, spec.value]),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });

    return matched.sort((first, second) => {
      if (sortOrder === "newest") return second.id - first.id;
      const result = first.name.localeCompare(second.name);
      return sortOrder === "name-desc" ? -result : result;
    });
  }, [category, initialProducts, query, sortOrder]);

  const comparisonProducts = useMemo(
    () =>
      compareSlugs
        .map((slug) => initialProducts.find((product) => product.slug === slug))
        .filter((product): product is Product => product !== undefined),
    [compareSlugs, initialProducts],
  );

  function toggleCompare(slug: string) {
    setCompareNotice("");
    if (compareSlugs.includes(slug)) {
      setCompareSlugs(compareSlugs.filter((item) => item !== slug));
      return;
    }
    if (compareSlugs.length >= 3) {
      setCompareNotice(text.catalog.compareLimitReached);
      return;
    }
    setCompareSlugs([...compareSlugs, slug]);
  }

  function clearFilters() {
    setCategory("All");
    setQuery("");
    setSortOrder("name-asc");
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-cream to-[#f4f0ff] px-5 pb-12 pt-32    sm:px-8 sm:pb-16 sm:pt-40">
        <div aria-hidden="true" className="absolute -right-36 -top-20 size-[30rem] rounded-full bg-brand-purple/8 blur-[120px] " />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple shadow-sm   ">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
              {text.catalog.eyebrow}
            </p>
            <h1 className="mt-5 font-heading text-4xl font-semibold leading-tight tracking-tight text-slate-950  sm:text-5xl lg:text-6xl">
              {text.catalog.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600  sm:text-base">
              {text.catalog.description}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {text.badges.map((badge) => (
              <span
                className="rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-slate-600   "
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-label={text.catalog.eyebrow} className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900 ">
                  {text.catalog.showing} {visibleProducts.length} {text.catalog.products}
                </p>
                <p className="mt-1 text-[11px] text-slate-500 ">
                  {text.catalog.compareLimit}
                </p>
              </div>
              {compareSlugs.length > 0 && (
                <button
                  className="hidden text-[11px] font-semibold text-slate-500 underline underline-offset-4 hover:text-slate-900   sm:inline"
                  onClick={() => setCompareSlugs([])}
                  type="button"
                >
                  {text.catalog.remove} ({compareSlugs.length})
                </button>
              )}
            </div>

            <div aria-label={text.catalog.eyebrow} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <button
                aria-pressed={category === "All"}
                className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                  category === "All"
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/15"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand-purple/30 hover:text-brand-purple   "
                }`}
                onClick={() => setCategory("All")}
                type="button"
              >
                {text.catalog.all}
              </button>
              {categories.map((item) => (
                <button
                  aria-pressed={category === item}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                    category === item
                      ? "bg-brand-purple text-white shadow-md shadow-brand-purple/15"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-brand-purple/30 hover:text-brand-purple   "
                  }`}
                  key={item}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {getProductCategoryLabel(item, text.catalog.categories)}
                </button>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="relative block">
                <span className="sr-only">{text.catalog.searchLabel}</span>
                <Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/10   "
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={text.catalog.searchPlaceholder}
                  type="search"
                  value={query}
                />
                {query && (
                  <button
                    aria-label={text.catalog.clearFilters}
                    className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 hover:bg-slate-100 "
                    onClick={() => setQuery("")}
                    type="button"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                )}
              </label>
              <label className="relative flex min-h-12 items-center rounded-xl border border-slate-200 bg-white  ">
                <ArrowDownUp aria-hidden="true" className="ml-4 size-4 shrink-0 text-slate-400" />
                <span className="sr-only">{text.catalog.sortLabel}</span>
                <select
                  className="h-full min-h-12 min-w-40 flex-1 appearance-none bg-transparent px-3 text-xs font-medium text-slate-700 outline-none "
                  onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                  value={sortOrder}
                >
                  <option value="name-asc">{text.catalog.sortNameAsc}</option>
                  <option value="name-desc">{text.catalog.sortNameDesc}</option>
                  <option value="newest">{text.catalog.sortNewest}</option>
                </select>
              </label>
            </div>
          </div>

          {compareNotice && (
            <p aria-live="polite" className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-xs font-medium text-amber-900  " role="status">
              {compareNotice}
            </p>
          )}

          {visibleProducts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center ">
              <p className="font-heading text-lg font-semibold text-slate-900 ">
                {text.catalog.noResults}
              </p>
              <button
                className="mt-4 text-xs font-semibold text-brand-purple underline underline-offset-4 "
                onClick={clearFilters}
                type="button"
              >
                {text.catalog.clearFilters}
              </button>
            </div>
          ) : (
            <motion.div
              className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    initial={{ opacity: 0, y: 12 }}
                    key={product.slug}
                    layout
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard
                      compareDisabled={compareSlugs.length >= 3 && !compareSlugs.includes(product.slug)}
                      compareSelected={compareSlugs.includes(product.slug)}
                      onCompare={toggleCompare}
                      onQuickView={setQuickProduct}
                      product={product}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {compareSlugs.length >= 2 && (
        <div className="fixed inset-x-0 bottom-20 z-30 px-4 sm:bottom-6">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 p-3 pl-5 shadow-[0_16px_50px_rgb(15_23_42/16%)] backdrop-blur-xl  ">
            <span className="text-xs font-medium text-slate-600 ">
              {compareSlugs.length} / 3 {text.catalog.compare}
            </span>
            <button
              className="min-h-10 rounded-full bg-brand-purple px-5 text-xs font-bold text-white transition hover:bg-purple-800"
              onClick={() => setCompareOpen(true)}
              type="button"
            >
              {text.catalog.compareSelected}
            </button>
          </div>
        </div>
      )}

      <ProductQuickView onClose={() => setQuickProduct(null)} product={quickProduct} />
      <ProductCompareDialog
        onClose={() => setCompareOpen(false)}
        products={compareOpen ? comparisonProducts : []}
      />
    </>
  );
}
