"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers";

const stats = [
  { value: 12, english: "Years of experience" },
  { value: 15, english: "Product lines" },
  { value: 200, english: "Rated ESE terminals" },
  { value: 20, english: "ESE warranty" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let startTime = 0;
    const duration = 1100;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduceMotion) {
          setCount(value);
          return;
        }
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span className="font-heading text-3xl font-semibold tracking-tight text-slate-950  sm:text-4xl">
      <span ref={ref}>{count}</span>
      <span className="text-brand-orange">{suffix}</span>
    </span>
  );
}

export function StatsStrip() {
  const { text } = useLanguage();

  return (
    <section aria-label={text.statsLabel} className="relative z-10 -mt-7 px-4 sm:px-8" id="stats">
      <div className="mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_70px_rgb(15_23_42/12%)]   sm:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            className={`relative flex min-h-[122px] flex-col justify-center px-5 py-6 sm:min-h-[150px] sm:px-7 ${
              index % 2 === 0 ? "border-r border-slate-200 " : ""
            } ${
              index < 2 ? "border-b border-slate-200  sm:border-b-0" : ""
            } ${index === 1 ? "sm:border-r sm:border-slate-200 sm:" : ""} ${
              index === 2 ? "sm:border-r sm:border-slate-200 sm:" : ""
            }`}
            key={stat.english}
          >
            <CountUp value={stat.value} suffix={text.statSuffixes[index]} />
            <p className="mt-1.5 text-[11px] font-medium leading-5 text-slate-500  sm:text-xs">
              {text.stats[index]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
