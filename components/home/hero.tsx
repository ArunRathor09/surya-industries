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
  Sun,
  Waypoints,
} from "lucide-react";
import { useLanguage } from "@/components/providers";
import { ServiceImage } from "@/components/services/service-image";
import { serviceImages } from "@/data/serviceImages";
import { site } from "@/data/site";

const sparks = [
  { d: "M45 0 34 31h17L25 70l8-29H17z", x: "12%", y: "11%", delay: 0.1 },
  { d: "m28 0-8 23h12L13 52l6-21H7z", x: "87%", y: "17%", delay: 0.8 },
  { d: "m24 0-7 19h11L11 44l5-18H5z", x: "70%", y: "77%", delay: 1.4 },
];

const heroVideoUrl =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL ||
  "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4";

export function Hero() {
  const { locale, text } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-gradient-to-br from-white via-[#fffaf5] to-[#f6f3ff] pb-20 pt-32 text-slate-950 dark:from-slate-950 dark:via-slate-950 dark:to-[#18132b] dark:text-white sm:min-h-[820px] sm:pb-24 sm:pt-36 lg:min-h-[850px]"
      id="home"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="hero-grid absolute inset-0 opacity-[0.13]" />
        <div className="absolute -left-48 top-0 size-[38rem] rounded-full bg-brand-purple/8 blur-[140px] dark:bg-brand-purple/30" />
        <div className="absolute -right-36 top-24 size-[34rem] rounded-full bg-brand-orange/10 blur-[130px] dark:bg-brand-orange/20" />
        <div className="absolute -bottom-72 left-1/3 size-[40rem] rounded-full bg-amber-900/5 blur-[150px] dark:bg-amber-900/25" />
        {sparks.map((spark) => (
          <motion.svg
            animate={reduceMotion ? undefined : { opacity: [0.1, 0.9, 0.1], scale: [0.85, 1.1, 0.85] }}
            className="absolute text-orange-500/60 dark:text-orange-200/75"
            height="52"
            key={spark.x}
            style={{ left: spark.x, top: spark.y }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 3, delay: spark.delay, repeat: Infinity, ease: "easeInOut" }
            }
            viewBox="0 0 60 70"
            width="44"
          >
            <path d={spark.d} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.svg>
        ))}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <motion.path
            animate={reduceMotion ? undefined : { opacity: [0, 0.85, 0], pathLength: [0, 1, 0] }}
            d="M1010 -20 970 100 1018 152 958 270 1001 318 910 450"
            fill="none"
            initial={{ opacity: 0 }}
            stroke="url(#bolt)"
            strokeWidth="1.5"
            transition={
              reduceMotion
                ? undefined
                : { duration: 4.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }
            }
          />
          <defs>
            <linearGradient id="bolt" x1="0" x2="0.5" y1="0" y2="1">
              <stop stopColor="#F58220" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-5">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-7 inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.06]">
            <span className="grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
              <BadgeCheck aria-hidden="true" className="size-3.5" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-200 sm:text-xs">
              {text.heroEyebrow}
            </span>
          </div>

          <h1 className="max-w-3xl font-heading text-[2.65rem] font-semibold leading-[1.12] tracking-[-0.045em] sm:text-6xl lg:text-[4.35rem]">
            {text.heroTitle.split(" ").slice(0, -3).join(" ")}{" "}
            <span className="bg-gradient-to-r from-orange-600 via-brand-orange to-brand-purple bg-clip-text text-transparent dark:from-orange-300 dark:via-brand-orange dark:to-amber-400">
              {text.heroTitle.split(" ").slice(-3).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            {text.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-bold text-brand-navy shadow-[0_10px_40px_rgb(245_130_32/22%)] transition hover:-translate-y-0.5 hover:bg-orange-300"
              href="/#home-enquiry"
            >
              {text.quote}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-brand-purple/40 hover:bg-white dark:border-white/20 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/40 dark:hover:bg-white/10"
              href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`}
            >
              <Phone aria-hidden="true" className="size-4" />
              {text.callNow}
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-slate-600 transition hover:text-brand-purple dark:text-slate-300 dark:hover:text-white"
              download
              href="/brochure.pdf"
            >
              {text.brochure}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <p className="mt-7 font-heading text-sm font-medium text-brand-purple dark:text-orange-100/90" lang={locale}>
            {text.heroContact}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:text-slate-400">
            {text.badges.map((badge, index) => (
              <span className="inline-flex items-center gap-2" key={badge}>
                {index === 0 && <span className="size-1.5 rounded-full bg-emerald-400" />}
                {index > 0 && <span aria-hidden="true" className="hidden h-3 w-px bg-slate-300 dark:bg-white/15 sm:block" />}
                {badge}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
          className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:min-h-[550px]"
          initial={reduceMotion ? false : { opacity: 0, x: 24, scale: 0.97 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden="true" className="absolute size-[300px] rounded-full border border-slate-900/[0.08] dark:border-white/[0.08] sm:size-[410px]" />
          <div aria-hidden="true" className="absolute size-[240px] rounded-full border border-dashed border-orange-500/20 dark:border-orange-200/20 sm:size-[340px]" />
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, 0.7, 0] }}
            className="relative z-10 w-[88%] max-w-[500px]"
            transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative aspect-[0.95] overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_35px_90px_rgb(15_23_42/18%)] dark:border-white/10 dark:bg-slate-900">
              <ServiceImage
                alt="Solar panels at a utility-scale installation"
                className="absolute inset-0 h-full w-full"
                icon={Sun}
                priority
                sizes="(max-width: 1024px) 88vw, 42vw"
                src={serviceImages["solar-mounting-structures"]}
              />
              <video
                aria-hidden="true"
                autoPlay={!reduceMotion}
                className="absolute inset-0 h-full w-full object-cover"
                loop={!reduceMotion}
                muted
                playsInline
                preload="metadata"
                src={heroVideoUrl}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-slate-950/5"
              />
              <p className="absolute bottom-5 left-5 max-w-[68%] rounded-xl border border-white/15 bg-slate-950/35 px-3.5 py-3 text-xs leading-5 text-white shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:text-sm">
                {text.heroNote}
              </p>
            </div>
            <div className="absolute left-[5%] top-10 z-30 hidden w-[132px] overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-1.5 shadow-[0_18px_48px_rgb(15_23_42/22%)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 lg:block">
              <ServiceImage
                alt={text.heroEarthingAlt}
                className="relative aspect-[1.2] w-full rounded-xl"
                icon={Waypoints}
                sizes="132px"
                src={serviceImages["earthing-electrode"]}
              />
              <p className="px-1 pb-1 pt-2 text-center text-[8px] font-bold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
                {text.heroEarthingBadge}
              </p>
            </div>
            <div className="absolute bottom-4 right-[5%] z-30 hidden w-[126px] overflow-hidden rounded-2xl border border-white/80 bg-white/95 p-1.5 shadow-[0_18px_48px_rgb(15_23_42/25%)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 sm:block">
            <Image
              alt={text.heroImageAlt}
              className="h-[126px] w-full object-contain"
              height={320}
              src="/products/ese-lightning-arrester-placeholder.svg"
              width={320}
            />
              <p className="pb-1 text-center text-[8px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              {text.heroProductBadge}
              </p>
            </div>
          </motion.div>
          <div className="absolute bottom-7 left-2 z-20 rounded-2xl border border-slate-200 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75 sm:bottom-12 sm:left-0 sm:p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {text.ratedCurrent}
            </p>
            <p className="mt-1 font-heading text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">
              200<span className="ml-1 text-sm font-medium text-orange-300">kA</span>
            </p>
          </div>
          <div className="absolute right-0 top-10 z-20 rounded-2xl border border-slate-200 bg-white/90 p-3.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.08] sm:right-2 sm:top-16 sm:p-4">
            <p className="font-heading text-xl font-semibold text-slate-950 dark:text-white sm:text-2xl">20</p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500 dark:text-slate-300">
              {text.warranty}
            </p>
          </div>
        </motion.div>
      </div>

      <a
        aria-label={text.scrollExploreLabel}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-brand-purple dark:text-slate-400 dark:hover:text-white sm:flex"
        href="#stats"
      >
        {text.scrollExplore}
        <ArrowDown aria-hidden="true" className="size-3.5 animate-bounce" />
      </a>
    </section>
  );
}
