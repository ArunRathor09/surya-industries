"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Crosshair, Ruler, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { products } from "@/data/products";

const mountingHeights = [2, 3, 5, 10, 20] as const;
const protectionLevels = [1, 2, 3, 4] as const;
const sigmatechStrikeDistances = [20, 30, 45, 60] as const;

type ESEModel = "guard" | "sigmatech";

function getRadius(model: ESEModel, height: number, level: number) {
  if (model === "guard") {
    const row = products[0].protectionRadius?.find(
      (radiusRow) => radiusRow.height === height,
    );
    if (!row) return 0;
    return row[`level${level}` as "level1" | "level2" | "level3" | "level4"];
  }

  const strikeDistance = sigmatechStrikeDistances[level - 1];
  const advanceDistance = 60;
  return Math.sqrt(
    height * (2 * strikeDistance - height) +
      advanceDistance * (2 * strikeDistance + advanceDistance),
  );
}

export function ProtectionCalculator() {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [model, setModel] = useState<ESEModel>("guard");
  const [height, setHeight] = useState<(typeof mountingHeights)[number]>(5);
  const [level, setLevel] = useState<(typeof protectionLevels)[number]>(2);

  const radius = useMemo(
    () => getRadius(model, height, level),
    [height, level, model],
  );
  const visualRadius = Math.min(115, Math.max(50, 42 + radius * 0.62));
  const buildingHeight = Math.min(112, 52 + height * 3);

  return (
    <section className="bg-white px-5 py-20  sm:px-8 sm:py-28" id="calculator">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-purple ">
            {text.calculator.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950  sm:text-4xl">
            {text.calculator.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600  sm:text-base">
            {text.calculator.description}
          </p>
        </div>

        <div className="mt-11 grid overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgb(15_23_42/8%)]   lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 sm:p-9">
            <label
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 "
              htmlFor="ese-model"
            >
              <Zap aria-hidden="true" className="size-4 text-brand-orange" />
              {text.calculator.model}
            </label>
            <select
              className="mt-2.5 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10   "
              id="ese-model"
              onChange={(event) => setModel(event.target.value as ESEModel)}
              value={model}
            >
              <option value="guard">{text.calculator.guard}</option>
              <option value="sigmatech">{text.calculator.sigmatech}</option>
            </select>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 "
                  htmlFor="mount-height"
                >
                  <Ruler aria-hidden="true" className="size-4 text-brand-purple" />
                  {text.calculator.height}
                </label>
                <select
                  className="mt-2.5 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10   "
                  id="mount-height"
                  onChange={(event) =>
                    setHeight(Number(event.target.value) as (typeof mountingHeights)[number])
                  }
                  value={height}
                >
                  {mountingHeights.map((value) => (
                    <option key={value} value={value}>
                      {value} m
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 "
                  htmlFor="protection-level"
                >
                  <ShieldCheck aria-hidden="true" className="size-4 text-brand-purple" />
                  {text.calculator.level}
                </label>
                <select
                  className="mt-2.5 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-brand-purple focus:ring-4 focus:ring-brand-purple/10   "
                  id="protection-level"
                  onChange={(event) =>
                    setLevel(Number(event.target.value) as (typeof protectionLevels)[number])
                  }
                  value={level}
                >
                  {protectionLevels.map((value, index) => (
                    <option key={value} value={value}>
                      {text.calculator.levelNames[index]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div aria-live="polite" className="mt-8 rounded-2xl bg-brand-navy p-5 text-white sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-300">
                    {text.calculator.result}
                  </p>
                  <motion.p
                    animate={reduceMotion ? undefined : { opacity: [0.65, 1] }}
                    className="mt-2 font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
                    key={`${model}-${height}-${level}`}
                  >
                    {Number.isInteger(radius) ? radius : radius.toFixed(1)}
                    <span className="ml-2 text-base font-medium text-orange-300">
                      {text.calculator.unit}
                    </span>
                  </motion.p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-orange-300">
                  <Crosshair aria-hidden="true" className="size-5" />
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500 ">
              {text.calculator.guardNote}
            </p>
          </div>

          <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-orange-50/50 to-violet-50 px-4 py-8    sm:min-h-[450px]">
            <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
            <svg
              aria-label={text.calculator.buildingLabel}
              className="relative z-10 h-full max-h-[390px] w-full max-w-[500px]"
              role="img"
              viewBox="0 0 360 260"
            >
              <defs>
                <linearGradient id="radius-fill" x1="180" x2="180" y1="30" y2="250">
                  <stop stopColor="#f58220" stopOpacity=".14" />
                  <stop offset="1" stopColor="#5b21b6" stopOpacity=".03" />
                </linearGradient>
              </defs>
              <motion.circle
                animate={{ r: visualRadius }}
                cx="180"
                cy="143"
                fill="url(#radius-fill)"
                initial={false}
                r={visualRadius}
                stroke="#f58220"
                strokeDasharray="7 7"
                strokeWidth="1.5"
                transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: "easeOut" }}
              />
              <path d="M37 204H323" stroke="#64748b" strokeOpacity=".35" strokeWidth="2" />
              <path d="M52 204v14m256-14v14M46 218h268" stroke="#64748b" strokeOpacity=".2" />
              <rect
                fill="#dbe4f0"
                height={buildingHeight}
                rx="3"
                stroke="#64748b"
                strokeOpacity=".55"
                width="52"
                x="154"
                y={204 - buildingHeight}
              />
              <path d={`M150 ${204 - buildingHeight}h60l-30-24-30 24Z`} fill="#5b21b6" />
              {Array.from({ length: 4 }, (_, row) =>
                [0, 1].map((column) => (
                  <rect
                    fill="#fff"
                    fillOpacity=".8"
                    height="8"
                    key={`${row}-${column}`}
                    rx="1"
                    width="7"
                    x={165 + column * 20}
                    y={204 - buildingHeight + 20 + row * 17}
                  />
                )),
              )}
              <path d="M180 83V43" stroke="#5b21b6" strokeLinecap="round" strokeWidth="2" />
              <path d="m180 31-7 13h14l-7-13Z" fill="#f58220" />
              <circle cx="180" cy="143" r="4" fill="#f58220" />
              <text
                fill="#64748b"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                textAnchor="middle"
                x="180"
                y="238"
              >
                {text.calculator.building}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
