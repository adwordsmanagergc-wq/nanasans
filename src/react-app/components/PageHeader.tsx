import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import SiteNav from "./SiteNav";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  back?: { to: string; label: string };
}

/** Dark masthead shared by the inner pages (journal, FAQ, privacy). */
export default function PageHeader({ eyebrow, title, intro, back = { to: "/", label: "Back to Home" } }: PageHeaderProps) {
  return (
    <>
      <SiteNav />
      <header className="relative overflow-hidden bg-ink px-5 pb-16 pt-36 text-paper sm:px-8 sm:pb-20 sm:pt-44">
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,154,61,0.55), transparent 65%)" }}
        />
        <div className="relative mx-auto max-w-7xl">
          <Link
            to={back.to}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-saffron-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {back.label}
          </Link>
          <div className="mt-10">
            <p className="eyebrow text-saffron-400">{eyebrow}</p>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-light leading-[1.05] sm:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/65">{intro}</p>}
        </div>
      </header>
    </>
  );
}
