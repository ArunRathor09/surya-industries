"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cable, CircleDot, Mountain, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers";

const icons = [Zap, Cable, CircleDot, Mountain];

export function HowItWorks() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-brand-cream px-5 py-20 dark:bg-slate-900 sm:px-8 sm:py-28" id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
            {text.how.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {text.how.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            {text.how.description}
          </p>
        </div>

        <div className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12%] right-[12%] top-9 hidden h-px bg-gradient-to-r from-brand-purple/10 via-brand-purple/40 to-brand-orange/20 lg:block"
          />
          {text.how.steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple/5 dark:border-white/10 dark:bg-slate-950 sm:p-6"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                key={step.title}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.25 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/20">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="font-heading text-sm font-semibold tracking-[0.15em] text-slate-300 dark:text-slate-700">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-lg font-semibold text-slate-950 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
                {index < text.how.steps.length - 1 && (
                  <ArrowDown
                    aria-hidden="true"
                    className="absolute -bottom-3 left-1/2 z-10 size-5 -translate-x-1/2 rounded-full bg-white text-brand-orange lg:hidden dark:bg-slate-950"
                  />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
