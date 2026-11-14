"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Cable,
  ShieldCheck,
  Sun,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ServiceImage } from "@/components/services/service-image";
import { serviceImages } from "@/data/serviceImages";

const rangeIcons: LucideIcon[] = [Waypoints, ShieldCheck, Cable, Sun];

export function AboutSection() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-white px-5 py-20 dark:bg-slate-950 sm:px-8 sm:py-28"
      id="about"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-16 -z-10 size-[30rem] rounded-full bg-brand-purple/[0.055] blur-[120px] dark:bg-brand-purple/15"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
            {text.aboutSection.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {text.aboutSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
            {text.aboutSection.intro}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            {text.aboutSection.description}
          </p>

          <div className="mt-8">
            <h3 className="font-heading text-sm font-semibold text-slate-950 dark:text-white">
              {text.aboutSection.rangeTitle}
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {text.aboutSection.groups.map((group, index) => {
                const Icon = rangeIcons[index];
                return (
                  <div
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                    key={group.title}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-purple/10 text-brand-purple dark:bg-white/10 dark:text-orange-300">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {group.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            className="group mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-purple px-5 text-xs font-bold text-white shadow-lg shadow-brand-purple/15 transition hover:-translate-y-0.5 hover:bg-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            href="/products"
          >
            {text.aboutSection.cta}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-orange-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[560px]"
          initial={reduceMotion ? false : { opacity: 0, x: 18 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <div className="relative aspect-[1.06] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-slate-100 shadow-[0_30px_80px_rgb(15_23_42/14%)] dark:border-white/10 dark:bg-slate-900">
            <ServiceImage
              alt={text.aboutSection.imageAlt}
              className="absolute inset-0 h-full w-full"
              icon={Waypoints}
              sizes="(max-width: 1024px) 100vw, 45vw"
              src={serviceImages["earthing-electrode"]}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent"
            />
            <div className="absolute inset-x-5 bottom-28 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-32">
              <p className="max-w-[15rem] font-heading text-lg font-semibold leading-snug text-white sm:text-xl">
                {text.aboutSection.imageCaption}
              </p>
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/15 text-orange-200 shadow-lg backdrop-blur-md">
                <ShieldCheck aria-hidden="true" className="size-6" />
              </span>
            </div>
          </div>
          <div className="absolute -bottom-5 left-5 right-5 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_18px_50px_rgb(15_23_42/15%)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 sm:left-8 sm:right-8">
            {text.aboutSection.proofPoints.map((point, index) => (
              <div
                className={`p-4 sm:p-5 ${index === 0 ? "border-r border-slate-200 dark:border-white/10" : ""}`}
                key={point.value}
              >
                <p className="font-heading text-xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                  {point.value}
                </p>
                <p className="mt-1 text-[10px] font-medium leading-4 text-slate-500 dark:text-slate-400 sm:text-xs">
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
