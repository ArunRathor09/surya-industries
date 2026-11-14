import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product/product-catalog";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Explore SPI lightning protection, ESE arresters, earthing electrodes, cable management and solar earthing products.",
  alternates: {
    canonical: `${site.url}/products`,
  },
};

export default function ProductsPage() {
  return <ProductCatalog />;
}
