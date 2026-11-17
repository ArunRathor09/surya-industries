"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers";
import { ServiceImage } from "@/components/services/service-image";
import { allServices, services } from "@/data/services";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/utils";

const menuId = "spi-services-mega-menu";
const menuItemSelector = "[data-service-menu-item]";

export function ServicesMegaMenu({
  open,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onEscape,
}: {
  open: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onEscape: () => void;
}) {
  const { text } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activeService = allServices.find((item) => item.slug === activeSlug);
  const activeCategory = activeService
    ? services.find((category) => category.title === activeService.category)
    : undefined;
  const activeIcon = activeCategory?.icon ?? services[0].icon;

  useEffect(() => {
    if (!open) setActiveSlug(null);
  }, [open]);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onEscape();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(
      event.currentTarget.querySelectorAll<HTMLAnchorElement>(menuItemSelector),
    );
    if (items.length === 0) return;

    event.preventDefault();
    const currentIndex = items.findIndex((item) => item === document.activeElement);
    const nextIndex =
      event.key === "ArrowDown"
        ? (currentIndex + 1 + items.length) % items.length
        : (currentIndex - 1 + items.length) % items.length;
    items[nextIndex]?.focus();
  }

  const entrance = reduceMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, y: 0, scale: 1 };
  const initial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 12, scale: 0.985 };
  const exit = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 8, scale: 0.99 };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label={text.services.closeMenu}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[49] cursor-default bg-slate-950/25 backdrop-blur-[2px]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.div
            animate={entrance}
            aria-label={text.services.menuTitle}
            className="fixed left-1/2 top-[5.4rem] z-[51] w-[min(1100px,92vw)] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/95 text-slate-900 shadow-[0_32px_90px_rgb(15_23_42/25%)] backdrop-blur-2xl    sm:top-[5.75rem]"
            exit={exit}
            id={menuId}
            initial={initial}
            onKeyDown={handleKeyDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            role="menu"
            transition={
              reduceMotion
                ? { duration: 0.01 }
                : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-1 rounded-t-2xl bg-gradient-to-r from-brand-purple via-[#9b45c5] to-brand-orange"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-l border-t border-white/80 bg-white  "
            />

            <div className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto px-4 pb-4 pt-6 sm:px-6 sm:pb-5 sm:pt-7">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-purple ">
                    SPI
                  </p>
                  <h2 className="mt-1 font-heading text-base font-semibold sm:text-lg">
                    {text.services.menuTitle}
                  </h2>
                  <p className="mt-1 max-w-2xl text-[11px] leading-5 text-slate-500 ">
                    {text.services.menuDescription}
                  </p>
                </div>
                <Link
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/15 bg-brand-purple/[0.04] px-3.5 py-2 text-[10px] font-bold text-brand-purple transition hover:bg-brand-purple hover:text-white     "
                  href="/services"
                  onClick={onClose}
                  role="menuitem"
                >
                  {text.services.allServices}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>

              <motion.div
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: reduceMotion
                      ? { staggerChildren: 0 }
                      : { staggerChildren: 0.045, delayChildren: 0.035 },
                  },
                }}
              >
                {services.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.section
                      className="min-w-0"
                      key={category.title}
                      variants={{
                        hidden: { opacity: 0, y: reduceMotion ? 0 : 7 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: reduceMotion ? 0.01 : 0.16 },
                        },
                      }}
                    >
                      <h3 className="flex min-h-10 items-center gap-2 rounded-lg border-l-[3px] border-brand-purple bg-gradient-to-r from-[#eef2ff] via-[#f5f1ff] to-[#fff7ed] px-2.5 py-2 text-[10px] font-extrabold tracking-[0.1em] text-slate-800    ">
                        <span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/80 text-brand-purple shadow-sm  ">
                          <Icon aria-hidden="true" className="size-3.5" />
                        </span>
                        {category.title}
                      </h3>
                      <ul className="mt-2 space-y-0.5">
                        {category.items.map((item) => {
                          const active = item.slug === activeSlug;
                          return (
                            <li key={item.slug}>
                              <Link
                                aria-current={active ? "true" : undefined}
                                className={`group flex min-h-8 items-center gap-2 rounded-lg px-2 py-1 text-[10px] leading-4 transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange ${
                                  active
                                    ? "translate-x-0.5 bg-brand-purple/[0.07] font-semibold text-brand-purple  "
                                    : "text-slate-600 hover:translate-x-0.5 hover:bg-brand-purple/[0.05] hover:text-brand-purple   "
                                }`}
                                data-service-menu-item
                                href={`/services/${item.slug}`}
                                key={item.slug}
                                onClick={onClose}
                                onFocus={() => setActiveSlug(item.slug)}
                                onMouseEnter={() => setActiveSlug(item.slug)}
                                role="menuitem"
                              >
                                <span
                                  aria-hidden="true"
                                  className={`size-1.5 shrink-0 rounded-full transition-colors ${
                                    active
                                      ? "bg-brand-orange"
                                      : "bg-slate-300 group-hover:bg-brand-orange "
                                  }`}
                                />
                                <span className="line-clamp-2 text-[11px] leading-5">{item.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.section>
                  );
                })}
              </motion.div>

              <div className="mt-4 border-t border-slate-200 pt-4 ">
                <AnimatePresence mode="wait" initial={false}>
                  {activeService && activeCategory ? (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="grid items-center gap-3 rounded-xl bg-slate-50 p-3  sm:grid-cols-[112px_1fr_auto]"
                      exit={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 5 }}
                      key={activeService.slug}
                      transition={{ duration: reduceMotion ? 0.01 : 0.16 }}
                    >
                      <ServiceImage
                        alt={activeService.label}
                        className="h-20 w-full rounded-lg sm:h-[68px]"
                        icon={activeIcon}
                        sizes="112px"
                        src={activeService.image}
                      />
                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-brand-purple ">
                          {activeCategory.title}
                        </p>
                        <p className="mt-1 truncate font-heading text-xs font-semibold">
                          {activeService.label}
                        </p>
                      </div>
                      <Link
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-brand-purple px-4 text-[10px] font-bold text-white transition hover:bg-purple-800"
                        href={`/services/${activeService.slug}`}
                        onClick={onClose}
                        role="menuitem"
                      >
                        {text.services.viewDetails}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="flex flex-col gap-3 rounded-xl bg-gradient-to-r from-violet-50 via-white to-orange-50 p-3    sm:flex-row sm:items-center sm:justify-between sm:px-5"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      key="services-promo"
                      transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                    >
                      <div>
                        <p className="font-heading text-xs font-semibold">
                          {text.services.needHelp}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500 ">
                          {text.services.talkExpert}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full bg-[#1ea95a] px-3.5 text-[10px] font-bold text-white transition hover:bg-[#168f4b]"
                          href={getWhatsAppUrl(text.services.whatsappMessage)}
                          rel="noreferrer"
                          role="menuitem"
                          target="_blank"
                        >
                          <MessageCircle aria-hidden="true" className="size-3.5" />
                          WhatsApp
                        </a>
                        <a
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 text-[10px] font-bold text-slate-700 transition hover:border-brand-purple hover:text-brand-purple    "
                          href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`}
                          role="menuitem"
                        >
                          <Phone aria-hidden="true" className="size-3.5" />
                          {text.services.callNow}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { menuId as servicesMenuId, menuItemSelector };
