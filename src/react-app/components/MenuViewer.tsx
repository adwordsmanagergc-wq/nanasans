import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MENU_PAGES } from "@/data/menu";

interface MenuViewerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Page to show when the viewer opens. */
  startIndex?: number;
}

const MIN_SWIPE_DISTANCE = 50;

export default function MenuViewer({ isOpen, onClose, startIndex = 0 }: MenuViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setLoaded(false);
    setCurrentIndex((index + MENU_PAGES.length) % MENU_PAGES.length);
  }, []);

  const goToNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goToPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  useEffect(() => {
    if (!isOpen) return;
    setLoaded(false);
    setCurrentIndex(startIndex);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, startIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);

  // Keep the active chapter visible in the chapter strip.
  useEffect(() => {
    const active = thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`);
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [currentIndex, isOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStart.current === null || touchEnd.current === null) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > MIN_SWIPE_DISTANCE) goToNext();
    if (distance < -MIN_SWIPE_DISTANCE) goToPrev();
  };

  if (!isOpen) return null;

  const page = MENU_PAGES[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-ink-900/[0.97] text-paper backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Nana Sans menu"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="min-w-0">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-saffron-400">
            {String(currentIndex + 1).padStart(2, "0")} / {String(MENU_PAGES.length).padStart(2, "0")}
          </p>
          <p className="truncate font-display text-xl sm:text-2xl">{page.alt}</p>
        </div>
        <button
          onClick={onClose}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Page */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!loaded && (
          <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-saffron-400" />
        )}
        <img
          key={page.src}
          src={page.src}
          alt={page.alt}
          onLoad={() => setLoaded(true)}
          className={`max-h-full max-w-full rounded-md object-contain shadow-2xl transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          draggable={false}
        />

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/60 transition-colors hover:border-saffron-400 hover:text-saffron-300 sm:grid"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink/60 transition-colors hover:border-saffron-400 hover:text-saffron-300 sm:grid"
          aria-label="Next page"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Chapter strip */}
      <div
        ref={thumbsRef}
        className="flex gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:justify-center sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {MENU_PAGES.map((p, index) => (
          <button
            key={p.src}
            data-index={index}
            onClick={() => goTo(index)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              index === currentIndex
                ? "border-saffron-400 bg-saffron-500 text-ink"
                : "border-white/15 text-paper/70 hover:border-white/40 hover:text-paper"
            }`}
            aria-label={`Go to ${p.alt}`}
            aria-current={index === currentIndex}
          >
            {p.alt}
          </button>
        ))}
      </div>
    </div>
  );
}
