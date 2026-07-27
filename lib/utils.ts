import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function slugify(origin: string, destination: string): string {
  return `${origin.toLowerCase()}-to-${destination.toLowerCase()}`;
}

export function parseSlugs(slug: string): { origin: string; destination: string } | null {
  const match = slug.match(/^([a-z]{3})-to-([a-z]{3})$/i);
  if (!match) return null;
  return { origin: match[1].toUpperCase(), destination: match[2].toUpperCase() };
}
