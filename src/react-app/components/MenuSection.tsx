import { useState } from "react";
import { ArrowUpRight, BookOpen, Leaf } from "lucide-react";
import { CDN, SITE } from "@/data/site";
import { MENU_PAGES } from "@/data/menu";
import MenuViewer from "./MenuViewer";
import Reveal from "./Reveal";

const SIGNATURES = [
  {
    name: "Tandoori Chicken",
    note: "From the clay oven",
    description: "Half chicken marinated in yoghurt and Kashmiri spices, flame-grilled in our tandoor.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.26-pm.png`,
    alt: "Flame-grilled tandoori chicken platter fresh from the clay oven in Canggu",
  },
  {
    name: "Chicken Tikka Masala",
    note: "The British-Indian classic",
    description: "Char-grilled chicken tikka folded into a creamy, gently spiced tomato sauce.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.18-pm.png`,
    alt: "Creamy chicken tikka masala curry served at Nana Sans Indian restaurant Canggu",
  },
  {
    name: "Dal Makhani",
    note: "Slow-cooked overnight",
    description: "Black lentils simmered low and slow with butter and warming spices.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.33-pm.png`,
    alt: "Authentic dal makhani and vegetarian Indian curry at Nana Sans Bali",
    veg: true,
  },
];

// "Our Story" is the last page of the printed menu; it isn't a food chapter.
const CHAPTERS = MENU_PAGES.map((page, index) => ({ ...page, index })).filter((p) => p.alt !== "Our Story");

export default function MenuSection() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  return (
    <>
      {/* Signature dishes */}
      <section id="signatures" className="grain bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Signatures</span>
              <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
                From the tandoor <em className="italic text-chili">to your table</em>
              </h2>
            </div>
            <p className="max-w-sm text-cocoa-500 md:text-right">
              Family recipes, fresh spice blends and a proper clay oven. These are the plates our regulars come back
              for.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {SIGNATURES.map((dish, i) => (
              <Reveal key={dish.name} delay={i * 120}>
                <article className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink shadow-[0_30px_60px_-30px_rgba(27,19,14,0.6)]">
                  <img
                    src={dish.image}
                    alt={dish.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink backdrop-blur">
                      {dish.note}
                    </span>
                    {dish.veg && (
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-700 text-white" title="Vegetarian">
                        <Leaf className="h-3.5 w-3.5" />
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

      {/* Menu chapters */}
      <section id="menu" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,154,61,0.5), transparent 65%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow text-saffron-400">The Menu</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
              Seventeen chapters of <em className="italic text-saffron-400">comfort</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-paper/65">
              From sizzling tandoori grills and rich meat curries to dedicated vegetarian and vegan pages, fresh naans,
              biryanis, chai and signature drinks. Pick a chapter to start reading.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setViewerIndex(0)} className="btn-primary">
                <BookOpen className="h-4 w-4" />
                Open the Full Menu
              </button>
              <a href={SITE.gojekUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Order for Delivery
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ol className="grid border-t border-white/10 sm:grid-cols-2 sm:gap-x-10">
              {CHAPTERS.map((chapter) => (
                <li key={chapter.src} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewerIndex(chapter.index)}
                    className="group flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span className="w-7 font-display text-sm italic text-saffron-400/70 transition-colors group-hover:text-saffron-300">
                      {String(chapter.index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-xl transition-transform duration-300 group-hover:translate-x-1.5 sm:text-2xl">
                      {chapter.alt}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-paper/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-saffron-400" />
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <MenuViewer isOpen={viewerIndex !== null} startIndex={viewerIndex ?? 0} onClose={() => setViewerIndex(null)} />
    </>
  );
}
