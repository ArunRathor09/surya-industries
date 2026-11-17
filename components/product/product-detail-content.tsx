"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ProductDetailActions } from "@/components/product/product-detail-actions";
import { ProductVisual } from "@/components/product/product-visual";
import { useLanguage } from "@/components/providers";
import { getProductCategoryLabel, type Product } from "@/data/products";
import { formatPrice } from "@/lib/currency";

export function ProductDetailContent({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { locale, text } = useLanguage();
  const categoryLabel = getProductCategoryLabel(product.category, text.catalog.categories);

  return (
    <>
      <section className="bg-gradient-to-br from-white via-brand-cream to-[#f4f0ff] px-5 pb-12 pt-32    sm:px-8 sm:pb-16 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-purple  "
            href="/products"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {text.catalog.backToProducts}
          </Link>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="inline-flex rounded-full border border-brand-purple/15 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-purple   ">
                {categoryLabel}
              </p>
              <h1 className="mt-5 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-slate-950  sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600  sm:text-base">
                {product.description}
              </p>
              <p className="mt-4 font-heading text-lg font-semibold text-brand-purple ">
                {product.price == null
                  ? locale === "hi" ? "कीमत के लिए संपर्क करें" : "Price on request"
                  : formatPrice(product.price)}
              </p>
              <div className="mt-7">
                <ProductDetailActions slug={product.slug} />
              </div>
              <div className="mt-6 flex items-start gap-2 text-xs leading-5 text-slate-500 ">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-emerald-600 "
                />
                {text.badges.join(" · ")}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <ProductVisual product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple ">
              {text.catalog.productInformation}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 ">
              {text.catalog.technicalSpecifications}
            </h2>
            <dl className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5    sm:px-7">
              {product.specifications.map((spec) => (
                <div
                  className="grid gap-1 py-3.5 sm:grid-cols-[0.8fr_1.2fr] sm:gap-6"
                  key={spec.label}
                >
                  <dt className="text-xs font-medium text-slate-500 ">
                    {spec.label}
                  </dt>
                  <dd className="text-sm font-medium leading-6 text-slate-900 ">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5   sm:p-7">
              <h2 className="font-heading text-lg font-semibold text-slate-950 ">
                {text.catalog.keyFeatures}
              </h2>
              <ul className="mt-5 space-y-3">
                {product.features.map((feature) => (
                  <li
                    className="flex gap-2.5 text-sm leading-6 text-slate-600 "
                    key={feature}
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-brand-orange"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {product.applications && product.applications.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5   sm:p-7">
                <h2 className="font-heading text-lg font-semibold text-slate-950 ">
                  {text.catalog.suitableApplications}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <li
                      className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700  "
                      key={application}
                    >
                      {application}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      {product.guideSections && product.guideSections.length > 0 && (
        <section className="bg-slate-50 px-5 py-12  sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl space-y-5">
            {product.guideSections.map((guide) => (
              <article
                className="rounded-2xl border border-slate-200 bg-white p-5   sm:p-7"
                key={guide.title}
              >
                <h2 className="font-heading text-xl font-semibold text-slate-950 ">
                  {guide.title}
                </h2>
                {guide.paragraphs?.map((paragraph) => (
                  <p
                    className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 "
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
                {guide.bullets && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {guide.bullets.map((bullet) => (
                      <li
                        className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700  "
                        key={bullet}
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 text-brand-orange"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {guide.steps && (
                  <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                    {guide.steps.map((step, index) => (
                      <li
                        className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700  "
                        key={step}
                      >
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-purple/10 text-xs font-bold text-brand-purple  ">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                )}
                {guide.table && (
                  <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 ">
                    <table className="w-full min-w-[560px] text-left text-xs">
                      <thead className="bg-slate-100 text-slate-600  ">
                        <tr>
                          {guide.table.headers.map((header) => (
                            <th className="px-4 py-3 font-semibold" key={header}>
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 ">
                        {guide.table.rows.map((row) => (
                          <tr className="text-slate-700 " key={row.join("-")}>
                            {row.map((cell, index) =>
                              index === 0 ? (
                                <th
                                  className="px-4 py-3 font-semibold"
                                  key={`${index}-${cell}`}
                                  scope="row"
                                >
                                  {cell}
                                </th>
                              ) : (
                                <td className="px-4 py-3" key={`${index}-${cell}`}>
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {guide.note && (
                  <p className="mt-4 rounded-xl border border-orange-200/70 bg-orange-50/70 px-4 py-3 text-xs leading-6 text-slate-700   ">
                    {guide.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {product.protectionRadius && (
        <section className="bg-slate-50 px-5 py-12  sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple ">
                ESE terminal
              </p>
              <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 ">
                {text.catalog.radiusTitle}
              </h2>
              <p className="mt-2 text-xs leading-6 text-slate-500 ">
                {text.catalog.radiusDescription}
              </p>
            </div>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white  ">
              <table className="w-full min-w-[600px] text-left text-xs">
                <thead className="bg-slate-100 text-slate-600  ">
                  <tr>
                    <th className="px-5 py-4 font-semibold">
                      {text.catalog.heightMeters}
                    </th>
                    {[1, 2, 3, 4].map((level) => (
                      <th className="px-5 py-4 font-semibold" key={level}>
                        {text.catalog.protectionLevelMeters}{level} (m)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 ">
                  {product.protectionRadius.map((row) => (
                    <tr className="text-slate-700 " key={row.height}>
                      <th className="px-5 py-4 font-semibold">{row.height}</th>
                      {[row.level1, row.level2, row.level3, row.level4].map(
                        (radius, index) => (
                          <td className="px-5 py-4" key={`${row.height}-${index}`}>
                            {radius}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple ">
                  {categoryLabel}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 ">
                  {text.catalog.relatedProductsTitle}
                </h2>
              </div>
              <Link
                className="hidden items-center gap-1 text-xs font-semibold text-brand-purple hover:text-brand-orange  sm:inline-flex"
                href="/products"
              >
                {text.catalog.viewAllProducts}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <Link
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-lg  "
                  href={`/products/${related.slug}`}
                  key={related.slug}
                >
                  <ProductVisual compact product={related} />
                  <p className="mt-4 font-heading text-sm font-semibold leading-6 text-slate-900 transition group-hover:text-brand-purple  ">
                    {related.name}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500 ">
                    {related.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
