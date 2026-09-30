import { ArrowUp, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { SITE } from "@/data/site";
import Logo from "./Logo";

const linkClass = "text-paper/65 transition-colors hover:text-saffron-300";

export default function Footer() {
  const whatsappNumber = "61488898835";
  const whatsappMessage = encodeURIComponent("Hi Metatap!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ink-900 text-paper">
      {/* Oversized wordmark */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-[0.18em] select-none text-center font-display text-[22vw] font-light italic leading-none text-white/[0.03]">
        Nana Sans
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="h-20 w-auto" wordmarkClassName="text-3xl" />
            <p className="mt-6 max-w-xs font-display text-2xl font-light italic leading-snug text-paper/85">
              Indian cuisine with British influence, cooked with love in Canggu.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nana Sans on Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-saffron-400 hover:text-saffron-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Nana Sans on WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition-colors hover:border-saffron-400 hover:text-saffron-300"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.25em] text-saffron-400">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/#menu" className={linkClass}>Menu</Link></li>
              <li><Link to="/#story" className={linkClass}>Our Story</Link></li>
              <li><Link to="/#gallery" className={linkClass}>Gallery</Link></li>
              <li><Link to="/blog" className={linkClass}>Blog</Link></li>
              <li><Link to="/faq" className={linkClass}>FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.25em] text-saffron-400">Order & Book</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Book a Table</a></li>
              <li><a href={SITE.gojekUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Order on Gojek</a></li>
              <li><a href={SITE.grabUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Order on Grab</a></li>
              <li><a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.25em] text-saffron-400">Find Us</h3>
            <address className="mt-5 space-y-3 text-sm not-italic text-paper/65">
              <p>
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </p>
              <p>Daily, 11:00 am – 10:00 pm</p>
              <p>
                <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Directions ↗
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-xs text-paper/45 md:flex-row">
          <p>© {new Date().getFullYear()} Nana Sans Tandoori Kitchen. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/privacy" className="transition-colors hover:text-paper">
              Privacy Policy
            </Link>
            <span className="flex items-center gap-2">
              <span>
                Website built by{" "}
                <a
                  href="https://metatapdigital.com"
                  target="_blank"
                  rel="noopener"
                  className="text-paper/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-saffron-300"
                >
                  metatapdigital.com
                </a>
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-[10px] text-white transition-colors hover:bg-green-500"
              >
                <MessageCircle className="h-3 w-3" />
                <span>Metatap</span>
              </a>
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-paper/70 transition-colors hover:border-saffron-400 hover:text-saffron-300"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
