import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/anim";
import { Counter } from "@/components/Counter";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { useStore } from "@/store/AppStore";
import { STATS, WHY_US, SERVICES, ABOUT } from "@/data/site";
import { useSEO } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { Landmark, Compass, Gem, Scale, HeartHandshake } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICONS = { Landmark, Compass, Gem, Scale, HeartHandshake };
const FILTERS = ["All", "Modern Villas", "Commercial", "Interior Design"];

function Hero() {
  const imgRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      imgRef.current,
      { yPercent: -8, scale: 1.12 },
      {
        yPercent: 8,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-end overflow-hidden bg-night pb-20" data-testid="hero-section">
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200"
          alt="Cliffside modern villa at dawn"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/30" />

      {/* signature on-load curtain */}
      <motion.div
        className="absolute inset-0 z-20 bg-night"
        initial={{ clipPath: "inset(0 0 0% 0)" }}
        animate={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 1.15, delay: 0.25, ease: EASE }}
        aria-hidden="true"
      />

      <div className="container-x relative z-10 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="eyebrow"
        >
          Architecture · Estates · Interiors — Est. 1999
        </motion.p>

        <h1 className="mt-6 max-w-5xl font-display text-[13.5vw] font-medium leading-[0.98] tracking-tight text-ivory sm:text-7xl lg:text-[6.5rem]">
          <MaskedLines lines={["Designing Spaces.", "Creating Legacies."]} animate="animate" delay={1.05} step={0.16} />
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.55 }}
            className="max-w-md text-base leading-relaxed text-ivory/70"
          >
            A luxury architecture atelier and estate curator crafting residences, workplaces and legacies that outlive trends — from first sketch to final key.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/projects"
              data-testid="hero-explore-projects"
              className="group inline-flex items-center gap-2 bg-ivory px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-bronze hover:text-white"
            >
              Explore Projects
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              data-testid="hero-get-in-touch"
              className="inline-flex items-center gap-2 border border-ivory/40 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-ivory transition-all duration-300 hover:border-bronze hover:text-bronze"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/50 lg:flex"
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-bronze"
            animate={{ y: [0, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function AboutSplit() {
  return (
    <section className="container-x grid gap-14 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32" data-testid="home-about">
      <div className="flex flex-col justify-center">
        <Reveal><p className="eyebrow">The Atelier</p></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Architecture with a quiet, uncompromising point of view.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-lg leading-relaxed text-inksoft/80">{ABOUT.intro}</p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-4 max-w-lg leading-relaxed text-inksoft/80">{ABOUT.philosophy}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <Link
            to="/about"
            data-testid="home-about-read-more"
            className="group mt-9 inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-bronze hover:text-bronze"
          >
            Read More
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
      <div className="relative">
        <Reveal delay={0.1} className="img-frame aspect-[4/5]">
          <img src={ABOUT.imageA} alt="Aurelia & Stone studio" loading="lazy" className="h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.25} className="img-frame absolute -bottom-8 -left-6 hidden w-2/5 aspect-square border-8 border-ivory sm:block lg:-left-12">
          <img src={ABOUT.imageB} alt="Drafting details" loading="lazy" className="h-full w-full object-cover" />
        </Reveal>
        <Reveal delay={0.35} className="absolute -right-3 top-8 bg-night px-6 py-5 text-ivory lg:-right-8">
          <div className="font-display text-4xl text-bronze">26</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-ivory/60">Years of Practice</div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesList() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-sand py-24 lg:py-32" data-testid="home-services">
      <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <Reveal><p className="eyebrow">What We Do</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Services</h2>
          </Reveal>
          <div className="mt-10 border-t border-ink/10">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={0.05 * i}>
                <Link
                  to={`/services/${s.slug}`}
                  data-testid={`home-service-row-${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center justify-between gap-6 border-b border-ink/10 py-5 transition-colors hover:bg-ivory/60"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[11px] tracking-[0.2em] text-stone">0{i + 1}</span>
                    <div>
                      <h3 className={`font-display text-xl transition-colors duration-300 sm:text-2xl ${active === i ? "text-bronze" : "text-ink"}`}>
                        {s.title}
                      </h3>
                      <p className="mt-1 hidden max-w-md text-sm text-inksoft/60 sm:block">{s.short}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={20} className={`shrink-0 transition-all duration-300 ${active === i ? "translate-x-0 text-bronze opacity-100" : "-translate-x-2 opacity-30"}`} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="img-frame aspect-[4/5]">
              {SERVICES.map((s, i) => (
                <img
                  key={s.slug}
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                />
              ))}
            </div>
            <div className="absolute bottom-5 left-5 bg-night/85 px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] text-ivory backdrop-blur-sm">
              {SERVICES[active].title}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const { projects } = useStore();
  const [filter, setFilter] = useState("All");
  const shown = (filter === "All" ? projects : projects.filter((p) => p.category === filter)).slice(0, 6);

  return (
    <section className="container-x py-24 lg:py-32" data-testid="home-featured">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal><p className="eyebrow">Selected Work</p></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Featured Projects</h2>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`featured-filter-${f.toLowerCase().replace(" ", "-")}`}
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  filter === f ? "border-ink bg-ink text-ivory" : "border-ink/20 text-inksoft hover:border-bronze hover:text-bronze"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <motion.div
            key={p.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
          >
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </motion.div>
      <Reveal className="mt-12 text-center">
        <Link
          to="/projects"
          data-testid="home-view-all-projects"
          className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors hover:border-bronze hover:text-bronze"
        >
          View All Projects <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="bg-sand py-24 lg:py-32" data-testid="home-why-us">
      <div className="container-x">
        <Reveal><p className="eyebrow">Why Choose Us</p></Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Five reasons clients trust us with what they treasure.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((w, i) => {
            const Icon = ICONS[w.icon] || Compass;
            return (
              <Reveal key={w.title} delay={0.06 * i} className="group bg-ivory p-7 transition-colors duration-500 hover:bg-night">
                <Icon size={26} strokeWidth={1.4} className="text-bronze transition-colors group-hover:text-bronzelight" />
                <div className="mt-5 text-[11px] tracking-[0.25em] text-stone">0{i + 1}</div>
                <h3 className="mt-2 font-display text-xl transition-colors group-hover:text-ivory">{w.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-inksoft/70 transition-colors group-hover:text-ivory/60">{w.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="grain relative bg-night py-20 lg:py-28" data-testid="home-stats">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.07 * i} className="border-l border-bronze/40 pl-6">
              <div className="font-display text-5xl font-light text-ivory lg:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-stone">{s.label}</div>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center text-[11px] tracking-[0.15em] text-ivory/30 uppercase">
          Illustrative demo statistics
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="grain relative bg-night pb-24 pt-4 lg:pb-32" data-testid="home-testimonials">
      <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="eyebrow">Client Voices</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ivory sm:text-5xl">
            Words from our clients
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">
            Nine projects a year means every client gets the principals' full attention — and every story is personal.
          </p>
        </div>
        <TestimonialSlider />
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Aurelia & Stone — Luxury Architecture & Real Estate",
    description: "A luxury architecture atelier and estate curator. Designing Spaces. Creating Legacies. Award-winning architectural design, interiors and property curation.",
  });
  return (
    <>
      <Hero />
      <AboutSplit />
      <ServicesList />
      <FeaturedProjects />
      <WhyUs />
      <StatsBand />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}