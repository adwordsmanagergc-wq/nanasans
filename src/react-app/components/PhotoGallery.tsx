import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { CDN, SITE } from "@/data/site";
import { PHOTO_GEO } from "@/data/photoGeo";
import Reveal from "./Reveal";

const galleryImages = [
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.23.52-pm.png`,
    alt: "Authentic tandoori platter at Nana Sans Tandoori Kitchen in Canggu, Bali",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.16.18-pm.png`,
    alt: "Creamy chicken tikka masala curry served at Nana Sans Indian restaurant Canggu",
    span: "",
  },
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.23.22-pm.png`,
    alt: "Air-conditioned indoor dining area at Nana Sans Tandoori Kitchen Bali",
    span: "md:row-span-2",
  },
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.16.53-pm.png`,
    alt: "Traditional Indian heritage dishes at Nana Sans Canggu",
    span: "",
  },
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.16.33-pm.png`,
    alt: "Vegetarian Indian curry at Nana Sans Bali",
    span: "col-span-2",
  },
  {
    src: `${CDN}/Screenshot-2026-03-28-at-3.16.26-pm.png`,
    alt: "Flame-grilled tandoori chicken platter fresh from the clay oven in Canggu",
    span: "md:col-span-2",
  },
];

export default function PhotoGallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (delta: number) =>
      setActive((i) => (i === null ? i : (i + delta + galleryImages.length) % galleryImages.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <section id="gallery" className="bg-paper-200 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
              A taste of <em className="italic text-chili">Nana Sans</em>
            </h2>
          </div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline self-start md:self-auto"
          >
            <Instagram className="h-4 w-4" />
            {SITE.instagramHandle}
          </a>
        </Reveal>

        <div className="grid grid-flow-row-dense auto-rows-[220px] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={(index % 3) * 100} className={`${image.span} ${index === 0 ? "col-span-2" : ""}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-ink-600 via-ink-700 to-ink"
                aria-label={`View photo: ${PHOTO_GEO[image.src] ?? image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="img-caption absolute bottom-4 left-4 translate-y-2 font-display text-lg italic text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {PHOTO_GEO[image.src]}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/95 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper hover:bg-white/10"
            aria-label="Close photo"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/60 text-paper hover:border-saffron-400 sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              key={galleryImages[active].src}
              src={galleryImages[active].src}
              alt={galleryImages[active].alt}
              className="max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl animate-in fade-in zoom-in-95 duration-500"
            />
            <figcaption className="mt-4 text-center font-display text-lg italic text-paper/80">
              {PHOTO_GEO[galleryImages[active].src]}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/60 text-paper hover:border-saffron-400 sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
