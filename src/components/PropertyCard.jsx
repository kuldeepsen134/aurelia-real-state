import { Link } from "react-router-dom";
import { BedDouble, Bath, Ruler, MapPin, ArrowUpRight } from "lucide-react";
import { priceLabel } from "@/data/properties";

const statusStyle = {
  "For Sale": "bg-bronze text-white",
  "New Listing": "bg-ink text-ivory",
  Reserved: "bg-stonelight text-ink",
  "Off-Market": "bg-white/85 text-ink border border-ink/15",
};

export function PropertyCard({ p, view = "grid" }) {
  if (view === "list") {
    return (
      <Link
        to={`/real-estate/${p.slug}`}
        data-testid={`property-card-${p.slug}`}
        className="group grid gap-6 border border-ink/10 bg-white p-4 transition-all duration-500 hover:border-bronze/50 hover:shadow-[0_20px_60px_-30px_rgba(32,32,32,0.35)] sm:grid-cols-[300px_1fr]"
      >
        <div className="img-frame aspect-[4/3]">
          <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-between py-1 pr-1">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${statusStyle[p.status] || statusStyle["For Sale"]}`}>{p.status}</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-stone">{p.type}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl">{p.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-inksoft/70">
              <MapPin size={13} /> {p.location}
            </p>
            <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-inksoft/70">{p.description}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex gap-5 text-[13px] text-inksoft/80">
              <span className="inline-flex items-center gap-1.5"><BedDouble size={15} /> {p.beds}</span>
              <span className="inline-flex items-center gap-1.5"><Bath size={15} /> {p.baths}</span>
              <span className="inline-flex items-center gap-1.5"><Ruler size={15} /> {p.area}</span>
            </div>
            <span className="font-display text-xl text-bronze">{priceLabel(p.price)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/real-estate/${p.slug}`}
      data-testid={`property-card-${p.slug}`}
      className="group block bg-white border border-ink/10 transition-all duration-500 hover:border-bronze/50 hover:shadow-[0_24px_70px_-32px_rgba(32,32,32,0.4)]"
    >
      <div className="img-frame relative aspect-[4/3]">
        <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
        <span className={`absolute left-4 top-4 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ${statusStyle[p.status] || statusStyle["For Sale"]}`}>
          {p.status}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{p.name}</h3>
          <span className="whitespace-nowrap font-display text-lg text-bronze">{priceLabel(p.price)}</span>
        </div>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-inksoft/70">
          <MapPin size={13} /> {p.location}
        </p>
        <div className="mt-4 flex gap-5 border-t border-ink/10 pt-4 text-[13px] text-inksoft/80">
          <span className="inline-flex items-center gap-1.5"><BedDouble size={15} /> {p.beds} bd</span>
          <span className="inline-flex items-center gap-1.5"><Bath size={15} /> {p.baths} ba</span>
          <span className="inline-flex items-center gap-1.5"><Ruler size={15} /> {p.area}</span>
        </div>
      </div>
    </Link>
  );
}