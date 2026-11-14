"use client";

import Link from "next/link";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { faqs, faqsHindi } from "@/data/faqs";

export function FAQSection() {
  const { locale, text } = useLanguage();
  const items = locale === "hi" ? faqsHindi : faqs;

  return (
    <section className="bg-white px-5 py-20 dark:bg-slate-950 sm:px-8 sm:py-28" id="faq">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
            {text.faq.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {text.faq.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {text.faq.description}
          </p>
          <div className="mt-8 rounded-2xl bg-brand-cream p-5 dark:bg-slate-900">
            <MessageCircleQuestion aria-hidden="true" className="size-5 text-brand-purple dark:text-orange-300" />
            <p className="mt-4 font-heading text-sm font-semibold text-slate-950 dark:text-white">
              {text.faq.contact}
            </p>
            <Link
              className="mt-3 inline-flex text-xs font-semibold text-brand-purple underline decoration-brand-purple/30 underline-offset-4 transition hover:text-brand-orange dark:text-orange-300"
              href="/#home-enquiry"
            >
              {text.faq.contactCta}
            </Link>
          </div>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
          {items.map((item, index) => (
            <details className="group py-5" key={item.question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg text-left font-heading text-sm font-semibold text-slate-900 marker:hidden focus-visible:outline-brand-orange dark:text-white sm:text-base">
                <span className="flex items-start gap-4">
                  <span className="mt-0.5 font-heading text-[10px] font-semibold tracking-[0.16em] text-brand-orange">
                    0{index + 1}
                  </span>
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="ml-9 mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
