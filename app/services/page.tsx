import type { Metadata } from "next";
import { ServicesCatalogContent } from "@/components/services/services-catalog-content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Surya Power Industries services for earthing, lightning protection, wires and cables, solar BOS kits, and transformers.",
  alternates: {
    canonical: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  return <ServicesCatalogContent />;
}
