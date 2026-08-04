import { MessageCircle } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  const whatsappNumber = "61488898835";
  const whatsappMessage = encodeURIComponent("Hi Metatap!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <button
            onClick={scrollToTop}
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Menu
          </button>
          <a
            href="https://maps.app.goo.gl/BwSJsaJaS3CmDTDF9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Directions
          </a>
          <a
            href="https://gofood.co.id/bali/restaurant/nana-sans-tandoori-kitchen-indian-restaurant-jalan-raya-canggu-no-10c-f682a778-bdca-4b87-bf0c-ffdaa384737a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Order on Gojek
          </a>
          <a
            href="https://food.grab.com/id/id/restaurant/nanasans-tandoori-kitchen-tibubeneng-delivery/6-C3DJGCL1BBUCUA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Order on Grab
          </a>
          <a
            href="https://www.instagram.com/nanasans_bali/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Instagram
          </a>
          <Link
            to="/blog"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Blog
          </Link>
          <Link
            to="/faq"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            FAQ
          </Link>
          <Link
            to="/privacy"
            className="hover:text-amber-400 transition-colors text-sm"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-700 my-6" />

        {/* Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-stone-400">
          <span>Website & marketing by Metatap Pty Ltd</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded-full transition-colors text-[10px]"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Metatap</span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-stone-500 mt-4">
          © {new Date().getFullYear()} Nana Sans Tandoori Kitchen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
