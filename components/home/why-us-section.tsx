"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  CircleCheck,
  CircleDollarSign,
  Factory,
  Flame,
  Gauge,
  PlugZap,
  ShieldCheck,
  TestTube2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/providers";

const reasons: LucideIcon[] = [
  Award,
  TestTube2,
  BadgeCheck,
  Zap,
  ShieldCheck,
  CircleDollarSign,
  Gauge,
  Factory,
  CircleCheck,
];

const benefitIcons: LucideIcon[] = [
  PlugZap,
  ShieldCheck,
  CircleDollarSign,
  Gauge,
  Zap,
  Flame,
];

export function WhyUsSection() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white px-5 py-20 dark:bg-slate-950 sm:px-8 sm:py-28" id="why-us">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
            {text.why.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {text.why.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            {text.why.description}
          </p>
        </div>

        <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {text.why.cards.map((card, index) => {
            const Icon = reasons[index];
            const featured = index === 0;
            return (
              <motion.article
                className={`group rounded-2xl border p-5 transition hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                  featured
                    ? "border-brand-purple bg-brand-purple text-white shadow-lg shadow-brand-purple/15"
                    : "border-slate-200 bg-white hover:border-brand-purple/20 hover:shadow-brand-purple/5 dark:border-white/10 dark:bg-slate-900"
                }`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                key={card.title}
                transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <span
                  className={`grid size-10 place-items-center rounded-xl ${
                    featured
                      ? "bg-white/15 text-orange-200"
                      : "bg-brand-purple/10 text-brand-purple dark:bg-white/10 dark:text-orange-300"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3
                  className={`mt-5 font-heading text-base font-semibold ${
                    featured ? "text-white" : "text-slate-950 dark:text-white"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-6 ${
                    featured ? "text-purple-100" : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 grid gap-8 rounded-[1.75rem] bg-brand-cream p-6 dark:bg-slate-900 sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple dark:text-orange-300">
              {text.why.benefitsEyebrow}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-3xl">
              {text.why.benefitsTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {text.why.benefitsDescription}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {text.why.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <li
                  className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-4 text-sm font-medium leading-6 text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200"
                  key={benefit}
                >
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-orange" />
                  {benefit}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
