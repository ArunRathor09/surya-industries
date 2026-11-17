"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/providers";
import { services } from "@/data/services";

export function MobileServicesAccordion({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="rounded-xl">
      <button
        aria-controls={expanded ? "mobile-services-categories" : undefined}
        aria-expanded={expanded}
        className="flex min-h-12 w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange  "
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        {text.services.navLabel}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-slate-400 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id="mobile-services-categories"
            initial={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="space-y-1 px-2 pb-2">
              <Link
                className="flex min-h-11 items-center rounded-lg px-3 text-xs font-bold text-brand-purple hover:bg-brand-purple/[0.06]  "
                href="/services"
                onClick={onNavigate}
              >
                {text.services.allServices}
              </Link>
              {services.map((category) => {
                const Icon = category.icon;
                const categoryOpen = activeCategory === category.title;
                const panelId = `mobile-service-${category.title
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll("&", "and")}`;
                return (
                  <section
                    className="rounded-lg border border-slate-100 "
                    key={category.title}
                  >
                    <button
                      aria-controls={categoryOpen ? panelId : undefined}
                      aria-expanded={categoryOpen}
                      aria-label={`${text.services.expandCategory}: ${category.title}`}
                      className="flex min-h-11 w-full items-center gap-2 rounded-lg px-3 text-left text-[10px] font-bold tracking-[0.1em] text-slate-700 transition hover:bg-slate-50  "
                      onClick={() =>
                        setActiveCategory(categoryOpen ? null : category.title)
                      }
                      type="button"
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-4 shrink-0 text-brand-purple "
                      />
                      <span className="flex-1">{category.title}</span>
                      <ChevronDown
                        aria-hidden="true"
                        className={`size-3.5 shrink-0 transition-transform ${
                          categoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {categoryOpen && (
                        <motion.ul
                          animate={{ height: "auto", opacity: 1 }}
                          className="overflow-hidden"
                          exit={{ height: 0, opacity: 0 }}
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0.01 : 0.2 }}
                        >
                          <li className="space-y-0.5 px-2 pb-2">
                            {category.items.map((item) => (
                              <Link
                                className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs leading-5 text-slate-600 transition hover:bg-brand-purple/[0.06] hover:text-brand-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange   "
                                href={`/services/${item.slug}`}
                                key={item.slug}
                                onClick={onNavigate}
                              >
                                <span
                                  aria-hidden="true"
                                  className="size-1.5 shrink-0 rounded-full bg-slate-300 "
                                />
                                {item.label}
                              </Link>
                            ))}
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </section>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
