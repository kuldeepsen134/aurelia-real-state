import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function ProjectCard({ p, tall = false }) {
  return (
    <Link
      to={`/architecture/${p.slug}`}
      data-testid={`project-card-${p.slug}`}
      className={`group relative block overflow-hidden bg-night ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}
    >
      <div className="img-frame absolute inset-0">
        <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-bronzelight">
          <span>{p.category}</span>
          <span className="h-px w-5 bg-bronze" />
          <span className="text-ivory/60">{p.year}</span>
        </div>
        <div className="mt-2 flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-medium text-ivory">{p.title}</h3>
            <p className="mt-1 text-[13px] text-ivory/60">{p.location}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/30 text-ivory opacity-0 transition-all duration-500 group-hover:opacity-100 hover:border-bronze hover:bg-bronze">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}