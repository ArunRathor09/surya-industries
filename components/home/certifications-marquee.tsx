"use client";

import { useLanguage } from "@/components/providers";
import { site } from "@/data/site";

export function CertificationsMarquee() {
  const { text } = useLanguage();
  const badges = [
    ...site.certifications.slice(0, -1),
    text.testedBadge,
    text.labReportBadge,
  ];

  return (
    <section
      aria-label={text.certificationsLabel}
      className="overflow-hidden bg-brand-cream py-16  sm:py-20"
      id="certifications"
    >
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple ">
          {text.certificationHeading}
        </p>
        <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight text-slate-950  sm:text-2xl">
          {text.certificationNote}
        </h2>
      </div>

      <div className="relative mt-9 overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-brand-cream before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-brand-cream after:to-transparent   sm:before:w-32 sm:after:w-32">
        <div className="certification-track flex w-max items-center gap-3 pr-3">
          {[...badges, ...badges].map((badge, index) => (
            <div
              aria-hidden={index >= badges.length}
              className="flex min-h-[58px] min-w-[115px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-center text-xs font-bold tracking-wide text-slate-700 shadow-sm    sm:min-w-[140px] sm:text-sm"
              key={`${badge}-${index}`}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-orange" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
