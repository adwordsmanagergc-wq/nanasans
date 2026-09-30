import { ArrowDown, CalendarCheck, Leaf, Snowflake, Flame, UtensilsCrossed } from "lucide-react";
import { CDN, SITE } from "@/data/site";

const HERO_IMAGE = `${CDN}/nanny-sandra-hero.jpg`;

/** Half Union Jack, half Tiranga: the British-Indian story in one mark. */
function HeritageFlag() {
  return (
    <svg width="34" height="20" viewBox="0 0 48 28" className="rounded-[2px] shadow-md" aria-hidden="true">
      <defs>
        <clipPath id="heroLeftHalf">
          <path d="M0,0 L24,14 L0,28 Z" />
        </clipPath>
        <clipPath id="heroRightHalf">
          <path d="M48,0 L24,14 L48,28 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#heroLeftHalf)">
        <rect width="48" height="28" fill="#012169" />
        <path d="M0,0 L48,28 M48,0 L0,28" stroke="#fff" strokeWidth="5" />
        <path d="M0,0 L48,28 M48,0 L0,28" stroke="#C8102E" strokeWidth="3" />
        <path d="M24,0 V28 M0,14 H48" stroke="#fff" strokeWidth="8" />
        <path d="M24,0 V28 M0,14 H48" stroke="#C8102E" strokeWidth="5" />
      </g>
      <g clipPath="url(#heroRightHalf)">
        <rect width="48" height="9.33" fill="#FF9933" />
        <rect y="9.33" width="48" height="9.33" fill="#fff" />
        <rect y="18.66" width="48" height="9.34" fill="#138808" />
        <circle cx="24" cy="14" r="4" fill="#000080" fillOpacity="0.9" />
        <circle cx="24" cy="14" r="3" fill="#fff" />
        <circle cx="24" cy="14" r="1.5" fill="#000080" />
      </g>
    </svg>
  );
}

const HIGHLIGHTS = [
  { icon: Flame, label: "Clay-oven tandoor" },
  { icon: Snowflake, label: "Fully air-conditioned" },
  { icon: Leaf, label: "Vegetarian & vegan menus" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      {/* Nanny's photo on the right, fading into the dark */}
      <div className="absolute inset-0 lg:left-auto lg:w-[60%]">
        <img
          src={HERO_IMAGE}
          alt="Old family photograph of Sandra, the 'Nanny' behind Nana Sans, smiling as she holds a baby"
          className="h-full w-full animate-slow-zoom object-cover object-[50%_20%] opacity-60 sepia-[.35] lg:opacity-90 lg:[mask-image:linear-gradient(to_right,transparent,black_55%)]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Mobile: darken the whole photo so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink lg:hidden" />
                <div className="absolute inset-0 hidden bg-gradient-to-t from-ink via-transparent to-ink/50 lg:block" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
        style={{ background: "radial-gradient(ellipse at 20% 60%, rgba(217,154,61,0.45), transparent 60%)" }}
      />
      <p className="absolute bottom-24 right-6 z-10 hidden font-display text-lg italic text-paper/70 lg:block">
        Nanny, where it all began
      </p>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
        <div className="max-w-2xl">
          <div className="mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700">
            <HeritageFlag />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-saffron-300">
              Tandoori Kitchen · Canggu, Bali
            </span>
          </div>

          <h1 className="font-display text-[3.2rem] font-light leading-[0.95] tracking-[-0.03em] animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-1000 sm:text-7xl lg:text-[6.25rem]">
            Indian soul,
            <br />
            <em className="font-normal italic text-saffron-400">British</em> heart.
            <span className="sr-only"> Nana Sans Tandoori Kitchen, Indian restaurant in Canggu, Bali</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/75 animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-300 duration-1000 sm:text-lg">
            Savour the rich flavours of traditional Indian cuisine, crafted with passion in the heart of Canggu, served
            in the cosy, home-like warmth of our fully air-conditioned dining room.
          </p>

          <div className="mt-10 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-500 duration-1000 sm:flex-row">
            <a href="#menu" className="btn-primary">
              <UtensilsCrossed className="h-4 w-4" />
              Explore the Menu
            </a>
            <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <CalendarCheck className="h-4 w-4" />
              Book a Table
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-paper/60 animate-in fade-in fill-mode-both delay-700 duration-1000">
            <a
              href={SITE.gojekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-saffron-400"
            >
              Order on Gojek
            </a>
            <a
              href={SITE.grabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-saffron-400"
            >
              Order on Grab
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-saffron-400"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Highlights strip */}
      <div className="relative z-10 border-t border-white/10 bg-ink/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-paper/80">
                <Icon className="h-4 w-4 text-saffron-400" />
                {label}
              </li>
            ))}
          </ul>
          <a
            href="#signatures"
            className="hidden items-center gap-3 text-xs uppercase tracking-[0.25em] text-paper/60 transition-colors hover:text-paper sm:flex"
          >
            Scroll
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20">
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
