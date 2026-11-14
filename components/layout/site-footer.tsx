"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { site } from "@/data/site";
import { BrandLogo } from "@/components/shared/brand-logo";
import { useLanguage } from "@/components/providers";

export function SiteFooter() {
  const { text } = useLanguage();
  const footerLinks = [
    { label: text.footer.about, href: "/#about" },
    { label: text.footer.products, href: "/products" },
    { label: text.footer.industries, href: "/#industries" },
    { label: text.footer.contact, href: "/#home-enquiry" },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.25fr_0.75fr_1.2fr] md:gap-16">
          <div>
            <Link aria-label={text.logoHome} href="/">
              <BrandLogo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              {text.footer.description}
            </p>
            <p className="mt-4 font-heading text-xs font-medium tracking-wide text-orange-300">
              “{text.footer.tagline}”
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/" },
                { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/" },
                { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/" },
              ].map(({ label, Icon, href }) => (
                <a
                  aria-label={`${label} (${text.footer.socialPlaceholder})`}
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-orange-400/50 hover:bg-white/5 hover:text-orange-300"
                  href={href}
                  key={label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold">{text.footer.explore}</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    className="text-sm text-slate-400 transition hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold">{text.footer.getInTouch}</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-orange-400" />
                <span>{text.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-orange-400" />
                <span>
                  {site.contact.phones.map((phone, index) => (
                    <span key={phone}>
                      {index > 0 && <span className="text-slate-600"> / </span>}
                      <a className="transition hover:text-white" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
                        {phone}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-orange-400" />
                <a className="break-all transition hover:text-white" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. {text.footer.rights}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{text.footer.iso}</span>
            <span className="text-slate-700">·</span>
            <span>{text.footer.makeInIndia}</span>
            <a
              className="inline-flex items-center gap-1 text-slate-400 transition hover:text-white"
              href="https://www.spi.ind.in"
              rel="noreferrer"
              target="_blank"
            >
              spi.ind.in <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
