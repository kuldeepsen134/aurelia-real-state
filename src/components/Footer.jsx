import { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, ArrowUpRight, Send, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { BRAND, NAV_LINKS, SOCIALS, SERVICES } from "@/data/site";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setDone(true);
      setEmail("");
      setTimeout(() => setDone(false), 4000);
    }
  };

  return (
    <footer className="bg-night text-ivory" data-testid="site-footer">
      <Marquee dark />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
            An atelier of architects, interior curators and estate advisors. Designing spaces and creating legacies since {BRAND.founded}.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                data-testid={`footer-social-${s.label.toLowerCase()}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-ivory/70 transition-all hover:border-bronze hover:text-bronze"
              >
                {s.label === "Instagram" ? <Instagram size={16} /> : s.label === "LinkedIn" ? <Linkedin size={16} /> : <ArrowUpRight size={16} />}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="eyebrow">Navigate</h3>
          <ul className="mt-5 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-ivory/70 transition-colors hover:text-bronze" data-testid={`footer-link-${l.label.toLowerCase().replace(" ", "-")}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h3 className="eyebrow">Services</h3>
          <ul className="mt-5 space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="text-sm text-ivory/70 transition-colors hover:text-bronze" data-testid={`footer-service-${s.slug}`}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow">The Atelier Letter</h3>
          <p className="mt-5 text-sm leading-relaxed text-ivory/60">
            Quarterly notes on architecture, estates and the quiet details between.
          </p>
          <form onSubmit={subscribe} className="mt-5" data-testid="newsletter-form">
            <div className="flex border border-white/20 focus-within:border-bronze">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                data-testid="newsletter-email"
                className="w-full bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/35"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                data-testid="newsletter-submit"
                className="flex w-14 items-center justify-center bg-bronze text-white transition-colors hover:bg-bronzelight"
              >
                {done ? <Check size={17} /> : <Send size={16} />}
              </button>
            </div>
            {done && <p className="mt-2.5 text-xs text-bronzelight" data-testid="newsletter-success">Thank you — you're on the list.</p>}
          </form>
          <address className="mt-6 space-y-1 text-sm not-italic text-ivory/60">
            <div>{BRAND.address}</div>
            <a href={`mailto:${BRAND.email}`} className="block hover:text-bronze">{BRAND.email}</a>
            <a href={`tel:${BRAND.phone}`} className="block hover:text-bronze">{BRAND.phone}</a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[12px] text-ivory/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>Demonstration site — statistics & listings are illustrative.</span>
          <Link to="/admin" className="uppercase tracking-[0.2em] transition-colors hover:text-bronze" data-testid="footer-admin-link">
            Admin Demo
          </Link>
        </div>
      </div>
    </footer>
  );
}