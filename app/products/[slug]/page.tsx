import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProductDetailContent } from "@/components/product/product-detail-content";
import { site } from "@/data/site";
import { getProductPageData } from "@/lib/product-repository";

export const dynamic = "force-dynamic";

const getProductPageForRequest = cache((slug: string) => getProductPageData(slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getProductPageForRequest(slug);
  const product = pageData?.product;
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.summary,
    alternates: {
      canonical: `${site.url}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | ${site.shortName}`,
      description: product.summary,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await getProductPageForRequest(slug);
  if (!pageData) notFound();

  return (
    <ProductDetailContent
      product={pageData.product}
      relatedProducts={pageData.relatedProducts}
    />
  );
}
