import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List, RotateCcw, ChevronDown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { CTASection } from "@/components/CTASection";
import { useStore } from "@/store/AppStore";
import { PROPERTY_TYPES, PROPERTY_STATUSES, LOCATIONS, priceLabel } from "@/data/properties";
import { useSEO } from "@/lib/seo";
import { EASE } from "@/lib/motion";

const SORTS = [
  { id: "featured", label: "Featured First" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

const initialFilters = { search: "", location: "All", type: "All", status: "All", beds: "Any", baths: "Any", minPrice: "", maxPrice: "" };

export default function RealEstate() {
  useSEO({
    title: "Real Estate — Luxury Properties | Aurelia & Stone",
    description: "Browse curated luxury villas, penthouses and estates. Search, filter and explore properties by Aurelia & Stone.",
  });
  const { properties } = useStore();
  const [f, setF] = useState(initialFilters);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [visible, setVisible] = useState(6);

  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setVisible(6); };

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      if (f.search && !(`${p.name} ${p.location} ${p.type}`.toLowerCase().includes(f.search.toLowerCase()))) return false;
      if (f.location !== "All" && p.location !== f.location) return false;
      if (f.type !== "All" && p.type !== f.type) return false;
      if (f.status !== "All" && p.status !== f.status) return false;
      if (f.beds !== "Any" && p.beds < +f.beds) return false;
      if (f.baths !== "Any" && p.baths < +f.baths) return false;
      if (f.minPrice && p.price < +f.minPrice) return false;
      if (f.maxPrice && p.price > +f.maxPrice) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest") list = [...list].sort((a, b) => (b.added || "").localeCompare(a.added || ""));
    if (sort === "featured") list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [properties, f, sort]);

  const shown = results.slice(0, visible);
  const selectCls = "w-full appearance-none border border-ink/15 bg-white px-3.5 py-2.5 pr-9 text-[13px] text-ink focus:border-bronze";

  return (
    <>
      <PageHero
        eyebrow="Real Estate Curation"
        lines={["Estates Worth", "the Address."]}
        image="https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="A curated portfolio of design-led villas, penthouses and estates — every listing architected or vetted by our studio."
      />

      <section className="container-x py-16 lg:py-24" data-testid="real-estate-browser">
        <div className="border border-ink/10 bg-white p-5 sm:p-7" data-testid="property-filters">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone" />
              <input
                value={f.search}
                onChange={set("search")}
                placeholder="Search properties…"
                aria-label="Search properties"
                data-testid="property-search"
                className="w-full border border-ink/15 bg-white py-2.5 pl-10 pr-3.5 text-[13px] focus:border-bronze"
              />
            </div>
            <div className="relative">
              <select value={f.location} onChange={set("location")} aria-label="Location filter" data-testid="filter-location" className={selectCls}>
                <option value="All">All Locations</option>
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
            <div className="relative">
              <select value={f.type} onChange={set("type")} aria-label="Property type filter" data-testid="filter-type" className={selectCls}>
                <option value="All">All Types</option>
                {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
            <div className="relative">
              <select value={f.status} onChange={set("status")} aria-label="Status filter" data-testid="filter-status" className={selectCls}>
                <option value="All">Any Status</option>
                {PROPERTY_STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <select value={f.beds} onChange={set("beds")} aria-label="Minimum bedrooms" data-testid="filter-beds" className={selectCls}>
                {["Any", "2", "3", "4", "5", "6"].map((b) => <option key={b} value={b}>{b === "Any" ? "Any Bedrooms" : `${b}+ Beds`}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
            <div className="relative">
              <select value={f.baths} onChange={set("baths")} aria-label="Minimum bathrooms" data-testid="filter-baths" className={selectCls}>
                {["Any", "2", "3", "4", "5"].map((b) => <option key={b} value={b}>{b === "Any" ? "Any Bathrooms" : `${b}+ Baths`}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
            <div className="relative">
              <select value={f.minPrice} onChange={set("minPrice")} aria-label="Minimum price" data-testid="filter-min-price" className={selectCls}>
                <option value="">Min Price</option>
                {[2000000, 5000000, 10000000, 15000000].map((v) => <option key={v} value={v}>{priceLabel(v)}+</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
            <div className="relative">
              <select value={f.maxPrice} onChange={set("maxPrice")} aria-label="Maximum price" data-testid="filter-max-price" className={selectCls}>
                <option value="">Max Price</option>
                {[5000000, 10000000, 15000000, 25000000].map((v) => <option key={v} value={v}>Up to {priceLabel(v)}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
            <p className="text-[13px] text-inksoft/70" data-testid="results-count">
              <span className="font-display text-xl text-bronze">{results.length}</span> {results.length === 1 ? "property" : "properties"} found
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort properties" data-testid="property-sort" className={selectCls}>
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone" />
              </div>
              <div className="flex border border-ink/15" data-testid="view-toggle">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  data-testid="view-grid"
                  className={`p-2.5 ${view === "grid" ? "bg-ink text-ivory" : "text-inksoft hover:text-bronze"}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  data-testid="view-list"
                  className={`p-2.5 ${view === "list" ? "bg-ink text-ivory" : "text-inksoft hover:text-bronze"}`}
                >
                  <List size={16} />
                </button>
              </div>
              <button
                onClick={() => { setF(initialFilters); setSort("featured"); setVisible(6); }}
                data-testid="filter-reset"
                className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.15em] text-inksoft transition-colors hover:text-bronze"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>
        </div>

        {shown.length === 0 ? (
          <div className="mt-16 border border-dashed border-ink/20 py-24 text-center" data-testid="no-results">
            <p className="font-display text-2xl">No properties match your search.</p>
            <p className="mt-2 text-sm text-inksoft/60">Try widening the price range or clearing a filter.</p>
            <button onClick={() => { setF(initialFilters); setVisible(6); }} className="mt-6 bg-ink px-6 py-3 text-[12px] uppercase tracking-[0.2em] text-ivory hover:bg-bronze">
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div layout className={`mt-10 grid gap-6 ${view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`} data-testid="property-grid">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
              >
                <PropertyCard p={p} view={view} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {visible < results.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisible((v) => v + 6)}
              data-testid="load-more"
              className="border border-ink px-10 py-4 text-[12px] font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:bg-ink hover:text-ivory"
            >
              Load More ({results.length - visible} remaining)
            </button>
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}