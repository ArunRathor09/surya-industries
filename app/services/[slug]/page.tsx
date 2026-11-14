import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailContent } from "@/components/services/service-detail-content";
import { allServices, services } from "@/data/services";
import { getServiceContent } from "@/data/serviceContent";
import { site } from "@/data/site";

export function generateStaticParams() {
  return allServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = allServices.find((service) => service.slug === slug);
  const category = services.find((group) => group.title === item?.category);
  if (!item || !category) return { title: "Service not found" };

  const content = getServiceContent(category);
  return {
    title: item.label,
    description: `${item.label}: ${content.description}`,
    alternates: {
      canonical: `${site.url}/services/${item.slug}`,
    },
    openGraph: {
      title: `${item.label} | ${site.shortName}`,
      description: content.description,
      images: [{ url: item.image, alt: item.label }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = allServices.find((service) => service.slug === slug);
  const category = services.find((group) => group.title === item?.category);
  if (!item || !category) notFound();

  const relatedServices = category.items
    .filter((service) => service.slug !== item.slug)
    .slice(0, 3);

  return (
    <ServiceDetailContent
      categoryTitle={category.title}
      item={item}
      relatedServices={relatedServices}
    />
  );
}
