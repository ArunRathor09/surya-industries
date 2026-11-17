"use client";

import Image from "next/image";
import { useState } from "react";
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
  priority = false,
}: {
  product: Product;
  compact?: boolean;
  priority?: boolean;
}) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const customImage =
    product.image.startsWith("https://") && failedImage !== product.image;

  if (customImage) {
    return (
      <div
        className={`group relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50 ${
          compact ? "h-28 w-28 rounded-xl" : "aspect-[1.08/0.9] rounded-t-2xl"
        }`}
      >
        <Image
          alt={product.imageAlt}
          className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.04]"
          fill
          onError={() => setFailedImage(product.image)}
          priority={priority}
          sizes={compact ? "112px" : "(max-width: 768px) 100vw, 25vw"}
          src={product.image}
          unoptimized
        />
      </div>
    );
  }

  if (product.slug === "surya-power-ese-lightning-arrester") {
    return (
      <div
        className={`group relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-violet-50 ${
          compact ? "h-28 w-28 rounded-xl" : "aspect-[1.08/0.9] rounded-t-2xl"
        }`}
      >
        {/* TODO: Replace the product illustration with an approved product photo. */}
        <Image
          alt={product.imageAlt}
          className={compact ? "h-full w-full object-contain p-1" : "h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"}
          height={620}
          priority={priority}
          src="/products/ese-lightning-arrester-placeholder.svg"
          width={620}
        />
      </div>
    );
  }

  const Icon = categoryIcons[product.category] ?? Layers3;
  return (
    <div
      aria-label={product.imageAlt}
      className={`group relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-purple-50    ${
        compact ? "h-28 w-28 rounded-xl" : "aspect-[1.08/0.9] rounded-t-2xl"
      }`}
      role="img"
    >
      {/* TODO: Replace this product illustration with an approved product photo from /public/products/. */}
      <div aria-hidden="true" className="absolute inset-0 opacity-60 [background-image:radial-gradient(#94a3b8_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
      <div className={`relative grid place-items-center rounded-full border border-white bg-white/80 text-brand-purple shadow-[0_20px_50px_rgb(91_33_182/12%)] transition-transform duration-500 group-hover:scale-105    ${
        compact ? "size-14" : "size-28"
      }`}>
        <Icon aria-hidden="true" className={compact ? "size-6" : "size-10"} strokeWidth={1.4} />
      </div>
    </div>
  );
}
