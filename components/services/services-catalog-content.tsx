"use client";

import { ArrowDown } from "lucide-react";
import { ServiceCard } from "@/components/services/service-card";
import { useLanguage } from "@/components/providers";
import { services } from "@/data/services";

export function ServicesCatalogContent() {
  const { text } = useLanguage();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-cream to-[#f3efff] px-5 pb-12 pt-32 dark:from-slate-950 dark:via-slate-950 dark:to-[#19132c] sm:px-8 sm:pb-16 sm:pt-40">
        <div
          aria-hidden="true"
          className="absolute -right-36 -top-20 size-[30rem] rounded-full bg-brand-purple/8 blur-[120px] dark:bg-brand-purple/20"
        />
        <div className="relative mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-purple shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-orange-300">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
            {text.services.catalogEyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {text.services.catalogTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {text.services.catalogDescription}
          </p>
          <a
            className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-brand-purple transition hover:text-brand-orange dark:text-orange-300"
            href="#service-categories"
          >
            {text.services.allServices}
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-14" id="service-categories">
        <div className="mx-auto max-w-7xl space-y-14">
          {services.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <section
                aria-labelledby={`service-category-${categoryIndex}`}
                className="scroll-mt-24"
                key={category.title}
              >
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-violet-100 to-orange-50 text-brand-purple dark:from-violet-950/60 dark:to-orange-950/30 dark:text-orange-300">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        {text.services.categoryLabel}
                      </p>
                      <h2
                        className="mt-1 font-heading text-lg font-semibold text-slate-950 dark:text-white sm:text-xl"
                        id={`service-category-${categoryIndex}`}
                      >
                        {category.title}
                      </h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    {category.items.length} {text.services.serviceCount}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.items.map((item) => (
                    <ServiceCard
                      actionLabel={text.services.viewDetails}
                      category={category}
                      item={item}
                      key={item.slug}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
