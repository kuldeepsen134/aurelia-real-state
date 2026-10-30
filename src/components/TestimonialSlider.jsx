import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useStore } from "@/store/AppStore";
import { EASE } from "@/lib/motion";

export function TestimonialSlider() {
  const { testimonials } = useStore();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const list = testimonials.length ? testimonials : [];
  const t = list[i % list.length];

  useEffect(() => {
    if (paused || list.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % list.length), 6500);
    return () => clearInterval(id);
  }, [paused, list.length]);

  if (!t) return null;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative"
      data-testid="testimonial-slider"
    >
      <Quote className="absolute -top-4 left-0 text-bronze/30" size={64} strokeWidth={1} aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={t.id || i}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="pt-10"
        >
          <p className="font-display text-2xl font-light leading-snug text-ivory sm:text-3xl" data-testid="testimonial-quote">
            "{t.quote}"
          </p>
          <footer className="mt-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bronze/50 font-display text-sm text-bronze">
              {t.initials}
            </span>
            <div>
              <div className="text-sm font-medium text-ivory" data-testid="testimonial-name">{t.name}</div>
              <div className="text-xs tracking-wide text-stone" data-testid="testimonial-project">{t.project}</div>
            </div>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={() => setI((i - 1 + list.length) % list.length)}
          aria-label="Previous testimonial"
          data-testid="testimonial-prev"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-bronze hover:text-bronze"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setI((i + 1) % list.length)}
          aria-label="Next testimonial"
          data-testid="testimonial-next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ivory transition-colors hover:border-bronze hover:text-bronze"
        >
          <ChevronRight size={18} />
        </button>
        <div className="ml-2 flex gap-2">
          {list.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Go to testimonial ${d + 1}`}
              className={`h-1 transition-all duration-500 ${d === i ? "w-8 bg-bronze" : "w-3 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}