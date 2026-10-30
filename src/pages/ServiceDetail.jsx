import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/anim";
import { ProjectCard } from "@/components/ProjectCard";
import { useStore } from "@/store/AppStore";
import { SERVICES } from "@/data/site";
import { useSEO } from "@/lib/seo";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { projects, serviceOverrides } = useStore();
  const service = SERVICES.find((s) => s.slug === slug);
  const ov = serviceOverrides[slug] || {};

  useSEO({
    title: service ? `${service.title} — Aurelia & Stone` : "Service — Aurelia & Stone",
    description: service ? service.short : "",
  });

  const related = useMemo(() => {
    if (!service) return [];
    const idx = SERVICES.indexOf(service);
    return [projects[idx % projects.length], projects[(idx + 4) % projects.length], projects[(idx + 7) % projects.length]].filter(Boolean);
  }, [service, projects]);

  if (!service) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-4xl">Service not found</h1>
        <Link to="/services" className="mt-6 border-b border-ink pb-1 text-[12px] uppercase tracking-[0.2em] hover:text-bronze">All Services</Link>
      </div>
    );
  }

  const next = SERVICES[(SERVICES.indexOf(service) + 1) % SERVICES.length];

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-night pb-14 pt-40" data-testid="service-hero">
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-night/25" />
        <div className="container-x relative">
          <Link to="/services" className="mb-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ivory/60 hover:text-bronze" data-testid="service-back">
            <ArrowLeft size={14} /> Services
          </Link>
          <p className="eyebrow">Service</p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ivory sm:text-6xl lg:text-7xl">
            <MaskedLines lines={[service.title]} animate="animate" delay={0.3} />
          </h1>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20" data-testid="service-overview">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Overview</h2>
            <p className="mt-6 leading-relaxed text-inksoft/80">{ov.overview || service.overview}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <h3 className="eyebrow">Working Process</h3>
            <div className="mt-6 space-y-0 border-t border-ink/10">
              {(service.process || []).map((p) => (
                <div key={p.step} className="grid gap-3 border-b border-ink/10 py-6 sm:grid-cols-[80px_1fr]">
                  <div className="font-display text-3xl font-light text-bronze">{p.step}</div>
                  <div>
                    <h4 className="font-display text-xl">{p.title}</h4>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-inksoft/70">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="border border-ink/10 bg-white p-8">
            <h3 className="eyebrow">Key Benefits</h3>
            <ul className="mt-6 space-y-4">
              {(service.benefits || []).map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bronze/15 text-bronze"><Check size={12} /></span>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              data-testid="service-consultation-cta"
              className="mt-8 block bg-ink py-3.5 text-center text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
            >
              Schedule a Consultation
            </Link>
          </Reveal>
        </aside>
      </section>

      <section className="bg-sand py-20" data-testid="service-related-projects">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl">Related Projects</h2>
            <Link to="/projects" className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] hover:text-bronze">
              All projects <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <Link to={`/services/${next.slug}`} data-testid="next-service" className="group flex items-center justify-between border border-ink/10 bg-white p-8 transition-colors hover:border-bronze/50 lg:p-12">
          <div>
            <p className="eyebrow">Next Service</p>
            <h3 className="mt-2 font-display text-3xl transition-colors group-hover:text-bronze">{next.title}</h3>
          </div>
          <ArrowRight size={28} className="text-bronze transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </section>
    </>
  );
}