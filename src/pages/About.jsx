import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/anim";
import { Counter } from "@/components/Counter";
import { CTASection } from "@/components/CTASection";
import { useSEO } from "@/lib/seo";
import { ABOUT, VALUES, ACHIEVEMENTS } from "@/data/site";
import { TEAM } from "@/data/projects";
import { ArrowRight } from "lucide-react";

const APPROACH = [
  { step: "01", title: "Listen on the Land", text: "Weeks of site study before drawing — sun paths, soil, wind, views and neighbours understood first." },
  { step: "02", title: "Design in Models", text: "Concepts tested in physical models and full-scale mock-ups, never only on screen." },
  { step: "03", title: "Detail Without Mercy", text: "Millimetre-level documentation, priced transparently and supervised on site weekly." },
  { step: "04", title: "Stay After Handover", text: "A two-year post-occupancy care programme — because buildings mature like people." },
];

export default function About() {
  useSEO({
    title: "About — Aurelia & Stone",
    description: "The story, philosophy, people and values of Aurelia & Stone — a luxury architecture atelier founded in 1999.",
  });

  return (
    <>
      <PageHero
        eyebrow="About the Atelier"
        lines={["A Studio Built", "on Patience."]}
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="Founded in 1999, Aurelia & Stone is an atelier of architects, interior curators and estate advisors bound by one conviction — a building should outlive trends and belong to its landscape."
      />

      <section className="container-x grid gap-14 py-24 lg:grid-cols-2 lg:gap-20" data-testid="about-story">
        <Reveal className="img-frame aspect-[4/5]">
          <img src={ABOUT.imageB} alt="Studio drafting" loading="lazy" className="h-full w-full object-cover" />
        </Reveal>
        <div className="flex flex-col justify-center">
          <Reveal><p className="eyebrow">Our Story</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">From a single drafting table to three continents.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-7 leading-relaxed text-inksoft/80">
              Eleanor Voss founded the studio with one commission and a rule that still governs us: nine projects a year, never more. The rule made us slow; slowness made us good. Twenty-six years on, the atelier spans New York, Lake Como and Kyoto, yet every drawing still passes across a principal's desk.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 leading-relaxed text-inksoft/80">
              We are architects who build, curators who advise and advisors who design — one team, one standard, from land search to keys-in-hand.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24" data-testid="about-vision-mission">
        <div className="container-x grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-2">
          {[
            { eyebrow: "Vision", title: "A built world worth inheriting.", text: "We imagine a generation of buildings so loved they are never demolished — architecture measured in decades of use, not months of applause." },
            { eyebrow: "Mission", title: "Design deeply, deliver honestly.", text: "To give every client the craft of a cathedral workshop with the clarity of a modern practice: open budgets, honest timelines, exacting details." },
          ].map((v, i) => (
            <Reveal key={v.eyebrow} delay={0.1 * i} className="bg-ivory p-10 lg:p-14">
              <p className="eyebrow">{v.eyebrow}</p>
              <h3 className="mt-4 font-display text-3xl">{v.title}</h3>
              <p className="mt-4 leading-relaxed text-inksoft/75">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-x py-24 lg:py-32" data-testid="about-philosophy">
        <div className="max-w-3xl">
          <Reveal><p className="eyebrow">Design Philosophy</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Light before walls. Silence before noise. Ground before drawing.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-7 leading-relaxed text-inksoft/80">{ABOUT.philosophy}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 leading-relaxed text-inksoft/80">
              We work slowly on purpose. Fewer projects, deeper attention — architecture that reads as inevitable rather than impressive.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4" data-testid="about-approach">
          {APPROACH.map((a, i) => (
            <Reveal key={a.step} delay={0.06 * i} className="bg-ivory p-8">
              <div className="font-display text-4xl font-light text-bronze">{a.step}</div>
              <h3 className="mt-4 font-display text-xl">{a.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-inksoft/70">{a.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand py-24 lg:py-32" data-testid="about-team">
        <div className="container-x">
          <Reveal><p className="eyebrow">The Principals</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">People behind the work</h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={0.07 * i} className="group">
                <div className="img-frame aspect-[3/4]">
                  <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <h3 className="mt-5 font-display text-xl">{m.name}</h3>
                <p className="text-[12px] uppercase tracking-[0.18em] text-bronze">{m.role}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-inksoft/70">{m.bio}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x grid gap-14 py-24 lg:grid-cols-2 lg:gap-20" data-testid="about-values">
        <div>
          <Reveal><p className="eyebrow">Company Values</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">What we refuse to compromise</h2>
          </Reveal>
          <div className="mt-10 space-y-8">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.06 * i} className="border-l-2 border-bronze pl-6">
                <h3 className="font-display text-2xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft/70">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal><p className="eyebrow">Achievements</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Selected honours</h2>
          </Reveal>
          <ul className="mt-10 border-t border-ink/10">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={0.04 * i} as="li">
                <div className="flex items-baseline gap-6 border-b border-ink/10 py-5">
                  <span className="font-display text-lg text-bronze">{a.year}</span>
                  <span className="text-sm leading-relaxed text-inksoft/85">{a.title}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-3 gap-6">
            {[{ v: 240, s: "+", l: "Projects" }, { v: 26, s: "", l: "Years" }, { v: 18, s: "", l: "Awards" }].map((x) => (
              <div key={x.l} className="border border-ink/10 bg-white p-5 text-center">
                <div className="font-display text-3xl text-bronze"><Counter value={x.v} suffix={x.s} /></div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-stone">{x.l}</div>
              </div>
            ))}
          </Reveal>
          <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-stone/70">Illustrative demo figures</p>
        </div>
      </section>

      <section className="bg-ivory pb-24">
        <div className="container-x text-center">
          <Reveal>
            <Link to="/services" data-testid="about-services-cta" className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-bronze hover:text-bronze">
              Explore Our Services <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}