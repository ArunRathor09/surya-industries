"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { getWhatsAppUrl } from "@/lib/utils";

export function HomeCTA() {
  const { text } = useLanguage();
  const [whatsappHref, setWhatsappHref] = useState("");

  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const product = String(formData.get("product") ?? "");

    const message = [
      "Hello Surya Power Industries,",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Product interest: ${product}`,
      "Please contact me about a suitable solution.",
    ].join("\n");
    setWhatsappHref(getWhatsAppUrl(message));
  }

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-brand-cream to-[#f6f3ff] px-5 py-20 text-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-[#18132b] dark:text-white sm:px-8 sm:py-28" id="home-enquiry">
      <div aria-hidden="true" className="absolute -left-32 top-0 -z-10 size-[30rem] rounded-full bg-brand-purple/10 blur-[130px] dark:bg-brand-purple/35" />
      <div aria-hidden="true" className="absolute -right-32 bottom-0 -z-10 size-[26rem] rounded-full bg-brand-orange/10 blur-[120px] dark:bg-brand-orange/20" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple dark:text-orange-300">
            {text.cta.eyebrow}
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {text.cta.title}
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {text.cta.description}
          </p>
          <div className="mt-7 flex items-center gap-3 text-xs leading-5 text-slate-600 dark:text-slate-400">
            <ShieldCheck aria-hidden="true" className="size-5 shrink-0 text-brand-purple dark:text-orange-300" />
            {text.cta.formHint}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_24px_70px_rgb(15_23_42/12%)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07] sm:p-7">
          <form className="space-y-4" onSubmit={prepareEnquiry}>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200" htmlFor="quick-name">
                {text.cta.name}
              </label>
              <input
                autoComplete="name"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-300/70 dark:focus:ring-orange-300/10"
                id="quick-name"
                minLength={2}
                name="name"
                onInvalid={(event) => event.currentTarget.setCustomValidity(text.cta.nameError)}
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                placeholder={text.cta.name}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200" htmlFor="quick-phone">
                {text.cta.phone}
              </label>
              <input
                autoComplete="tel"
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-orange-300/70 dark:focus:ring-orange-300/10"
                id="quick-phone"
                name="phone"
                onInvalid={(event) => event.currentTarget.setCustomValidity(text.cta.phoneError)}
                onInput={(event) => event.currentTarget.setCustomValidity("")}
                pattern="[0-9+()\\s-]{8,20}"
                placeholder="+91 93073 35739"
                required
                type="tel"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700 dark:text-slate-200" htmlFor="quick-product">
                {text.cta.product}
              </label>
              <select
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none focus:border-brand-purple/50 focus:ring-4 focus:ring-brand-purple/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:focus:border-orange-300/70 dark:focus:ring-orange-300/10"
                defaultValue=""
                id="quick-product"
                name="product"
                required
              >
                <option className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white" disabled value="">
                  {text.cta.choose}
                </option>
                {text.cta.options.map((option) => (
                  <option className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white" key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 text-sm font-bold text-brand-navy transition hover:bg-orange-300"
              type="submit"
            >
              {text.cta.submit}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </button>
          </form>

          {whatsappHref && (
            <div
              aria-live="polite"
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-300/20 dark:bg-emerald-300/10"
              role="status"
            >
              <p className="flex items-start gap-2 text-xs leading-5 text-emerald-800 dark:text-emerald-100">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {text.cta.followUp}
              </p>
              <a
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 underline decoration-emerald-900/40 underline-offset-4 hover:text-brand-purple dark:text-white dark:decoration-white/40 dark:hover:text-orange-200"
                href={whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                {text.cta.continue}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
