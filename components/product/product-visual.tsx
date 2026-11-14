import Image from "next/image";
import {
  Cable,
  CircleDot,
  Layers3,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Product } from "@/data/products";

const categoryIcons: Record<Product["category"], LucideIcon> = {
  "Lightning Protection": Zap,
  Earthing: CircleDot,
  Accessories: Layers3,
  "Cable Management": Cable,
  Services: Sun,
};

export function ProductVisual({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  if (product.slug === "surya-power-ese-lightning-arrester") {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50 dark:from-slate-800 dark:via-slate-900 dark:to-violet-950/30 ${
          compact ? "h-28 w-28 rounded-xl" : "aspect-[1.05/0.82] rounded-t-2xl"
        }`}
      >
        {/* TODO: Replace the product illustration with an approved product photo. */}
        <Image
          alt={product.imageAlt}
          className={compact ? "h-full w-full object-contain p-1" : "h-[94%] w-[94%] object-contain"}
          height={620}
          src="/products/ese-lightning-arrester-placeholder.svg"
          width={620}
        />
      </div>
    );
  }

  const Icon = categoryIcons[product.category];
  return (
    <div
      aria-label={product.imageAlt}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-purple-950/30 ${
        compact ? "h-28 w-28 rounded-xl" : "aspect-[1.05/0.82] rounded-t-2xl"
      }`}
      role="img"
    >
      {/* TODO: Replace this product illustration with an approved product photo from /public/products/. */}
      <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
      <div className={`relative grid place-items-center rounded-full border border-white bg-white/80 text-brand-purple shadow-[0_20px_50px_rgb(91_33_182/12%)] dark:border-white/10 dark:bg-slate-950/60 dark:text-orange-300 ${
        compact ? "size-14" : "size-24"
      }`}>
        <Icon aria-hidden="true" className={compact ? "size-6" : "size-10"} strokeWidth={1.4} />
      </div>
    </div>
  );
}
