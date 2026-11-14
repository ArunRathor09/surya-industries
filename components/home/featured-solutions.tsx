"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Sun, Waypoints, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ServiceImage } from "@/components/services/service-image";
import { serviceImages } from "@/data/serviceImages";

const solutionCards: {
  slug: string;
  image: string;
  icon: LucideIcon;
}[] = [
  {
    slug: "ese-lightning-arresters",
    image: serviceImages["ese-lightning-arresters"],
    icon: ShieldCheck,
  },
  {
    slug: "earthing-electrode",
    image: serviceImages["earthing-electrode"],
    icon: Waypoints,
  },
  {
    slug: "solar-mounting-structures",
    image: serviceImages["solar-mounting-structures"],
    icon: Sun,
  },
];

export function FeaturedSolutions() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-y border-slate-200/70 bg-gradient-to-b from-white via-brand-cream/55 to-white px-5 py-20 dark:border-white/10 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:px-8 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 -top-44 -z-10 size-[30rem] rounded-full bg-brand-purple/[0.06] blur-[110px] dark:bg-brand-purple/15"
      />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
              {text.featuredSolutions.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {text.featuredSolutions.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {text.featuredSolutions.description}
            </p>
          </div>
          <Link
            className="group inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-purple/30 hover:text-brand-purple dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-orange-300/50 dark:hover:text-orange-200"
            href="/services"
          >
            {text.featuredSolutions.viewAll}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-brand-orange transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {solutionCards.map((solution, index) => {
            const card = text.featuredSolutions.cards[index];
            const Icon = solution.icon;

            return (
              <motion.article
                className="group overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_12px_42px_rgb(15_23_42/6%)] transition duration-300 hover:-translate-y-1 hover:border-brand-purple/20 hover:shadow-[0_24px_60px_rgb(15_23_42/12%)] dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20 dark:hover:border-orange-300/25"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                key={solution.slug}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Link
                  aria-label={`${card.title} — ${text.featuredSolutions.cardCta}`}
                  className="block rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-purple dark:focus-visible:ring-orange-300"
                  href={`/services/${solution.slug}`}
                >
                  <div className="relative aspect-[1.58] overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <ServiceImage
                      alt={card.imageAlt}
                      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      icon={Icon}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      src={solution.image}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/5"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-slate-950/75 dark:text-white">
                      <Icon aria-hidden="true" className="size-3.5 text-brand-purple dark:text-orange-300" />
                      {card.category}
                    </span>
                    <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full border border-white/40 bg-white/90 text-brand-purple shadow-lg transition group-hover:rotate-45 group-hover:bg-brand-orange group-hover:text-brand-navy dark:border-white/10 dark:bg-slate-950/80 dark:text-orange-200">
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-heading text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 min-h-[3rem] text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-purple transition-colors group-hover:text-orange-600 dark:text-orange-300 dark:group-hover:text-orange-200">
                      {text.featuredSolutions.cardCta}
                      <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
