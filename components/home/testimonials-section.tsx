"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Quote } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers";

export function TestimonialsSection() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const quote = text.testimonials.placeholderQuote[active];

  const goTo = (direction: -1 | 1) => {
    setActive(
      (current) =>
        (current + direction + text.testimonials.placeholderQuote.length) %
        text.testimonials.placeholderQuote.length,
    );
  };

  return (
    <section className="bg-brand-cream px-5 py-20 dark:bg-slate-900 sm:px-8 sm:py-28" id="testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
              {text.testimonials.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {text.testimonials.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              {text.testimonials.description}
            </p>
            <div className="mt-7 flex gap-2">
              <button
                aria-label={text.testimonials.previous}
                className="grid size-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-purple hover:bg-brand-purple hover:text-white dark:border-white/15 dark:text-white"
                onClick={() => goTo(-1)}
                type="button"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                aria-label={text.testimonials.next}
                className="grid size-11 place-items-center rounded-full border border-slate-300 text-slate-700 transition hover:border-brand-purple hover:bg-brand-purple hover:text-white dark:border-white/15 dark:text-white"
                onClick={() => goTo(1)}
                type="button"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>

          <div
            aria-label={text.testimonials.carouselLabel}
            aria-roledescription="carousel"
            className="relative min-h-[270px] overflow-hidden rounded-[1.75rem] bg-brand-navy p-6 text-white shadow-[0_24px_70px_rgb(15_23_42/16%)] sm:p-9"
          >
            <div aria-hidden="true" className="absolute -right-20 -top-20 size-60 rounded-full bg-brand-purple/25 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.article
                animate={{ opacity: 1, x: 0 }}
                aria-label={`${text.testimonials.slide} ${active + 1} of ${text.testimonials.placeholderQuote.length}`}
                aria-roledescription="slide"
                className="relative z-10"
                exit={{ opacity: 0, x: reduceMotion ? 0 : -14 }}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                key={`${active}-${quote}`}
                transition={{ duration: reduceMotion ? 0 : 0.22 }}
              >
                <Quote aria-hidden="true" className="size-7 fill-brand-orange text-brand-orange" />
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-orange-200">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-orange-300" />
                  {text.testimonials.placeholderTag}
                </div>
                <p className="mt-4 max-w-2xl font-heading text-lg font-medium leading-8 text-white sm:text-xl">
                  “{quote}”
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-white/10 text-orange-200">
                    <Building2 aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold">{text.testimonials.customer}</span>
                    <span className="mt-1 block text-[10px] text-slate-400">
                      {text.testimonials.company}
                    </span>
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <div aria-label={text.testimonials.clientLogosLabel} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              className="flex min-h-16 items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white/60 px-3 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:border-white/15 dark:bg-slate-950/30 dark:text-slate-500"
              key={index}
            >
              <Building2 aria-hidden="true" className="size-4 shrink-0" />
              {text.testimonials.logoPlaceholder}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
