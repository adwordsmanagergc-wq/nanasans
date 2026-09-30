const ITEMS = [
  "Tandoori Chicken",
  "Butter Chicken",
  "Garlic Naan",
  "Chicken Korma",
  "Lamb Biryani",
  "Paneer Makhni",
  "Dal Tadka",
  "Mango Lassi",
  "Lamb Seekh Kebab",
  "Gulab Jamun",
];

/** A slow ribbon of dish names between sections. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-2xl italic sm:text-3xl">{item}</span>
          <span className="text-lg text-ink/50">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-ink/10 bg-saffron-500 py-4 text-ink">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
