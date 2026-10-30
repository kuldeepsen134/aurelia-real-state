import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { PropertyCard } from "@/components/PropertyCard";
import { Reveal } from "@/components/anim";
import { CTASection } from "@/components/CTASection";
import { useStore } from "@/store/AppStore";
import { useSEO } from "@/lib/seo";

export default function Projects() {
  useSEO({
    title: "Projects — Aurelia & Stone",
    description: "Explore every Aurelia & Stone project — architecture, villas, interiors and curated estate listings in one place.",
  });
  const { projects, properties } = useStore();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        eyebrow="All Projects"
        lines={["Two Decades", "of Built Work."]}
        image="https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="Architecture, interiors and curated estate listings — the full record of the atelier's work, in one place."
      />

      <section className="container-x py-16 lg:py-24" data-testid="projects-featured">
        <Reveal><p className="eyebrow">Signature Works</p></Reveal>
        <Reveal delay={0.08}><h2 className="mt-4 font-display text-4xl sm:text-5xl">Featured Projects</h2></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="bg-sand py-16 lg:py-24" data-testid="projects-archive">
        <div className="container-x">
          <Reveal><p className="eyebrow">The Archive</p></Reveal>
          <Reveal delay={0.08}><h2 className="mt-4 font-display text-4xl sm:text-5xl">More Works</h2></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
          <Reveal className="mt-12 text-center">
            <Link to="/architecture" data-testid="projects-to-architecture" className="inline-block border border-ink px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-ink hover:text-ivory">
              Browse the Architecture Portfolio
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24" data-testid="projects-listings">
        <Reveal><p className="eyebrow">Currently Available</p></Reveal>
        <Reveal delay={0.08}><h2 className="mt-4 font-display text-4xl sm:text-5xl">Curated Listings</h2></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/real-estate" data-testid="projects-to-realestate" className="inline-block border border-ink px-8 py-3.5 text-[12px] uppercase tracking-[0.2em] transition-all hover:bg-ink hover:text-ivory">
            Explore All Real Estate
          </Link>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}