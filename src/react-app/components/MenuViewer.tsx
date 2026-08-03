import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const menuImages = [
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/1Starters-Sides.jpg",
    alt: "Starters & Sides",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/2Meat-Curries.jpg",
    alt: "Meat Curries",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/3Vegetarian-Curries.jpg",
    alt: "Vegetarian Curries",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/4Vegan-Curries.jpg",
    alt: "Vegan Curries",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/5Mains.jpg",
    alt: "Mains",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/6Nans-Tandoori-Grill.jpg",
    alt: "Nana's Tandoori Grill",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/7Wraps.jpg",
    alt: "Wraps",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/8Box-Specials.jpg",
    alt: "Box Specials",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/9Naans-Rotis.jpg",
    alt: "Naans & Rotis",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/10Sauces-Chutney.jpg",
    alt: "Sauces & Chutney",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/11-rice-biryani.jpg",
    alt: "Rice & Biryani",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/12tea.jpg",
    alt: "Tea",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/13drinks.jpg",
    alt: "Drinks",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/14-fresh-juice.jpg",
    alt: "Fresh Juice",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/15signature-drinks.jpg",
    alt: "Signature Drinks",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/16signatured-drinks2.jpg",
    alt: "Signature Drinks 2",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/17desserts.jpg",
    alt: "Desserts",
  },
  {
    src: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/18ourstory.jpg",
    alt: "Our Story",
  },
];

interface MenuViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuViewer({ isOpen, onClose }: MenuViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % menuImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + menuImages.length) % menuImages.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close menu"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Page indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
        {currentIndex + 1} / {menuImages.length}
      </div>

      {/* Navigation arrows - desktop */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
        aria-label="Next page"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Image container with swipe support */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center px-4 py-16"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={menuImages[currentIndex].src}
          alt={menuImages[currentIndex].alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {menuImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-amber-500 w-6"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint for mobile */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:hidden">
        Swipe to navigate
      </div>
    </div>
  );
}
