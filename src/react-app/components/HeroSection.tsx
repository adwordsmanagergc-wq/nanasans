import { MapPin, Instagram, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import MenuViewer from "./MenuViewer";

const HERO_IMAGE = "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/Screenshot-2026-03-28-at-3.23.52-pm.png";

export default function HeroSection() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    link.onload = () => setFontLoaded(true);
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Tandoori platter with grilled chicken, naan bread, and aromatic spices at Nana Sans Canggu"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-stone-900/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[hsl(35,30%,94%)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-6">
          {/* Main Logo */}
          <div className="flex justify-center mb-2">
            <img
              src="https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/nana-sans-logo.png"
              alt="Nana Sans Tandoori Kitchen logo - Indian restaurant in Canggu Bali"
              className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto drop-shadow-2xl"
              loading="eager"
            />
          </div>
          <div className="inline-block px-4 py-1 bg-amber-600/20 backdrop-blur-sm rounded-full border border-amber-400/30 mb-2">
            <span className="text-amber-200 text-sm tracking-widest uppercase font-light">
              Indian Cuisine With British Influence • Canggu, Bali
            </span>
          </div>
          {/* Combined British-Indian Flag - Below tagline */}
          <div className="flex items-center justify-center gap-1 mb-6">
            <svg width="48" height="28" viewBox="0 0 48 28" className="drop-shadow-lg">
              {/* British Flag (Left half) */}
              <defs>
                <clipPath id="leftHalf">
                  <path d="M0,0 L24,14 L0,28 Z" />
                </clipPath>
                <clipPath id="rightHalf">
                  <path d="M48,0 L24,14 L48,28 Z" />
                </clipPath>
              </defs>
              {/* UK side */}
              <g clipPath="url(#leftHalf)">
                <rect x="0" y="0" width="48" height="28" fill="#012169" />
                <path d="M0,0 L48,28 M48,0 L0,28" stroke="#fff" strokeWidth="5" />
                <path d="M0,0 L48,28 M48,0 L0,28" stroke="#C8102E" strokeWidth="3" />
                <path d="M24,0 V28 M0,14 H48" stroke="#fff" strokeWidth="8" />
                <path d="M24,0 V28 M0,14 H48" stroke="#C8102E" strokeWidth="5" />
              </g>
              {/* India side */}
              <g clipPath="url(#rightHalf)">
                <rect x="0" y="0" width="48" height="9.33" fill="#FF9933" />
                <rect x="0" y="9.33" width="48" height="9.33" fill="#fff" />
                <rect x="0" y="18.66" width="48" height="9.33" fill="#138808" />
                <circle cx="24" cy="14" r="4" fill="#000080" fillOpacity="0.9" />
                <circle cx="24" cy="14" r="3" fill="#fff" />
                <circle cx="24" cy="14" r="1.5" fill="#000080" />
              </g>
              {/* Center divider line */}
              <path d="M24,14 L0,0 M24,14 L0,28" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        <p
          className="text-lg sm:text-xl text-stone-300 mt-6 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
        >
          Savour the rich flavours of traditional Indian cuisine, crafted with
          passion in the heart of Canggu — served in the cosy, home-like warmth
          of our fully air-conditioned dining room.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={openMenu}
            className="group flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-amber-900/30 min-w-[180px] whitespace-nowrap"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <UtensilsCrossed className="w-5 h-5" />
            View Our Menu
          </button>

          <a
            href="https://www.google.com/maps/dir//Nana+Sans+Tandoori+Indian+Restaurant+Canggu,+Jl.+Raya+Canggu,+Tibubeneng,+Kuta+Utara,+Badung+Regency,+Bali+80361/@-8.7185538,115.2481957,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x2dd23990a4833983:0xb1371ea48cd70454!2m2!1d115.1545625!2d-8.6413098?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 border border-white/20 hover:border-white/40 min-w-[180px] whitespace-nowrap"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </a>

          <a
            href="https://gofood.co.id/bali/restaurant/nana-sans-tandoori-kitchen-indian-restaurant-jalan-raya-canggu-no-10c-f682a778-bdca-4b87-bf0c-ffdaa384737a"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#00AA13] hover:bg-[#008F10] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-green-900/30 min-w-[180px] whitespace-nowrap"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <ShoppingBag className="w-5 h-5" />
            Order on Gojek
          </a>

          <a
            href="https://food.grab.com/id/id/restaurant/nanasans-tandoori-kitchen-tibubeneng-delivery/6-C3DJGCL1BBUCUA"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-[#00B14F] hover:bg-[#009644] text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-green-900/30 min-w-[180px] whitespace-nowrap"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <ShoppingBag className="w-5 h-5" />
            Order on Grab
          </a>

          <a
            href="https://www.instagram.com/nanasans_bali/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-xl shadow-purple-900/30 min-w-[180px] whitespace-nowrap"
            style={{ fontFamily: fontLoaded ? "'Outfit', sans-serif" : "sans-serif" }}
          >
            <Instagram className="w-5 h-5" />
            Follow Us
          </a>
        </div>

        <Link
          to="/menu"
          className="inline-block mt-6 text-amber-200 hover:text-amber-100 underline underline-offset-4 text-sm"
        >
          See our full menu &amp; prices
        </Link>

      </div>

      {/* Menu Viewer Modal */}
      <MenuViewer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </section>
  );
}
