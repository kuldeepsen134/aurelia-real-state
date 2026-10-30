export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = (delay = 0, y = 32) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const stagger = (i, base = 0, step = 0.08) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: base + i * step, ease: EASE },
});

export const lineReveal = (i, base = 0.1, step = 0.12) => ({
  initial: { y: "115%" },
  animate: { y: "0%" },
  transition: { duration: 1.05, delay: base + i * step, ease: EASE },
});