import { CalendarCheck, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingWhatsApp() {
  const phoneNumber = "6281234564499";
  const bookUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hi Nana Sans, I'd like to book a table"
  )}`;
  const chatUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hey Nana Sans, I'm hungry"
  )}`;

  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const updatePosition = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If footer is visible in viewport
      if (footerRect.top < windowHeight) {
        // Position buttons above the footer
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
    <div
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-6 z-50 flex flex-col items-end gap-3"
    >
      {/* Book A Table */}
      <a
        href={bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
        aria-label="Book a table on WhatsApp"
      >
        <CalendarCheck className="w-6 h-6" />
        <span className="font-semibold text-sm">Book A Table</span>
      </a>

      {/* Chat Now */}
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="font-semibold text-sm">Chat Now</span>
      </a>
    </div>
  );
}
