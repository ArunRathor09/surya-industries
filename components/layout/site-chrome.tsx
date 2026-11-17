"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { CommandPalette } from "@/components/layout/command-palette";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { EnquiryDrawer } from "@/components/product/enquiry-drawer";

export function SiteChrome({ children }: { children: ReactNode }) {
  const isAdminRoute = usePathname().startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <SkipLink />}
      {!isAdminRoute && <SiteHeader />}
      <main id="main-content">{children}</main>
      {!isAdminRoute && (
        <>
          <SiteFooter />
          <FloatingActions />
          <EnquiryDrawer />
          <CommandPalette />
        </>
      )}
    </>
  );
}
