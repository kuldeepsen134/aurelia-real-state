import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, BRAND } from "@/data/site";
import { EASE } from "@/lib/motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? "border-b border-ink/10 bg-ivory/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
        data-testid="site-navbar"
      >
        <div className="container-x flex h-[74px] items-center justify-between">
          <Link to="/" aria-label="Aurelia & Stone home" data-testid="nav-logo">
            <Logo light={!solid} />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase().replace(" ", "-")}`}
                className={`link-underline text-[13px] font-medium tracking-wide transition-colors ${
                  solid ? (pathname === l.to ? "text-bronze" : "text-ink hover:text-bronze") : pathname === l.to ? "text-bronzelight" : "text-ivory/85 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-testid="nav-consultation-cta"
              className={`hidden items-center gap-1.5 border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition-all duration-300 md:inline-flex ${
                solid
                  ? "border-ink bg-ink text-ivory hover:border-bronze hover:bg-bronze hover:text-white"
                  : "border-ivory/50 text-ivory hover:border-bronze hover:bg-bronze hover:text-white"
              }`}
            >
              Consultation <ArrowUpRight size={14} />
            </Link>
            <button
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`p-2 lg:hidden ${solid ? "text-ink" : "text-ivory"}`}
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-night text-ivory"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            data-testid="mobile-menu"
          >
            <div className="container-x flex h-[74px] items-center justify-between">
              <Logo light />
              <button onClick={() => setOpen(false)} aria-label="Close menu" data-testid="mobile-menu-close" className="p-2">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="container-x flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    className={`group flex items-baseline gap-4 py-2.5 font-display text-4xl font-medium transition-colors hover:text-bronze sm:text-5xl ${
                      pathname === l.to ? "text-bronze" : "text-ivory"
                    }`}
                  >
                    <span className="text-[11px] tracking-[0.3em] text-stone">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-5 text-sm text-stone"
              >
                <a href={`tel:${BRAND.phone}`} className="inline-flex items-center gap-2 hover:text-bronze">
                  <Phone size={15} /> {BRAND.phone}
                </a>
                <Link to="/contact" className="border border-bronze px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-bronze hover:bg-bronze hover:text-white">
                  Schedule a Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}