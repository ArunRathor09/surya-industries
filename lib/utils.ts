import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWhatsAppUrl(message: string) {
  const phone = "919307335739";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatPhoneForTel(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function absoluteUrl(path = "") {
  const normalizedPath = path.startsWith("/") || path === "" ? path : `/${path}`;
  return new URL(normalizedPath, "https://www.suryapowerindustries.com").toString();
}
