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
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_8px_28px_rgb(15_23_42/5%)] transition duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_24px_60px_rgb(15_23_42/13%)]">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50">
        <ProductVisual product={product} />
        <span className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-brand-purple shadow-sm backdrop-blur">
          {categoryLabel}
        </span>
        <button
          aria-label={`${text.catalog.quickView}: ${product.name}`}
          className="absolute bottom-4 right-4 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-3.5 text-[10px] font-semibold text-slate-800 opacity-100 shadow-lg transition hover:bg-brand-purple hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
          onClick={() => onQuickView(product)}
          type="button"
        >
          <Eye aria-hidden="true" className="size-3.5" />
          {text.catalog.quickView}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-5">
        <h2 className="line-clamp-2 min-h-12 font-heading text-base font-semibold leading-6 text-slate-950">
          <Link
            className="rounded-sm outline-none transition hover:text-brand-purple focus-visible:underline"
            href={`/products/${product.slug}`}
          >
            {product.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-600">
          {product.summary}
        </p>
        {product.specifications.length > 0 && (
          <div className="mt-4 flex min-h-7 flex-wrap gap-1.5">
            {product.specifications.slice(0, 2).map((spec) => (
              <span
                className="max-w-full truncate rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-medium text-slate-600"
                key={spec.label}
                title={`${spec.label}: ${spec.value}`}
              >
                {spec.label}: {spec.value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <p className="mb-4 border-t border-slate-100 pt-4 text-sm font-bold text-brand-purple">
            {product.price == null
              ? locale === "hi" ? "कीमत के लिए संपर्क करें" : "Price on request"
              : formatPrice(product.price)}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              aria-pressed={added}
              className={`inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-[10px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange ${
                added
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-brand-purple text-white shadow-md shadow-brand-purple/15 hover:bg-purple-800"
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
              className={`grid size-11 shrink-0 place-items-center rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-not-allowed disabled:opacity-40 ${
                compareSelected
                  ? "border-brand-orange bg-orange-50 text-brand-orange"
                  : "border-slate-200 text-slate-500 hover:border-brand-purple hover:bg-brand-purple/5 hover:text-brand-purple"
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
            className="mt-2 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border border-slate-200 text-[10px] font-semibold text-slate-700 transition hover:border-brand-purple/30 hover:bg-brand-purple/5 hover:text-brand-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
            href={`/products/${product.slug}`}
          >
            {text.catalog.viewDetails}
            <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
