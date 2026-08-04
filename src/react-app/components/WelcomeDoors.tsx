import { useCallback, useEffect, useState } from "react";
import { DoorOpen } from "lucide-react";

const LOGO =
  "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/nana-sans-logo.png";

type Phase = "closed" | "opening" | "done";

/** Decorative carved panel for one door leaf. */
function DoorLeaf({ side }: { side: "left" | "right" }) {
  const handleEdge = side === "left" ? "right-0" : "left-0";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Wood body with vertical plank texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 54px, rgba(0,0,0,0.28) 56px), linear-gradient(105deg, #3a2413 0%, #5b3a1f 45%, #6b471f 55%, #3a2413 100%)",
        }}
      />
      {/* Soft inner shadow toward the meeting edge for depth */}
      <div
        className={`absolute inset-y-0 ${handleEdge} w-24`}
        style={{
          background:
            side === "left"
              ? "linear-gradient(to right, transparent, rgba(0,0,0,0.55))"
              : "linear-gradient(to left, transparent, rgba(0,0,0,0.55))",
        }}
      />

      {/* Carved gold ornamentation */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 200 640"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={`gold-${side}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6e27a" />
            <stop offset="0.5" stopColor="#c9992e" />
            <stop offset="1" stopColor="#8a6416" />
          </linearGradient>
        </defs>
        {/* Outer frame */}
        <rect
          x="14"
          y="14"
          width="172"
          height="612"
          rx="10"
          stroke={`url(#gold-${side})`}
          strokeWidth="4"
        />
        <rect
          x="26"
          y="26"
          width="148"
          height="588"
          rx="6"
          stroke={`url(#gold-${side})`}
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Pointed Mughal arch niche (upper panel) */}
        <path
          d="M44 300 L44 150 C44 96 68 58 100 42 C132 58 156 96 156 150 L156 300"
          stroke={`url(#gold-${side})`}
          strokeWidth="3"
        />
        <path
          d="M58 300 L58 156 C58 110 76 78 100 64 C124 78 142 110 142 156 L142 300"
          stroke={`url(#gold-${side})`}
          strokeWidth="1.5"
          opacity="0.7"
        />
        {/* Lower rectangular carved panel */}
        <rect
          x="52"
          y="340"
          width="96"
          height="248"
          rx="6"
          stroke={`url(#gold-${side})`}
          strokeWidth="2"
          opacity="0.8"
        />
        <path
          d="M100 360 L128 388 L100 416 L72 388 Z"
          stroke={`url(#gold-${side})`}
          strokeWidth="1.5"
          opacity="0.7"
        />
      </svg>

      {/* Center medallion (sunburst) */}
      <div
        className={`absolute top-[33%] ${
          side === "left" ? "right-8" : "left-8"
        } -translate-y-1/2`}
      >
        <div
          className="h-14 w-14 rounded-full border-2 border-amber-300/70"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #f8e79b, #c8971f 60%, #7c5712)",
            boxShadow: "0 0 18px rgba(240,200,90,0.35)",
          }}
        />
      </div>

      {/* Brass handle ring at the meeting edge */}
      <div
        className={`absolute top-1/2 ${handleEdge} mx-3 -translate-y-1/2`}
      >
        <div
          className="h-16 w-16 rounded-full border-4"
          style={{
            borderColor: "#d9a93a",
            background:
              "radial-gradient(circle at 40% 35%, rgba(255,240,190,0.5), rgba(120,80,20,0.15))",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function WelcomeDoors() {
  const [phase, setPhase] = useState<Phase>("closed");

  // Open the doors, then remove the overlay once they've swung apart.
  const open = useCallback(() => {
    setPhase((prev) => {
      if (prev !== "closed") return prev;
      sessionStorage.setItem("nanaSansWelcomeSeen", "1");
      window.setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 1800);
      return "opening";
    });
  }, []);

  useEffect(() => {
    // Show once per browser session so it doesn't reappear on every navigation.
    if (sessionStorage.getItem("nanaSansWelcomeSeen")) {
      setPhase("done");
      return;
    }

    // Load the display font used for the greeting.
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Lock scrolling while the doors are closed.
    document.body.style.overflow = "hidden";

    // Let visitors open the doors with the Enter (or Space) key.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (phase === "done") return null;

  const opening = phase === "opening";

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden ${
        opening ? "pointer-events-none" : "cursor-pointer"
      }`}
      onClick={opening ? undefined : open}
      role="button"
      tabIndex={-1}
      aria-label="Enter the Nana Sans website"
    >
      {/* Warm backdrop revealed as the doors part */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950 to-stone-950" />

      {/* Left door leaf */}
      <div
        className="door-leaf absolute inset-y-0 left-0 w-1/2 origin-left"
        style={{
          transform: opening ? "translateX(-101%)" : "translateX(0)",
          boxShadow: "8px 0 24px rgba(0,0,0,0.6)",
        }}
      >
        <DoorLeaf side="left" />
      </div>

      {/* Right door leaf */}
      <div
        className="door-leaf absolute inset-y-0 right-0 w-1/2 origin-right"
        style={{
          transform: opening ? "translateX(101%)" : "translateX(0)",
          boxShadow: "-8px 0 24px rgba(0,0,0,0.6)",
        }}
      >
        <DoorLeaf side="right" />
      </div>

      {/* Welcome greeting sitting over the closed doors */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-700 ${
          opening ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <img
          src={LOGO}
          alt="Nana Sans Tandoori Kitchen"
          className="mb-5 w-40 drop-shadow-2xl sm:w-52"
        />
        <span className="mb-3 inline-block rounded-full border border-amber-300/40 bg-amber-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-amber-200">
          Canggu, Bali
        </span>
        <h1
          className="text-4xl font-semibold text-amber-100 drop-shadow-lg sm:text-6xl"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Welcome to Nana Sans
        </h1>
        <div className="mt-4 flex items-center gap-3 text-amber-200/60">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-300/70 sm:w-12" />
          <span
            className="text-base font-semibold uppercase tracking-[0.18em] text-amber-100 drop-shadow-md sm:text-xl"
            style={{ textShadow: "0 1px 12px rgba(240,200,90,0.35)" }}
          >
            Authentic Tandoori &amp; British-Indian Cuisine
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-300/70 sm:w-12" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="group mt-8 inline-flex items-center gap-3 rounded-full border border-amber-300/50 bg-amber-600/90 px-8 py-3.5 font-medium text-white shadow-xl shadow-amber-900/40 transition-all duration-300 hover:scale-105 hover:bg-amber-600"
        >
          <DoorOpen className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Enter
        </button>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-amber-200/60">
          Tap anywhere or press Enter
        </p>
      </div>

      <style>{`
        .door-leaf {
          transition: transform 1.6s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .door-leaf {
            transition: transform 0.4s ease-out;
          }
        }
      `}</style>
    </div>
  );
}
