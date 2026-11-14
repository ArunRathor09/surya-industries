import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/data/services";
import { ServiceImage } from "@/components/services/service-image";

export function ServiceCard({
  item,
  category,
  actionLabel,
}: {
  item: ServiceItem;
  category: ServiceCategory;
  actionLabel: string;
}) {
  const Icon = category.icon;

  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgb(15_23_42/4%)] transition duration-300 hover:-translate-y-1 hover:border-brand-purple/25 hover:shadow-[0_22px_55px_rgb(15_23_42/12%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange dark:border-white/10 dark:bg-slate-900"
      href={`/services/${item.slug}`}
    >
      <ServiceImage
        alt={item.label}
        className="aspect-[1.65] w-full"
        icon={Icon}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        src={item.image}
      />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-purple dark:text-orange-300">
          {category.title}
        </p>
        <h3 className="mt-2 font-heading text-sm font-semibold leading-5 text-slate-900 group-hover:text-brand-purple dark:text-white dark:group-hover:text-orange-300">
          {item.label}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[10px] font-bold text-slate-500 transition group-hover:text-brand-purple dark:text-slate-400 dark:group-hover:text-orange-300">
          {actionLabel}
          <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
