"use client";

import Image from "next/image";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

const blurPlaceholder =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNDAiIGhlaWdodD0iMTYwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWZlY2ZmIi8+PC9zdmc+";

export function ServiceImage({
  src,
  alt,
  icon: Icon,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  icon: LucideIcon;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-label={failed ? alt : undefined}
      className={`relative isolate overflow-hidden bg-gradient-to-br from-violet-100 via-white to-orange-100    ${className}`}
      role={failed ? "img" : undefined}
    >
      {failed ? (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="grid size-16 place-items-center rounded-2xl border border-white/80 bg-white/75 text-brand-purple shadow-lg   ">
            <Icon className="size-8" strokeWidth={1.5} />
          </span>
        </div>
      ) : (
        <Image
          alt={alt}
          blurDataURL={blurPlaceholder}
          className="object-cover"
          fill
          onError={() => setFailed(true)}
          placeholder="blur"
          priority={priority}
          sizes={sizes}
          src={src}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-white/5"
      />
    </div>
  );
}
