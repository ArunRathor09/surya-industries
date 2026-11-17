"use client";

import { ArrowUpRight, Check, Plus } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { useEnquiryList } from "@/components/product/enquiry-context";

export function ProductDetailActions({ slug }: { slug: string }) {
  const { text } = useLanguage();
  const { addProduct, hasProduct, openDrawer } = useEnquiryList();
  const added = hasProduct(slug);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        aria-pressed={added}
        className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-bold transition ${
          added
            ? "bg-emerald-50 text-emerald-700  "
            : "bg-brand-purple text-white shadow-lg shadow-brand-purple/15 hover:bg-purple-800"
        }`}
        disabled={added}
        onClick={() => addProduct(slug)}
        type="button"
      >
        {added ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Plus aria-hidden="true" className="size-4" />
        )}
        {added ? text.catalog.addedToList : text.catalog.addToList}
      </button>
      <button
        className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-brand-purple hover:text-brand-purple    "
        onClick={() => {
          addProduct(slug);
          openDrawer();
        }}
        type="button"
      >
        {text.catalog.datasheet}
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
