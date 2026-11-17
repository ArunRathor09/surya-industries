"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Eye, GitCompareArrows, Plus } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { useEnquiryList } from "@/components/product/enquiry-context";
import { ProductVisual } from "@/components/product/product-visual";
import { getProductCategoryLabel, type Product } from "@/data/products";
import { formatPrice } from "@/lib/currency";

type ProductCardProps = {
  product: Product;
  compareSelected: boolean;
  compareDisabled: boolean;
  onCompare: (slug: string) => void;
  onQuickView: (product: Product) => void;
};

export function ProductCard({
  product,
  compareSelected,
  compareDisabled,
  onCompare,
  onQuickView,
}: ProductCardProps) {
  const { locale, text } = useLanguage();
  const { addProduct, hasProduct } = useEnquiryList();
  const added = hasProduct(product.slug);
  const categoryLabel = getProductCategoryLabel(product.category, text.catalog.categories);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgb(15_23_42/4%)] transition duration-300 hover:-translate-y-1 hover:border-brand-purple/20 hover:shadow-[0_22px_55px_rgb(15_23_42/12%)]  ">
      <div className="relative">
        <ProductVisual product={product} />
        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-purple shadow-sm   ">
          {categoryLabel}
        </span>
        <button
          aria-label={`${text.catalog.quickView}: ${product.name}`}
          className="absolute bottom-3 right-3 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 text-[10px] font-semibold text-slate-800 opacity-100 shadow-sm transition hover:bg-brand-purple hover:text-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
          onClick={() => onQuickView(product)}
          type="button"
        >
          <Eye aria-hidden="true" className="size-3.5" />
          {text.catalog.quickView}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-heading text-base font-semibold leading-6 text-slate-950 ">
          <Link
            className="rounded-sm outline-none transition hover:text-brand-purple focus-visible:underline "
            href={`/products/${product.slug}`}
            prefetch
          >
            {product.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 text-xs leading-6 text-slate-600 ">
          {product.summary}
        </p>
        <p className="mt-3 text-sm font-bold text-brand-purple ">
          {product.price == null
            ? locale === "hi" ? "कीमत के लिए संपर्क करें" : "Price on request"
            : formatPrice(product.price)}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            <button
              aria-pressed={added}
              className={`inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[10px] font-bold transition ${
                added
                  ? "bg-emerald-50 text-emerald-700  "
                  : "bg-brand-purple text-white hover:bg-purple-800"
              }`}
              disabled={added}
              onClick={() => addProduct(product.slug)}
              type="button"
            >
              {added ? (
                <Check aria-hidden="true" className="size-3.5" />
              ) : (
                <Plus aria-hidden="true" className="size-3.5" />
              )}
              {added ? text.catalog.addedToList : text.catalog.addToList}
            </button>
            <button
              aria-label={`${text.catalog.compare}: ${product.name}`}
              aria-pressed={compareSelected}
              className={`grid size-10 shrink-0 place-items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${
                compareSelected
                  ? "border-brand-orange bg-orange-50 text-brand-orange "
                  : "border-slate-200 text-slate-500 hover:border-brand-purple hover:text-brand-purple   "
              }`}
              disabled={compareDisabled}
              onClick={() => onCompare(product.slug)}
              title={text.catalog.compare}
              type="button"
            >
              <GitCompareArrows aria-hidden="true" className="size-4" />
            </button>
          </div>
          <Link
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 transition hover:text-brand-purple  "
            href={`/products/${product.slug}`}
            prefetch
          >
            {text.catalog.viewDetails}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
