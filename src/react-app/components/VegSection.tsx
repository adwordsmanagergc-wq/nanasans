import { Link } from "react-router";
import { ArrowRight, Leaf } from "lucide-react";
import { MENU } from "@/data/menu";
import { CDN } from "@/data/site";
import { imgSize } from "@/react-app/lib/utils";
import { courseId, formatPrice } from "@/react-app/lib/menu";
import Reveal from "./Reveal";

const VEG = MENU.find((c) => c.name === "Veg Curries")!;
const VEGAN = MENU.find((c) => c.name === "Vegan Curries")!;
const IMAGE = `${CDN}/signature-veg-vegan-curries.webp`;

function CurryList({ title, course }: { title: string; course: typeof VEG }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3">
        <h3 className="flex items-center gap-2 font-display text-2xl">
          <Leaf className="h-4 w-4 text-emerald-700" aria-hidden="true" />
          {title}
        </h3>
        {course.price && <span className="font-display text-lg text-chili">All {formatPrice(course.price)}</span>}
      </div>
      <ul className="mt-3 space-y-3">
        {course.dishes.map((dish) => (
          <li key={dish.name}>
            <p className="font-medium text-ink">{dish.name}</p>
            {dish.description && <p className="text-sm text-cocoa-500">{dish.description}</p>}
          </li>
        ))}
      </ul>
      <Link
        to={`/menu#${courseId(course)}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-saffron-500/60 underline-offset-4 hover:text-chili"
      >
        {title} on the menu <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

/** Home page section on meat-free dishes, built from the real menu data. */
export default function VegSection() {
  return (
    <section id="vegetarian" className="grain bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">Plant-friendly</span>
          <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-5xl">
            Vegetarian &amp; Vegan <em className="italic text-chili">Indian Food</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-cocoa-500">
            Twelve meat-free curries, made with the same care as everything else we cook. Paneer lovers get their own
            menu, and our vegan curries are made without dairy. Pair them with vegetable biryani, a veg samosa or
            vegetable pakora for a feast.
          </p>
          <img
            src={IMAGE}
            alt="Vegetarian and vegan Indian curries with naan and rice at Nana Sans Canggu"
            {...imgSize(IMAGE)}
            loading="lazy"
            decoding="async"
            className="mt-10 aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-[0_30px_60px_-30px_rgba(27,19,14,0.6)]"
          />
        </Reveal>
        <Reveal delay={120} className="grid gap-12 sm:grid-cols-2">
          <CurryList title="Vegetarian Curries" course={VEG} />
          <CurryList title="Vegan Curries" course={VEGAN} />
        </Reveal>
      </div>
    </section>
  );
}
