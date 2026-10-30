import { MARQUEE_ITEMS } from "@/data/site";

export function Marquee({ dark = true, className = "" }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className={`px-8 font-display text-2xl font-light italic sm:text-3xl ${dark ? "text-ivory/70" : "text-ink/60"}`}>
            {item}
          </span>
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-bronze" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden border-y py-5 ${dark ? "border-white/10 bg-night" : "border-ink/10 bg-sand"} ${className}`} data-testid="editorial-marquee">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}