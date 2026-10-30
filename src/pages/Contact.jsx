import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/anim";
import { useStore } from "@/store/AppStore";
import { BRAND, SERVICES, BUDGET_OPTIONS } from "@/data/site";
import { useSEO } from "@/lib/seo";

const initialForm = { name: "", email: "", phone: "", service: "", location: "", budget: "", message: "" };

export default function Contact() {
  useSEO({
    title: "Contact — Aurelia & Stone",
    description: "Start a conversation with Aurelia & Stone. Schedule a consultation for architecture, interiors, development or estate curation.",
  });
  const { addInquiry } = useStore();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "A valid email is required";
    if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone.trim())) errs.phone = "A valid phone number is required";
    if (!form.service) errs.service = "Please select a service";
    if (!form.location.trim()) errs.location = "Project location is required";
    if (!form.budget) errs.budget = "Please select an estimated budget";
    if (form.message.trim().length < 20) errs.message = "Please describe your project in at least 20 characters";
    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Please review the highlighted fields.");
      return;
    }
    addInquiry(form);
    setSent(true);
    setForm(initialForm);
    toast.success("Thank you — your inquiry has been received.");
  };

  const inputCls = (k) =>
    `mt-1.5 w-full border bg-white px-4 py-3 text-sm focus:border-bronze ${errors[k] ? "border-red-400" : "border-ink/15"}`;

  const selectCls = (k) =>
    `mt-1.5 w-full appearance-none border bg-white px-4 py-3 pr-9 text-sm focus:border-bronze ${errors[k] ? "border-red-400" : "border-ink/15"} ${form[k] ? "text-ink" : "text-stone"}`;

  const chevron = <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-[2.55rem] text-stone" />;

  const INFO = [
    { icon: Phone, label: "Call Us", value: BRAND.phone, href: `tel:${BRAND.phone}`, testid: "contact-phone" },
    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}`, testid: "contact-email" },
    { icon: MessageCircle, label: "WhatsApp", value: BRAND.whatsappDisplay, href: `https://wa.me/${BRAND.whatsapp}`, testid: "contact-whatsapp" },
    { icon: MapPin, label: "Visit the Atelier", value: BRAND.address, testid: "contact-address" },
    { icon: Clock, label: "Hours", value: BRAND.hours, testid: "contact-hours" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        lines={["Let's Begin", "the Conversation."]}
        image="https://images.unsplash.com/photo-1632829882891-5047ccc421bc?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
        sub="Tell us about your site, your ambition and your timeline. A principal replies to every inquiry personally within one business day."
      />

      <section className="container-x grid gap-14 py-16 lg:grid-cols-[1fr_1.25fr] lg:gap-20 lg:py-24" data-testid="contact-section">
        <div>
          <Reveal>
            <h2 className="font-display text-3xl">Reach the atelier</h2>
            <p className="mt-4 text-sm leading-relaxed text-inksoft/70">
              Prefer to talk first? Call, message or visit. Our doors — and our drawing books — are open.
            </p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {INFO.map((c, i) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Reveal key={c.label} delay={0.05 * i}>
                  <Tag
                    {...(c.href ? { href: c.href, target: c.href.startsWith("http") ? "_blank" : undefined, rel: "noreferrer" } : {})}
                    data-testid={c.testid}
                    className="group flex items-center gap-5 border border-ink/10 bg-white p-5 transition-all duration-300 hover:border-bronze/50"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-sand text-bronze transition-colors group-hover:bg-bronze group-hover:text-white">
                      <c.icon size={18} strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-stone">{c.label}</span>
                      <span className="mt-0.5 block text-sm font-medium text-ink">{c.value}</span>
                    </span>
                  </Tag>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} className="relative mt-6 h-56 overflow-hidden border border-ink/10" data-testid="contact-map">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#EFECE6",
                backgroundImage:
                  "linear-gradient(rgba(32,32,32,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(32,32,32,0.06) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
              aria-hidden="true"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="relative mx-auto flex h-14 w-14 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bronze/30" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-bronze text-white">
                  <MapPin size={18} />
                </span>
              </span>
              <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-inksoft">128 Grand Atelier Row</p>
              <p className="text-[10px] tracking-[0.2em] text-stone">New York, NY — Demonstration map</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="border border-ink/10 bg-white p-7 sm:p-10" data-testid="contact-form-wrap">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
              data-testid="contact-success"
            >
              <CheckCircle2 size={56} strokeWidth={1.2} className="text-bronze" />
              <h3 className="mt-6 font-display text-3xl">Message received.</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-inksoft/70">
                Thank you for reaching out. A principal from the atelier will reply to you personally within one business day.
              </p>
              <button
                onClick={() => setSent(false)}
                data-testid="contact-send-another"
                className="mt-8 border border-ink px-7 py-3 text-[12px] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-ivory"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate data-testid="contact-form">
              <h2 className="font-display text-3xl">Start your project</h2>
              <p className="mt-2 text-sm text-inksoft/60">Fields marked with context help us route your inquiry to the right principal.</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Full Name *</label>
                  <input value={form.name} onChange={set("name")} placeholder="Your name" data-testid="contact-name" className={inputCls("name")} />
                  {errors.name && <p className="mt-1 text-xs text-red-500" data-testid="contact-name-error">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Email *</label>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" data-testid="contact-email-input" className={inputCls("email")} />
                  {errors.email && <p className="mt-1 text-xs text-red-500" data-testid="contact-email-error">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Phone *</label>
                  <input value={form.phone} onChange={set("phone")} placeholder="+1 (___) ___-____" data-testid="contact-phone-input" className={inputCls("phone")} />
                  {errors.phone && <p className="mt-1 text-xs text-red-500" data-testid="contact-phone-error">{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Project Location *</label>
                  <input value={form.location} onChange={set("location")} placeholder="City, Country" data-testid="contact-location" className={inputCls("location")} />
                  {errors.location && <p className="mt-1 text-xs text-red-500" data-testid="contact-location-error">{errors.location}</p>}
                </div>
                <div className="relative">
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Service Required *</label>
                  <select value={form.service} onChange={set("service")} data-testid="contact-service" className={selectCls("service")}>
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  </select>
                  {chevron}
                  {errors.service && <p className="mt-1 text-xs text-red-500" data-testid="contact-service-error">{errors.service}</p>}
                </div>
                <div className="relative">
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Estimated Budget *</label>
                  <select value={form.budget} onChange={set("budget")} data-testid="contact-budget" className={selectCls("budget")}>
                    <option value="">Select a range…</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {chevron}
                  {errors.budget && <p className="mt-1 text-xs text-red-500" data-testid="contact-budget-error">{errors.budget}</p>}
                </div>
              </div>

              <div className="mt-5">
                <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Your Message *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us about the site, the brief and your ambitions…"
                  data-testid="contact-message"
                  className={inputCls("message")}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500" data-testid="contact-message-error">{errors.message}</p>}
              </div>

              <button
                type="submit"
                data-testid="contact-submit"
                className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-ink py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-bronze sm:w-auto sm:px-12"
              >
                Send Inquiry
                <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="mt-4 text-[11px] text-stone">* Demonstrative form — submissions are stored locally in this demo and never sent to a server.</p>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}