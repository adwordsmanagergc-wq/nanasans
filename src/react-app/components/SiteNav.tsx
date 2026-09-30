import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CalendarCheck, Menu as MenuIcon, X } from "lucide-react";
import { SITE } from "@/data/site";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Menu", to: "/#menu" },
  { label: "Our Story", to: "/#story" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Visit", to: "/#visit" },
  { label: "Journal", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

interface SiteNavProps {
  /** Start transparent over a full-bleed hero and turn solid on scroll. */
  overlay?: boolean;
}

export default function SiteNav({ overlay = false }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !overlay || scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "border-b border-white/5 bg-ink/90 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Nana Sans home" onClick={() => setOpen(false)}>
          <Logo
            className={`w-auto drop-shadow-lg transition-all duration-500 ${solid ? "h-12" : "h-16 sm:h-20"}`}
            wordmarkClassName={solid ? "text-xl" : "text-2xl"}
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="group relative text-[0.8rem] font-medium uppercase tracking-[0.18em] text-paper/80 transition-colors hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-saffron-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={SITE.bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex"
          >
            <CalendarCheck className="h-4 w-4" />
            Book a Table
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-paper transition-colors hover:bg-white/10 lg:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile drawer (outside the header: its backdrop blur would trap fixed children) */}
      <div
        className={`fixed inset-0 z-30 overflow-y-auto bg-ink pt-20 transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-8">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.label}
              className="border-b border-white/10 transition-all duration-500"
              style={{
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                transform: open ? "none" : "translateY(12px)",
                opacity: open ? 1 : 0,
              }}
            >
              <Link
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-3xl text-paper"
              >
                {link.label}
                <span className="text-sm font-sans text-saffron-400">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pt-8">
          <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
            <CalendarCheck className="h-4 w-4" />
            Book a Table on WhatsApp
          </a>
          <p className="mt-6 text-center text-xs uppercase tracking-[0.25em] text-paper/50">{SITE.hours}</p>
        </div>
      </div>
    </>
  );
}
