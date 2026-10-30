import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedLines } from "@/components/anim";

export function PageHero({ eyebrow, lines, image, sub }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={ref} className="relative flex min-h-[62vh] items-end overflow-hidden bg-night pb-14 pt-40 sm:min-h-[70vh]" data-testid="page-hero">
      <motion.div style={{ y }} className="absolute inset-0 -bottom-24">
        <img src={image} alt="" className="h-full w-full object-cover" loading="eager" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/25" />
      <div className="container-x relative">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ivory sm:text-6xl lg:text-7xl">
          <MaskedLines lines={lines} animate="animate" delay={0.35} />
        </h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}