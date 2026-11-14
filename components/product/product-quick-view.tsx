"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { useEnquiryList } from "@/components/product/enquiry-context";
import { ProductDialog } from "@/components/product/product-dialog";
import { ProductVisual } from "@/components/product/product-visual";
import { productCategories, type Product } from "@/data/products";

export function ProductQuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { text } = useLanguage();
  const { addProduct, hasProduct } = useEnquiryList();
  const categoryIndex = product ? productCategories.indexOf(product.category) : 0;
  const added = product ? hasProduct(product.slug) : false;

  return (
    <ProductDialog
      onClose={onClose}
      open={product !== null}
      title={product?.name ?? text.catalog.productDetails}
      size="max-w-4xl"
    >
      {product && (
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <ProductVisual product={product} />
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-xs font-bold transition ${
                  added
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : "bg-brand-purple text-white hover:bg-purple-800"
                }`}
                disabled={added}
                onClick={() => addProduct(product.slug)}
                type="button"
              >
                {added ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Plus aria-hidden="true" className="size-4" />
                )}
                {added ? text.catalog.addedToList : text.catalog.addToList}
              </button>
              <Link
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-5 text-xs font-semibold text-slate-700 transition hover:border-brand-purple hover:text-brand-purple dark:border-white/10 dark:text-slate-200 dark:hover:text-white"
                href={`/products/${product.slug}`}
                onClick={onClose}
              >
                {text.catalog.viewDetails}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple dark:text-orange-300">
                {text.catalog.categories[categoryIndex]}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold">
                {text.catalog.specifications}
              </h3>
              <dl className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 px-4 dark:divide-white/5 dark:border-white/10">
                {product.specifications.slice(0, 9).map((spec) => (
                  <div className="grid grid-cols-[0.8fr_1.2fr] gap-3 py-2.5 text-xs" key={spec.label}>
                    <dt className="text-slate-500 dark:text-slate-400">{spec.label}</dt>
                    <dd className="font-medium text-slate-800 dark:text-slate-200">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="font-heading text-sm font-semibold">{text.catalog.features}</h3>
              <ul className="mt-2 space-y-2">
                {product.features.slice(0, 5).map((feature) => (
                  <li className="flex gap-2 text-xs leading-5 text-slate-600 dark:text-slate-400" key={feature}>
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-orange" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </ProductDialog>
  );
}
