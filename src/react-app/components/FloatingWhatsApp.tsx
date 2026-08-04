import { CalendarCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "6281234564499";
  const message = encodeURIComponent("Hi Nana Sans, I'd like to book a table");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is visible in viewport
      if (footerRect.top < windowHeight) {
        // Position button above the footer
        const newBottom = windowHeight - footerRect.top + 16;
        setBottomOffset(Math.max(24, newBottom));
      } else {
        setBottomOffset(24);
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
      aria-label="Book a table on WhatsApp"
    >
      <CalendarCheck className="w-6 h-6" />
      <span className="font-semibold text-sm">Book A Table</span>
    </a>
  );
}
