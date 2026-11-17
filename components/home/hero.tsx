"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/components/providers";
import { serviceImages } from "@/data/serviceImages";
import { site } from "@/data/site";

// Pixabay stock clip "Solar, Panels, Solar Energy" (video 42388), compressed for the hero.
const heroVideoUrl = "/videos/hero-solar-panels.mp4";

export function Hero() {
  const { locale, text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[760px] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 pb-20 pt-32 text-white sm:min-h-[820px] sm:pb-24 sm:pt-36 lg:min-h-[min(900px,100svh)]"
      id="home"
    >
      <Image
        alt=""
        className="absolute inset-0 z-0 object-cover"
        fill
        priority
        sizes="100vw"
        src={serviceImages["solar-mounting-structures"]}
      />
      {!reduceMotion && (
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 z-[1] h-full w-full object-cover brightness-110"
          loop
          muted
          playsInline
          preload="none"
          src={heroVideoUrl}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(8,12,26,0.88)_0%,rgba(8,12,26,0.72)_48%,rgba(8,12,26,0.28)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(0deg,rgba(8,12,26,0.6)_0%,transparent_38%,rgba(8,12,26,0.14)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-1/4 z-[2] size-[34rem] rounded-full bg-brand-purple/20 blur-[130px]"
      />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 shadow-lg backdrop-blur-md">
            <span className="grid size-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/90 sm:text-xs">
              {text.heroEyebrow}
            </span>
          </div>

          <h1 className="max-w-3xl font-heading text-[2.65rem] font-semibold leading-[1.1] tracking-[-0.045em] sm:text-6xl lg:text-[4.35rem]">
            {text.heroTitle.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="bg-gradient-to-r from-orange-300 via-brand-orange to-violet-300 bg-clip-text text-transparent">
              {text.heroTitle.split(" ").slice(-3).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {text.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold text-brand-navy shadow-[0_10px_40px_rgb(245_130_32/28%)] transition hover:-translate-y-0.5 hover:bg-orange-300"
              href="/#home-enquiry"
            >
              {text.quote}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:border-white/60 hover:bg-white/20"
              href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`}
            >
              <Phone aria-hidden="true" className="size-4" />
              {text.callNow}
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-white/75 transition hover:text-white"
              download
              href="/brochure.pdf"
            >
              {text.brochure}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <p className="mt-7 font-heading text-sm font-medium text-orange-200" lang={locale}>
            {text.heroContact}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 sm:text-[11px]">
            {text.badges.map((badge, index) => (
              <span className="inline-flex items-center gap-2" key={badge}>
                {index === 0 && <span className="size-1.5 rounded-full bg-emerald-400" />}
                {index > 0 && (
                  <span aria-hidden="true" className="hidden h-3 w-px bg-white/30 sm:block" />
                )}
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative mx-auto w-full max-w-[470px] lg:justify-self-end"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-5 rounded-[2.5rem] border border-white/15" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950/45 p-4 shadow-[0_32px_100px_rgb(0_0_0/35%)] backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  {text.heroProductBadge}
                </p>
                <p className="mt-1 font-heading text-sm font-semibold text-white">
                  {text.heroImageAlt}
                </p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </span>
            </div>
            <div className="relative mt-4 grid aspect-[1.5] place-items-center overflow-hidden rounded-2xl bg-white">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(245,130,32,0.12),transparent_58%)]"
              />
              <Image
                alt={text.heroImageAlt}
                className="relative h-full w-full object-contain p-5"
                height={320}
                priority
                src="/products/ese-lightning-arrester-placeholder.svg"
                width={480}
              />
            </div>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs leading-5 text-white/75">
              {text.heroNote}
            </p>
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/15 bg-slate-950/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
              {text.ratedCurrent}
            </p>
            <p className="mt-1 font-heading text-xl font-semibold text-white">
              200<span className="ml-1 text-sm font-medium text-orange-300">kA</span>
            </p>
          </div>
          <div className="absolute -right-2 -top-5 rounded-2xl border border-white/15 bg-slate-950/75 px-4 py-3 text-right shadow-xl backdrop-blur-xl sm:-right-5">
            <p className="font-heading text-xl font-semibold text-white">20</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/55">
              {text.warranty}
            </p>
          </div>
        </motion.div>
      </div>

      <a
        aria-label={text.scrollExploreLabel}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65 transition hover:text-white sm:flex"
        href="#stats"
      >
        {text.scrollExplore}
        <ArrowDown aria-hidden="true" className="size-3.5 animate-bounce" />
      </a>
    </section>
  );
}
