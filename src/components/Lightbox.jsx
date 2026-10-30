import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({ images, index, onClose, onIndex }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 backdrop-blur-sm"
          data-testid="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            data-testid="lightbox-close"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 rounded-full border border-white/25 p-2.5 text-white transition-colors hover:border-bronze hover:text-bronze"
            aria-label="Close viewer"
          >
            <X size={20} />
          </button>
          <button
            data-testid="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + images.length) % images.length); }}
            className="absolute left-3 sm:left-8 z-10 rounded-full border border-white/25 p-3 text-white transition-colors hover:border-bronze hover:text-bronze"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            data-testid="lightbox-next"
            onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % images.length); }}
            className="absolute right-3 sm:right-8 z-10 rounded-full border border-white/25 p-3 text-white transition-colors hover:border-bronze hover:text-bronze"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
          <motion.img
            key={index}
            src={images[index]}
            alt={`View ${index + 1} of ${images.length}`}
            className="max-h-[82vh] max-w-[88vw] object-contain"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/60">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}