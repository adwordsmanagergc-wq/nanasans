import { CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { SITE } from "@/data/site";

export default function FloatingWhatsApp() {
  const [bottomOffset, setBottomOffset] = useState(24);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      // Stay out of the way until the visitor has scrolled past the hero.
      setVisible(window.scrollY > window.innerHeight * 0.6);

      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is visible in viewport, position button above the footer
      if (footerRect.top < windowHeight) {
        const newBottom = windowHeight - footerRect.top + 16;
        setBottomOffset(Math.max(24, newBottom));
      } else {
        setBottomOffset(24);
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <a
      href={SITE.bookUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ bottom: `${bottomOffset}px` }}
      className={`group fixed right-5 z-30 flex items-center gap-3 rounded-full border border-saffron-300/40 bg-ink py-2 pl-2 pr-5 text-paper shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-0.5 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-label="Book a table on WhatsApp"
      tabIndex={visible ? 0 : -1}
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <CalendarCheck className="relative h-5 w-5" />
      </span>
      <span className="text-sm font-semibold tracking-wide">Book a Table</span>
    </a>
  );
}
