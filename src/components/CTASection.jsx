import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskedLines } from "@/components/anim";
import { EASE } from "@/lib/motion";

export function CTASection() {
  return (
    <section className="grain relative overflow-hidden bg-night py-24 sm:py-32" data-testid="cta-section">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=srgb&fm=jpg&q=70&w=1600)", backgroundSize: "cover", backgroundPosition: "center" }}
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="eyebrow"
        >
          Begin the Conversation
        </motion.p>
        <h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-medium tracking-tight text-ivory sm:text-6xl">
          <MaskedLines lines={["Let's Build Something", "Extraordinary."]} />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/60"
        >
          One conversation is enough to know if we are the right atelier for your project. It costs nothing but an hour.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-10"
        >
          <Link
            to="/contact"
            data-testid="cta-start-project"
            className="group inline-flex items-center gap-2 bg-bronze px-9 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-ivory hover:text-ink"
          >
            Start Your Project
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}