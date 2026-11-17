import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product/product-catalog";
import { site } from "@/data/site";
import { getCatalogProducts, getProductCategories } from "@/lib/product-repository";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Explore SPI lightning protection, ESE arresters, earthing electrodes, cable management and solar earthing products.",
  alternates: {
    canonical: `${site.url}/products`,
  },
};

export default async function ProductsPage() {
  const [initialProducts, categories] = await Promise.all([
    getCatalogProducts(),
    getProductCategories({ allowMissingTableFallback: true }),
  ]);
  return <ProductCatalog initialProducts={initialProducts} initialCategories={categories} />;
}
