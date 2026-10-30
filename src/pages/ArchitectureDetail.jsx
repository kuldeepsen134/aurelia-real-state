import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MaskedLines, Reveal } from "@/components/anim";
import { Lightbox } from "@/components/Lightbox";
import { CTASection } from "@/components/CTASection";
import { useStore } from "@/store/AppStore";
import { useSEO } from "@/lib/seo";

export default function ArchitectureDetail() {
  const { slug } = useParams();
  const { projects } = useStore();
  const project = projects.find((p) => p.slug === slug);
  const [lb, setLb] = useState(null);

  useSEO({
    title: project ? `${project.title} — Aurelia & Stone` : "Project — Aurelia & Stone",
    description: project ? `${project.title}, ${project.location} (${project.year}) — ${project.category} by Aurelia & Stone.` : "",
  });

  const related = useMemo(
    () => projects.filter((p) => p.slug !== slug && p.category === project?.category).slice(0, 3),
    [projects, slug, project]
  );
  const fallbackRelated = useMemo(
    () => projects.filter((p) => p.slug !== slug).slice(0, 3),
    [projects, slug]
  );
  const rel = related.length ? related : fallbackRelated;

  if (!project) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-4xl">Project not found</h1>
        <Link to="/architecture" data-testid="arch-back-link" className="mt-6 border-b border-ink pb-1 text-[12px] uppercase tracking-[0.2em] hover:text-bronze">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="relative flex min-h-[78vh] items-end overflow-hidden bg-night pb-14 pt-40" data-testid="project-detail-hero">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src={project.images[0]}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/25" />
        <div className="container-x relative">
          <Link to="/architecture" className="mb-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-ivory/60 transition-colors hover:text-bronze" data-testid="project-back-to-portfolio">
            <ArrowLeft size={14} /> Portfolio
          </Link>
          <p className="eyebrow">{project.category} — {project.year}</p>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ivory sm:text-6xl lg:text-7xl">
            <MaskedLines lines={[project.title]} animate="animate" delay={0.3} />
          </h1>
        </div>
      </section>

      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr] lg:gap-20" data-testid="project-detail-body">
        <div>
          <Reveal>
            <p className="font-display text-2xl leading-snug sm:text-3xl">{project.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="img-frame mt-10 aspect-[16/10] cursor-pointer" onClick={() => setLb(1)}>
            <img src={project.images[1] || project.images[0]} alt={`${project.title} detail view`} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
          <Reveal delay={0.15} className="img-frame mt-6 aspect-[16/10] cursor-pointer" onClick={() => setLb(2)}>
            <img src={project.images[2] || project.images[0]} alt={`${project.title} secondary view`} loading="lazy" className="h-full w-full object-cover" />
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="border border-ink/10 bg-white p-8">
            <h2 className="eyebrow">Project Specifications</h2>
            <dl className="mt-6 space-y-4">
              {[
                ["Location", project.location],
                ["Completed", project.year],
                ["Category", project.category],
                ["Area", project.area],
                ...Object.entries(project.specs || {}),
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-ink/10 pb-3 text-sm">
                  <dt className="text-stone">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={() => setLb(0)}
              data-testid="project-fullscreen-viewer"
              className="mt-7 w-full border border-ink bg-ink py-3.5 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze"
            >
              Full-Screen Image Viewer
            </button>
          </Reveal>
        </aside>
      </section>

      <section className="bg-sand py-20" data-testid="project-related">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl">Related Projects</h2>
            <Link to="/architecture" className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] hover:text-bronze">
              All works <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {rel.map((r) => (
              <Link key={r.id} to={`/architecture/${r.slug}`} data-testid={`related-project-${r.slug}`} className="group">
                <div className="img-frame aspect-[4/3]">
                  <img src={r.images[0]} alt={r.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-4 font-display text-xl transition-colors group-hover:text-bronze">{r.title}</h3>
                <p className="text-[12px] uppercase tracking-[0.16em] text-stone">{r.location} · {r.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Lightbox images={project.images} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      <CTASection />
    </>
  );
}