"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { getWhatsAppUrl } from "@/lib/utils";
import type { ServiceItem } from "@/data/services";

export function ServiceEnquireButton({ item }: { item: ServiceItem }) {
  const { text } = useLanguage();
  const message = [
    text.enquiry.whatsappIntro,
    `- ${item.label}`,
    "",
    text.services.whatsappMessage,
  ].join("\n");

  return (
    <a
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-purple px-6 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition hover:-translate-y-0.5 hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
      href={getWhatsAppUrl(message)}
      rel="noreferrer"
      target="_blank"
    >
      {text.services.enquireNow}
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  );
}
