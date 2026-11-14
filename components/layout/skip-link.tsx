"use client";

import { useLanguage } from "@/components/providers";

export function SkipLink() {
  const { text } = useLanguage();

  return (
    <a
      className="sr-only z-[100] rounded-md bg-white px-4 py-2 text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      href="#main-content"
    >
      {text.skipLink}
    </a>
  );
}
