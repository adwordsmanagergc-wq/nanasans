import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPostDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric" });
}
