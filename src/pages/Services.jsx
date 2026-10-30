import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/anim";
import { CTASection } from "@/components/CTASection";
import { SERVICES } from "@/data/site";
import { useSEO } from "@/lib/seo";
import { useStore } from "@/store/AppStore";
import { Compass, Building, Building2, Sofa, KeyRound, ClipboardCheck, Hammer, Boxes } from "lucide-react";

const ICONS = { Compass, Building, Building2, Sofa, KeyRound, ClipboardCheck, Hammer, Boxes };

export default function Services() {
  useSEO({
    title: "Services — Aurelia & Stone",
    description: "Architectural design, construction, interiors, development, consultation, renovation and 3D visualisation — eight disciplines, one atelier.",
  });
  const { serviceOverrides } = useStore();

  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["Eight Disciplines,", "One Standard."]}
        image="https://images.unsplash.com/photo-1691425700573-5e2e6e4f6157?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="From the first site walk to the final key — everything a significant project needs, under one roof."
      />

      <section className="container-x py-16 lg:py-24" data-testid="services-list">
        <div className="grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Compass;
            const ov = serviceOverrides[s.slug] || {};
            return (
              <Reveal key={s.slug} delay={0.04 * i} className="group bg-ivory p-8 transition-colors duration-500 hover:bg-night lg:p-10">
                <Link to={`/services/${s.slug}`} data-testid={`services-card-${s.slug}`} className="block">
                  <div className="flex items-start justify-between">
                    <Icon size={30} strokeWidth={1.3} className="text-bronze transition-colors group-hover:text-bronzelight" />
                    <span className="font-display text-lg text-stone/50 transition-colors group-hover:text-ivory/30">0{i + 1}</span>
                  </div>
                  <h2 className="mt-6 font-display text-2xl transition-colors group-hover:text-ivory sm:text-3xl">{s.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-inksoft/70 transition-colors group-hover:text-ivory/60">
                    {ov.short || s.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-bronze">
                    Explore Service <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}