import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product/product-catalog";
import { site } from "@/data/site";
import { getProducts } from "@/lib/product-repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Explore SPI lightning protection, ESE arresters, earthing electrodes, cable management and solar earthing products.",
  alternates: {
    canonical: `${site.url}/products`,
  },
};

export default async function ProductsPage() {
  const initialProducts = await getProducts();
  return <ProductCatalog initialProducts={initialProducts} />;
}
