import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { useStore } from "@/store/AppStore";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { useSEO } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Architecture() {
  useSEO({
    title: "Architecture Portfolio — Aurelia & Stone",
    description: "An immersive portfolio of residential, commercial, villa, interior, institutional and landscape architecture by Aurelia & Stone.",
  });
  const { projects } = useStore();
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  const heights = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]"];

  return (
    <>
      <PageHero
        eyebrow="Architecture Portfolio"
        lines={["Works in Stone,", "Glass & Silence."]}
        image="https://images.unsplash.com/photo-1614595737476-42487331b8a1?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="Twelve selected works across six disciplines — each one an argument for building slowly and well."
      />

      <section className="container-x py-16 lg:py-24" data-testid="architecture-gallery">
        <div className="flex flex-wrap gap-2" data-testid="architecture-filters">
          {PROJECT_CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`arch-filter-${c.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                cat === c ? "border-ink bg-ink text-ivory" : "border-ink/20 text-inksoft hover:border-bronze hover:text-bronze"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto self-center text-[12px] tracking-[0.15em] text-stone" data-testid="architecture-count">
            {shown.length} {shown.length === 1 ? "work" : "works"}
          </span>
        </div>

        <motion.div layout className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: EASE }}
                className="group relative mb-6 break-inside-avoid"
              >
                <Link to={`/architecture/${p.slug}`} data-testid={`arch-item-${p.slug}`} className="block">
                  <div className={`img-frame relative ${heights[i % heights.length]}`}>
                    <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/25" />
                    <span className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-3 border-b border-ink/10 py-4">
                    <div>
                      <h3 className="font-display text-xl">{p.title}</h3>
                      <p className="mt-0.5 text-[12px] uppercase tracking-[0.16em] text-stone">{p.category} · {p.location}</p>
                    </div>
                    <span className="font-display text-sm text-bronze">{p.year}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <CTASection />
    </>
  );
}