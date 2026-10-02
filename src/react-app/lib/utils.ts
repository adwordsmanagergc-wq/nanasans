import imageSizes from "virtual:image-sizes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPostDate(date: string, month: "short" | "long" = "short") {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric", timeZone: "UTC" });
}


/** Intrinsic width/height for an image in public/images, for layout-stable <img> tags. */
export function imgSize(src: string): { width?: number; height?: number } {
  const size = imageSizes[src];
  return size ? { width: size[0], height: size[1] } : {};
}
