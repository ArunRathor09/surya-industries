import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/product/product-detail-content";
import { products } from "@/data/products";
import { site } from "@/data/site";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
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
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return <ProductDetailContent product={product} relatedProducts={relatedProducts} />;
}
