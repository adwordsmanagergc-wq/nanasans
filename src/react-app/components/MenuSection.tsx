import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, BookOpen, Leaf } from "lucide-react";
import { CDN, SITE } from "@/data/site";
import { MENU, MENU_TAX_NOTE } from "@/data/menu";
import { imgSize } from "@/react-app/lib/utils";
import MenuCoursePanel from "./MenuCourse";
import { courseId } from "@/react-app/lib/menu";
import MenuViewer from "./MenuViewer";
import Reveal from "./Reveal";

const SIGNATURES = [
  {
    name: "Tandoori Chicken",
    note: "From the clay oven",
    description: "Half or full, cooked properly in our clay oven and served in pieces. Or share a mixed grill.",
    image: `${CDN}/signature-tandoori-chicken.webp`,
    alt: "Flame-grilled tandoori chicken platter fresh from the clay oven in Canggu",
  },
  {
    name: "Chicken Tikka Masala",
    note: "The British-Indian classic",
    description: "Smooth tomato curry with a hint of spice. Add a garlic butter naan and you're home.",
    image: `${CDN}/gallery-chicken-tikka-masala.webp`,
    alt: "Creamy chicken tikka masala curry served at Nana Sans Indian restaurant Canggu",
  },
  {
    name: "Veg & Vegan Curries",
    note: "Twelve meat-free curries",
    description: "From Paneer Makhni and Palak Paneer to Chole Masala, Rajma Masala and smoky Dal Tadka.",
    image: `${CDN}/signature-veg-vegan-curries.webp`,
    alt: "Vegetarian Indian curry at Nana Sans Bali",
    veg: true,
  },
];

export default function MenuSection() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [course, setCourse] = useState(0);

  return (
    <>
      {/* Signature dishes */}
      <section id="signatures" className="grain bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Signatures</span>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
                British-Indian <em className="italic text-chili">Favourites</em>
              </h2>
            </div>
            <p className="max-w-sm text-cocoa-500 md:text-right">
              Family recipes, fresh spice blends and a proper clay oven. From chicken tikka masala to tandoori chicken,
              these are the plates our regulars come back for.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {SIGNATURES.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 120}>
                <article className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_60px_-30px_rgba(27,19,14,0.6)]">
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    {...imgSize(dish.image)}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
                      {dish.note}
                    </span>
                    {dish.veg && (
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-700 text-white" title="Vegetarian">
                        <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">Vegetarian</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper sm:p-7">
                    <span className="font-display text-sm italic text-saffron-300">No. 0{i + 1}</span>
                    <h3 className="mt-1 font-display text-3xl">{dish.name}</h3>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-paper/75 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100 max-md:max-h-28 max-md:opacity-100">
                      {dish.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,154,61,0.5), transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow text-saffron-400">The Menu</span>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
                Tandoori &amp; <em className="italic text-saffron-400">Curry</em> Menu
              </h2>
            </div>
            <p className="max-w-sm text-paper/65 md:text-right">
              From the tandoor to the bread basket, chai to Biscoff cheesecake. Every curry comes with the love of a
              family recipe.
            </p>
          </Reveal>

          {/* Course tabs */}
          <Reveal delay={100} className="mt-12">
            <div
              role="tablist"
              aria-label="Menu courses"
              className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden"
            >
              {MENU.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  role="tab"
                  id={`${courseId(c)}-tab`}
                  aria-controls={courseId(c)}
                  aria-selected={course === i}
                  onClick={() => setCourse(i)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                    course === i
                      ? "border-saffron-400 bg-saffron-500 text-ink"
                      : "border-white/15 text-paper/70 hover:border-white/40 hover:text-paper"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Every course is in the HTML (crawlers and no-JS readers see the whole menu); tabs just toggle visibility. */}
          <Reveal delay={150}>
            {MENU.map((c, i) => (
              <div
                key={c.name}
                id={courseId(c)}
                role="tabpanel"
                aria-labelledby={`${courseId(c)}-tab`}
                hidden={course !== i}
                className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <MenuCoursePanel course={c} onPrintedPage={() => setViewerIndex(c.page)} />
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-paper/50">
              Prices in Indonesian rupiah (k = thousand). {MENU_TAX_NOTE}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/menu" className="btn-primary">
                Full Menu Page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button type="button" onClick={() => setViewerIndex(0)} className="btn-ghost">
                <BookOpen className="h-4 w-4" />
                Printed Menu
              </button>
              <a href={SITE.gojekUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Order for Delivery
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <MenuViewer isOpen={viewerIndex !== null} startIndex={viewerIndex ?? 0} onClose={() => setViewerIndex(null)} />
    </>
  );
}
