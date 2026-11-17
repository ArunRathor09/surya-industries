import Image from "next/image";

export function BrandLogo({
  compact = false,
  priority = false,
}: {
  compact?: boolean;
  priority?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2.5"
    >
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-brand-purple/10 bg-white shadow-[0_5px_18px_rgb(15_23_42/14%)] ring-2 ring-white/80 ${
          compact ? "size-10" : "size-11 sm:size-12"
        }`}
      >
        <Image
          alt=""
          className="size-full rounded-full object-cover"
          height={128}
          priority={priority}
          sizes={compact ? "40px" : "(max-width: 640px) 44px, 48px"}
          src="/suryaLogo.jpeg"
          width={128}
        />
      </span>
      {!compact && (
        <span className="hidden leading-tight sm:block">
          <span className="block font-heading text-xs font-bold tracking-[0.055em] text-slate-900 ">
            SURYA POWER
          </span>
          <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.19em] text-slate-500 ">
            Industries
          </span>
        </span>
      )}
    </span>
  );
}
