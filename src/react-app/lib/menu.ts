import type { MenuCourse } from "@/data/menu";

/** 95000 -> "95k" (prices are in Indonesian rupiah). */
export const formatPrice = (idr: number) => `${Math.round(idr / 1000)}k`;

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Anchor id for a menu course, e.g. "menu-veg-curries". */
export const courseId = (course: MenuCourse) => `menu-${slug(course.name)}`;
