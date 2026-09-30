import { useState } from "react";
import { LOGO } from "@/data/site";

/** The Nana Sans logo, falling back to a typeset wordmark if the image is missing. */
export default function Logo({ className = "", wordmarkClassName = "text-2xl" }: { className?: string; wordmarkClassName?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="inline-flex flex-col items-center leading-none text-paper" aria-label="Nana Sans Tandoori Kitchen">
        <span className={`font-display italic text-saffron-300 ${wordmarkClassName}`}>Nana Sans</span>
        <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-paper/70">Tandoori Kitchen</span>
      </span>
    );
  }

  return (
    <img
      src={LOGO}
      alt="Nana Sans Tandoori Kitchen logo"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
