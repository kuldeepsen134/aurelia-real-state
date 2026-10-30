import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function Reveal({ children, delay = 0, y = 32, className = "", as = "div" }) {
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

export function MaskedLines({ lines, className = "", lineClassName = "", delay = 0, step = 0.13, animate = "whileInView" }) {
  return (
    <span className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden pb-[0.08em] -mb-[0.08em] ${lineClassName}`}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: "115%" }}
            {...(animate === "animate"
              ? { animate: { y: "0%" } }
              : { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } })}
            transition={{ duration: 1.05, delay: delay + i * step, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}