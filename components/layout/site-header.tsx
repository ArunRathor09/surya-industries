"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Languages,
  ListPlus,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { site } from "@/data/site";
import { useLanguage } from "@/components/providers";
import { BrandLogo } from "@/components/shared/brand-logo";
import { useEnquiryList } from "@/components/product/enquiry-context";
import { MobileServicesAccordion } from "@/components/layout/mobile-services-accordion";
import {
  ServicesMegaMenu,
  servicesMenuId,
} from "@/components/layout/services-mega-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, text, toggleLocale } = useLanguage();
  const { productSlugs, openDrawer } = useEnquiryList();
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelServicesClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const closeServices = useCallback(() => {
    cancelServicesClose();
    setServicesOpen(false);
  }, [cancelServicesClose]);

  const openServices = useCallback(() => {
    cancelServicesClose();
    setServicesOpen(true);
  }, [cancelServicesClose]);

  const scheduleServicesClose = useCallback(() => {
    cancelServicesClose();
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  }, [cancelServicesClose]);

  const focusServiceItem = useCallback((last = false) => {
    requestAnimationFrame(() => {
      const items = document.querySelectorAll<HTMLAnchorElement>(
        `#${servicesMenuId} [data-service-menu-item]`,
      );
      (last ? items[items.length - 1] : items[0])?.focus();
    });
  }, []);

  useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - previousY) > 5) setServicesOpen(false);
      if (currentY < 48 || currentY < previousY - 5) setVisible(true);
      else if (currentY > previousY + 5 && currentY > 120) {
        setVisible(false);
        setServicesOpen(false);
      }
      previousY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    closeServices();
  }, [pathname, closeServices]);

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : "-110%" }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        initial={false}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/60 bg-white/85 px-3 py-2.5 shadow-[0_12px_42px_rgb(15_23_42/10%)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 sm:px-5">
        <Link
          aria-label={text.logoHome}
          className="rounded-lg"
          href="/"
        >
          <BrandLogo />
        </Link>

        <nav aria-label={text.mainNavigation} className="hidden items-center gap-1 lg:flex">
          {site.navigation.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Fragment key={item.href}>
                {item.label === "Industries" && (
                  <button
                    aria-controls={servicesOpen ? servicesMenuId : undefined}
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                      servicesOpen
                        ? "bg-brand-purple/10 text-brand-purple dark:bg-white/10 dark:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                    onClick={() => {
                      cancelServicesClose();
                      setServicesOpen(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape" && servicesOpen) {
                        event.preventDefault();
                        closeServices();
                        servicesTriggerRef.current?.focus();
                      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                        event.preventDefault();
                        openServices();
                        focusServiceItem(event.key === "ArrowUp");
                      }
                    }}
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleServicesClose}
                    ref={servicesTriggerRef}
                    type="button"
                  >
                    {text.services.navLabel}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-3.5 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                    active
                      ? "bg-brand-purple/10 text-brand-purple dark:bg-white/10 dark:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                  href={item.href}
                >
                  {text.nav[item.label as keyof typeof text.nav]}
                </Link>
              </Fragment>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            aria-label={text.header.search}
            className="grid size-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            onClick={() => window.dispatchEvent(new Event("spi:open-search"))}
            type="button"
          >
            <Search aria-hidden="true" className="size-4" />
          </button>
          <button
            aria-label={`${text.header.enquiryList} (${productSlugs.length})`}
            className="relative grid size-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            onClick={openDrawer}
            type="button"
          >
            <ListPlus aria-hidden="true" className="size-4" />
            {productSlugs.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-brand-orange px-1 text-[9px] font-bold text-brand-navy">
                {productSlugs.length}
              </span>
            )}
          </button>
          <button
            aria-label={locale === "en" ? text.switchToHindi : text.switchToEnglish}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-bold tracking-wide text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 sm:px-3"
            onClick={toggleLocale}
            type="button"
          >
            <Languages aria-hidden="true" className="size-4" />
            <span>{text.languageButton}</span>
          </button>
          <button
            aria-label={
              resolvedTheme === "dark"
                ? text.switchToLightTheme
                : text.switchToDarkTheme
            }
            className="grid size-9 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            type="button"
          >
            {resolvedTheme === "dark" ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>
          <Link
            className="hidden items-center rounded-full bg-brand-purple px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-purple/20 transition hover:bg-purple-800 sm:inline-flex"
            href="/#home-enquiry"
          >
            {text.quote}
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? text.closeMenu : text.openMenu}
            className="grid size-9 place-items-center rounded-full text-slate-800 transition hover:bg-slate-100 dark:text-white dark:hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              aria-label={text.closeNavigation}
              animate={{ opacity: 1 }}
              className="fixed inset-0 -z-10 bg-slate-950/30 backdrop-blur-sm lg:hidden"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              type="button"
            />
            <motion.nav
              animate={{ opacity: 1, y: 0, scale: 1 }}
              aria-label={text.mobileNavigation}
              className="mx-auto mt-2 flex max-h-[calc(100dvh-6.5rem)] max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-slate-950 lg:hidden"
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              <div className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain">
                {site.navigation.map((item) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <Fragment key={item.href}>
                      {item.label === "Industries" && (
                        <MobileServicesAccordion onNavigate={() => setMenuOpen(false)} />
                      )}
                      <Link
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium ${
                          active
                            ? "bg-brand-purple/10 text-brand-purple dark:text-white"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                        }`}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                      >
                        {text.nav[item.label as keyof typeof text.nav]}
                      </Link>
                    </Fragment>
                  );
                })}
              </div>
              <div className="sticky bottom-0 border-t border-slate-200 bg-white pt-2 dark:border-white/10 dark:bg-slate-950">
                <Link
                  className="flex min-h-12 items-center justify-center rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-brand-navy"
                  href="/#home-enquiry"
                  onClick={() => setMenuOpen(false)}
                >
                  {text.quote}
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      </motion.header>
      <ServicesMegaMenu
        onClose={closeServices}
        onEscape={() => {
          closeServices();
          servicesTriggerRef.current?.focus();
        }}
        onMouseEnter={cancelServicesClose}
        onMouseLeave={scheduleServicesClose}
        open={servicesOpen}
      />
    </>
  );
}
