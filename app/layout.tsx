import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { AppProviders } from "@/components/providers";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SkipLink } from "@/components/layout/skip-link";
import { CommandPalette } from "@/components/layout/command-palette";
import { EnquiryDrawer } from "@/components/product/enquiry-drawer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "Trusted lightning protection, ESE lightning arresters, earthing electrodes, copper bonded rods and solar earthing systems from Prayagraj, India.",
  keywords: [
    "ESE lightning arrester",
    "earthing electrode",
    "copper bonded rod",
    "lightning protection India",
    "earthing Prayagraj",
    "solar earthing kit",
    "chemical earthing",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description:
      "Complete lightning protection and earthing solutions, engineered for dependable performance.",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description:
      "Complete lightning protection and earthing solutions, engineered for dependable performance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} min-h-screen`}>
        <AppProviders>
          <SkipLink />
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <FloatingActions />
          <EnquiryDrawer />
          <CommandPalette />
        </AppProviders>
      </body>
    </html>
  );
}
