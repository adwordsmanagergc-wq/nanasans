import { useState } from "react";
import { ArrowUpRight, BookOpen, Leaf } from "lucide-react";
import { CDN, SITE } from "@/data/site";
import { MENU, MENU_TAX_NOTE, type Diet } from "@/data/menu";
import MenuViewer from "./MenuViewer";
import Reveal from "./Reveal";

const SIGNATURES = [
  {
    name: "Tandoori Chicken",
    note: "From the clay oven",
    description: "Half or full, cooked properly in our clay oven and served in pieces. Or share a mixed grill.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.26-pm.png`,
    alt: "Flame-grilled tandoori chicken platter fresh from the clay oven in Canggu",
  },
  {
    name: "Chicken Tikka Masala",
    note: "The British-Indian classic",
    description: "Smooth tomato curry with a hint of spice. Add a garlic butter naan and you're home.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.18-pm.png`,
    alt: "Creamy chicken tikka masala curry served at Nana Sans Indian restaurant Canggu",
  },
  {
    name: "Veg & Vegan Curries",
    note: "Twelve meat-free curries",
    description: "From Paneer Makhni and Palak Paneer to Chole Masala, Rajma Masala and smoky Dal Tadka.",
    image: `${CDN}/Screenshot-2026-03-28-at-3.16.33-pm.png`,
    alt: "Vegetarian Indian curry at Nana Sans Bali",
    veg: true,
  },
];

const formatPrice = (idr: number) => `${Math.round(idr / 1000)}k`;

function DietTag({ diet }: { diet: Diet }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] ${
        diet === "vegan" ? "bg-emerald-500/15 text-emerald-300" : "bg-lime-500/10 text-lime-200"
      }`}
    >
      <Leaf className="h-3 w-3" />
      {diet === "vegan" ? "Vegan" : "Vegetarian"}
    </span>
  );
}

export default function MenuSection() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [course, setCourse] = useState(0);
  const active = MENU[course];

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
                What's cooking at <em className="italic text-saffron-400">Nana's</em>
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

          <Reveal delay={150}>
            <div key={active.name} className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500" role="tabpanel">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-3xl sm:text-4xl">{active.name}</h3>
                    {active.diet && <DietTag diet={active.diet} />}
                  </div>
                  {active.note && <p className="mt-2 max-w-xl text-sm italic text-paper/55">{active.note}</p>}
                </div>
                <div className="flex items-center gap-4">
                  {active.price && (
                    <span className="rounded-full border border-saffron-400/40 px-4 py-1.5 font-display text-lg text-saffron-300">
                      All {formatPrice(active.price)}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setViewerIndex(active.page)}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-saffron-300"
                  >
                    <BookOpen className="h-4 w-4" />
                    Printed page
                  </button>
                </div>
              </div>
              <ul className="mt-6 grid gap-x-16 border-t border-white/10 md:grid-cols-2">
                {active.dishes.map((dish) => (
                  <li key={dish.name} className="border-b border-white/10 py-5">
                    <div className="flex items-baseline gap-3">
                      <h4 className="font-display text-xl">{dish.name}</h4>
                      {dish.price && (
                        <>
                          <span className="mb-1.5 flex-1 border-b border-dotted border-white/20" aria-hidden="true" />
                          <span className="font-display text-xl text-saffron-300">{formatPrice(dish.price)}</span>
                        </>
                      )}
                    </div>
                    {dish.description && (
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/60">{dish.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-lg text-sm leading-relaxed text-paper/50">
              Prices in Indonesian rupiah (k = thousand). {MENU_TAX_NOTE}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setViewerIndex(0)} className="btn-primary">
                <BookOpen className="h-4 w-4" />
                View the Printed Menu
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
