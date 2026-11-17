"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/utils";
import { site } from "@/data/site";
import { useLanguage } from "@/components/providers";

export function FloatingActions() {
  const { text } = useLanguage();
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-orange transition-[width]"
        style={{ width: `${progress}%` }}
      />
      <a
        aria-label={text.floating.whatsappLabel}
        className="fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgb(37_211_102/35%)] transition hover:scale-105 sm:bottom-7 sm:right-7"
        href={getWhatsAppUrl(text.floating.whatsappMessage)}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle aria-hidden="true" className="size-6" />
      </a>

      <button
        aria-label={text.floating.scrollTop}
        className={`fixed bottom-24 left-4 z-40 grid size-11 place-items-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:text-brand-purple    sm:bottom-8 sm:left-auto sm:right-24 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <ArrowUp aria-hidden="true" className="size-4" />
      </button>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(15_23_42/8%)] backdrop-blur-lg   sm:hidden">
        <a
          className="flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold text-slate-700 "
          href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`}
        >
          <Phone aria-hidden="true" className="size-4 text-brand-purple" />
          {text.floating.callNow}
        </a>
        <a
          className="flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold text-slate-700 "
          href={getWhatsAppUrl(text.floating.whatsappMessage)}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircle aria-hidden="true" className="size-4 text-[#20B85A]" />
          {text.floating.whatsapp}
        </a>
        <Link
          className="flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[10px] font-semibold text-slate-700 "
          href="/#home-enquiry"
        >
          <span className="grid size-4 place-items-center rounded-full bg-brand-orange text-[10px] font-bold text-brand-navy">
            +
          </span>
          {text.floating.enquiry}
        </Link>
      </div>
    </>
  );
}
