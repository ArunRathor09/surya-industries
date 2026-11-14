"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceEnquireButton } from "@/components/services/service-enquire-button";
import { ServiceImage } from "@/components/services/service-image";
import { getServiceContent } from "@/data/serviceContent";
import { services, type ServiceItem } from "@/data/services";

export function ServiceDetailContent({
  categoryTitle,
  item,
  relatedServices,
}: {
  categoryTitle: string;
  item: ServiceItem;
  relatedServices: ServiceItem[];
}) {
  const { text } = useLanguage();
  const category = services.find((service) => service.title === categoryTitle);
  if (!category) {
    throw new Error(`Unknown SPI service category "${categoryTitle}".`);
  }
  const Icon = category.icon;
  const content = getServiceContent(category);

  return (
    <>
      <section className="bg-gradient-to-br from-white via-brand-cream to-[#f3efff] px-5 pb-12 pt-32 dark:from-slate-950 dark:via-slate-950 dark:to-[#19132c] sm:px-8 sm:pb-16 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-purple dark:text-slate-400 dark:hover:text-orange-300"
            href="/services"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {text.services.backToServices}
          </Link>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-purple/15 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-orange-300">
                <Icon aria-hidden="true" className="size-3.5" />
                {category.title}
              </p>
              <h1 className="mt-5 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                {item.label}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {content.description}
              </p>
              <div className="mt-7">
                <ServiceEnquireButton item={item} />
              </div>
              <div className="mt-5 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                <Check
                  aria-hidden="true"
                  className="size-4 text-emerald-600 dark:text-emerald-400"
                />
                {text.badges.join(" · ")}
              </div>
            </div>
            <ServiceImage
              alt={item.label}
              className="order-1 aspect-[1.25] w-full rounded-[1.5rem] border border-white/80 shadow-[0_24px_70px_rgb(15_23_42/12%)] dark:border-white/10 lg:order-2"
              icon={Icon}
              sizes="(max-width: 1024px) 100vw, 55vw"
              src={item.image}
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple dark:text-orange-300">
              {text.services.detailsEyebrow}
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
              {text.services.keyPoints}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {item.label} — {content.description}
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-brand-purple transition hover:text-brand-orange dark:text-orange-300"
              href="/services"
            >
              {text.services.allServices}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {content.keyPoints.map((point) => (
              <li
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
                key={point}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-slate-50 px-5 py-12 dark:bg-white/[0.03] sm:px-8 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-purple dark:text-orange-300">
                  {category.title}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-slate-950 dark:text-white">
                  {text.services.related}
                </h2>
              </div>
              <Link
                className="hidden items-center gap-1 text-xs font-semibold text-brand-purple hover:text-brand-orange dark:text-orange-300 sm:inline-flex"
                href="/services"
              >
                {text.services.allServices}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <ServiceCard
                  actionLabel={text.services.viewDetails}
                  category={category}
                  item={related}
                  key={related.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
