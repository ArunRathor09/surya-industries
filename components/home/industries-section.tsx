"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  Building,
  Factory,
  Fuel,
  Plane,
  RadioTower,
  Route,
  Sun,
  Trophy,
  Wind,
  Zap,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers";
import { industries, industriesHindi } from "@/data/industries";

const icons: Record<string, LucideIcon> = {
  "radio-tower": RadioTower,
  fuel: Fuel,
  wind: Wind,
  plane: Plane,
  zap: Zap,
  sun: Sun,
  factory: Factory,
  building: Building,
  trophy: Trophy,
  atom: Atom,
  route: Route,
};

export function IndustriesSection() {
  const { locale, text } = useLanguage();
  const reduceMotion = useReducedMotion();
  const list = locale === "hi" ? industriesHindi : industries;

  return (
    <section className="bg-brand-cream px-5 py-20 text-slate-950   sm:px-8 sm:py-28" id="industries">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple ">
              {text.industriesSection.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {text.industriesSection.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600  sm:text-base">
              {text.industriesSection.description}
            </p>
          </div>
          <Link
            className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-slate-300 px-5 text-xs font-semibold text-slate-700 transition hover:border-brand-purple/40 hover:bg-white    "
            href="/#home-enquiry"
          >
            {text.industriesSection.cta}
            <ArrowUpRight aria-hidden="true" className="size-4 text-orange-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((industry, index) => {
            const Icon = icons[industry.icon];
            return (
              <motion.article
                className="group flex min-h-[145px] gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-brand-purple/20 hover:shadow-xl hover:shadow-brand-purple/5     sm:p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                key={industry.name}
                transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple transition group-hover:bg-brand-orange group-hover:text-brand-navy  ">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-sm font-semibold text-slate-950 ">
                    {industry.name}
                  </h3>
                  <p                   className="mt-2 text-xs leading-5 text-slate-600 ">
                    {industry.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
