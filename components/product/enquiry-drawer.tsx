"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { getProductCategoryLabel, type Product } from "@/data/products";
import { useEnquiryList } from "@/components/product/enquiry-context";
import { ProductVisual } from "@/components/product/product-visual";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/utils";

export function EnquiryDrawer() {
  const { text } = useLanguage();
  const {
    productSlugs,
    isDrawerOpen,
    closeDrawer,
    removeProduct,
    clearProducts,
  } = useEnquiryList();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogError, setCatalogError] = useState("");

  const enquiryMessage = [
    text.enquiry.whatsappIntro,
    ...selectedProducts.map((product) => `- ${product.name}`),
    "",
    text.enquiry.whatsappClosing,
  ].join("\n");
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(
    "SPI product enquiry",
  )}&body=${encodeURIComponent(enquiryMessage)}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isDrawerOpen && !dialog.open) dialog.showModal();
    if (!isDrawerOpen && dialog.open) dialog.close();
  }, [isDrawerOpen]);

  useEffect(() => {
    if (!isDrawerOpen || productSlugs.length === 0) {
      setSelectedProducts([]);
      setCatalogLoading(false);
      setCatalogError("");
      return;
    }

    let active = true;
    const query = new URLSearchParams();
    productSlugs.forEach((slug) => query.append("slug", slug));
    setCatalogLoading(true);
    setCatalogError("");

    fetch(`/api/products?${query}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Selected products request failed (${response.status}).`);
        const products = (await response.json()) as Product[];
        if (!active) return;

        const productBySlug = new Map(products.map((product) => [product.slug, product]));
        setSelectedProducts(
          productSlugs
            .map((slug) => productBySlug.get(slug))
            .filter((product): product is Product => product !== undefined),
        );
        productSlugs
          .filter((slug) => !productBySlug.has(slug))
          .forEach(removeProduct);
      })
      .catch((error: unknown) => {
        console.error("Could not load selected SPI products.", error);
        if (active) setCatalogError("Selected products could not be loaded. Close and reopen the list to retry.");
      })
      .finally(() => {
        if (active) setCatalogLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isDrawerOpen, productSlugs, removeProduct]);

  return (
    <dialog
      aria-label={text.enquiry.title}
      className="fixed inset-y-0 right-0 m-0 ml-auto h-full max-h-full w-full max-w-[500px] overflow-hidden border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/45 backdrop:backdrop-blur-sm  "
      onCancel={(event) => {
        event.preventDefault();
        closeDrawer();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDrawer();
      }}
      ref={dialogRef}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-200 px-5 py-5  sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple ">
                {productSlugs.length} {text.catalog.products}
              </p>
              <h2 className="mt-1 font-heading text-xl font-semibold">
                {text.enquiry.title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-slate-500 ">
                {text.enquiry.description}
              </p>
            </div>
            <button
              aria-label={text.enquiry.close}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100   "
              onClick={closeDrawer}
              type="button"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>

        {catalogLoading ? (
          <p className="flex flex-1 items-center justify-center px-8 text-sm text-slate-500" role="status">
            Loading selected products...
          </p>
        ) : catalogError ? (
          <p className="m-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert">
            {catalogError}
          </p>
        ) : selectedProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-brand-purple/10 text-brand-purple  ">
              <MessageCircle aria-hidden="true" className="size-7" />
            </span>
            <h3 className="mt-5 font-heading text-lg font-semibold">
              {text.enquiry.emptyTitle}
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500 ">
              {text.enquiry.emptyDescription}
            </p>
            <Link
              className="mt-6 rounded-full bg-brand-purple px-5 py-3 text-xs font-semibold text-white transition hover:bg-purple-800"
              href="/products"
              onClick={closeDrawer}
            >
              {text.enquiry.addMore}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-5 sm:p-7">
              {selectedProducts.map((product) => (
                <li
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 "
                  key={product.slug}
                >
                  <ProductVisual compact product={product} />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-xs font-semibold leading-5">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500 ">
                      {getProductCategoryLabel(product.category, text.catalog.categories)}
                    </p>
                  </div>
                  <button
                    aria-label={`${text.enquiry.remove}: ${product.name}`}
                    className="rounded-lg px-2 py-1 text-[10px] font-semibold text-red-600 transition hover:bg-red-50  "
                    onClick={() => removeProduct(product.slug)}
                    type="button"
                  >
                    {text.catalog.remove}
                  </button>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-slate-200 p-5  sm:p-7">
              <a
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1ea95a] px-5 text-sm font-bold text-white transition hover:bg-[#168f4b]"
                href={getWhatsAppUrl(enquiryMessage)}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {text.enquiry.sendWhatsApp}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50   "
                href={mailto}
              >
                <Mail aria-hidden="true" className="size-4" />
                {text.enquiry.sendEmail}
              </a>
              <div className="flex items-center justify-between pt-1">
                <button
                  className="text-[11px] font-medium text-slate-500 underline underline-offset-4 hover:text-slate-900  "
                  onClick={clearProducts}
                  type="button"
                >
                  {text.enquiry.clear}
                </button>
                <Link
                  className="text-[11px] font-semibold text-brand-purple hover:text-brand-orange "
                  href="/products"
                  onClick={closeDrawer}
                >
                  {text.enquiry.addMore}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
