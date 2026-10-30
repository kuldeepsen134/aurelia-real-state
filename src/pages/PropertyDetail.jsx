import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BedDouble, Bath, Ruler, Calendar, MapPin, Expand, Send } from "lucide-react";
import { toast } from "sonner";
import { MaskedLines, Reveal } from "@/components/anim";
import { Lightbox } from "@/components/Lightbox";
import { PropertyCard } from "@/components/PropertyCard";
import { useStore } from "@/store/AppStore";
import { priceLabel } from "@/data/properties";
import { useSEO } from "@/lib/seo";

export default function PropertyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { properties, addInquiry } = useStore();
  const p = properties.find((x) => x.slug === slug);
  const [lb, setLb] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useSEO({
    title: p ? `${p.name} — ${priceLabel(p.price)} | Aurelia & Stone` : "Property | Aurelia & Stone",
    description: p ? `${p.name}, ${p.location}. ${p.beds} beds, ${p.baths} baths, ${p.area}. ${p.description.slice(0, 110)}` : "",
  });

  const similar = useMemo(
    () => properties.filter((x) => x.slug !== slug && (x.type === p?.type || x.location === p?.location)).slice(0, 3),
    [properties, slug, p]
  );

  if (!p) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="font-display text-4xl">Property not found</h1>
        <button onClick={() => navigate("/real-estate")} className="mt-6 border-b border-ink pb-1 text-[12px] uppercase tracking-[0.2em] hover:text-bronze">
          Back to Real Estate
        </button>
      </div>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email";
    if (form.message.trim().length < 10) errs.message = "Tell us a little more (10+ characters)";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    addInquiry({ ...form, service: `Inquiry — ${p.name}`, location: p.location, budget: priceLabel(p.price), phone: "—", message: `${form.message} (Property: ${p.name})` });
    setSent(true);
    toast.success("Inquiry sent — our estate team will reply within one business day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className="container-x pt-32 lg:pt-36" data-testid="property-detail">
        <button onClick={() => navigate("/real-estate")} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-inksoft transition-colors hover:text-bronze" data-testid="property-back">
          <ArrowLeft size={14} /> All Properties
        </button>

        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">{p.type} · {p.status}</p>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-6xl">
              <MaskedLines lines={[p.name]} animate="animate" delay={0.2} />
            </h1>
            <p className="mt-3 flex items-center gap-2 text-inksoft/70">
              <MapPin size={15} className="text-bronze" /> {p.location}
            </p>
          </div>
          <div className="lg:text-right">
            <div className="font-display text-4xl text-bronze" data-testid="property-price">{priceLabel(p.price)}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone">Guide Price</div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BedDouble, label: "Bedrooms", value: p.beds },
            { icon: Bath, label: "Bathrooms", value: p.baths },
            { icon: Ruler, label: "Area", value: p.area },
            { icon: Calendar, label: "Completed", value: p.year },
          ].map((x) => (
            <Reveal key={x.label} className="flex items-center gap-4 border border-ink/10 bg-white px-5 py-4">
              <x.icon size={22} strokeWidth={1.4} className="text-bronze" />
              <div>
                <div className="font-display text-xl">{x.value}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-stone">{x.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <button onClick={() => setLb(0)} className="img-frame group relative col-span-1 aspect-[16/11] sm:col-span-2 sm:row-span-2" data-testid="gallery-open">
            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
            <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-night/80 px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
              <Expand size={13} /> Gallery
            </span>
          </button>
          {p.images.slice(1, 5).map((img, i) => (
            <button key={i} onClick={() => setLb(i + 1)} className="img-frame hidden aspect-[16/11] sm:block">
              <img src={img} alt={`${p.name} view ${i + 2}`} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl">About this property</h2>
              <p className="mt-5 leading-relaxed text-inksoft/80">{p.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <h3 className="eyebrow">Property Specifications</h3>
              <dl className="mt-5 border-t border-ink/10">
                {Object.entries(p.specs || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-ink/10 py-3.5 text-sm">
                    <dt className="text-stone">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="border border-ink/10 bg-white p-8 lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-display text-2xl">Enquire about {p.name.split(" ")[0]}</h3>
            {sent ? (
              <div className="mt-6 border border-bronze/40 bg-sand p-5 text-sm leading-relaxed" data-testid="inquiry-success">
                <strong className="font-display text-lg text-bronze">Thank you.</strong>
                <p className="mt-2 text-inksoft/75">Your inquiry has been received — our estate team will be in touch within one business day.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-[12px] uppercase tracking-[0.15em] text-bronze underline">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4" data-testid="property-inquiry-form" noValidate>
                {[
                  { k: "name", label: "Full Name", type: "text" },
                  { k: "email", label: "Email Address", type: "email" },
                ].map((x) => (
                  <div key={x.k}>
                    <label className="text-[11px] uppercase tracking-[0.18em] text-stone">{x.label}</label>
                    <input
                      type={x.type}
                      value={form[x.k]}
                      onChange={(e) => setForm({ ...form, [x.k]: e.target.value })}
                      data-testid={`inquiry-${x.k}`}
                      className={`mt-1.5 w-full border bg-ivory px-4 py-3 text-sm focus:border-bronze ${errors[x.k] ? "border-red-400" : "border-ink/15"}`}
                    />
                    {errors[x.k] && <p className="mt-1 text-xs text-red-500" data-testid={`inquiry-${x.k}-error`}>{errors[x.k]}</p>}
                  </div>
                ))}
                <div>
                  <label className="text-[11px] uppercase tracking-[0.18em] text-stone">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={`I would like to arrange a viewing of ${p.name}…`}
                    data-testid="inquiry-message"
                    className={`mt-1.5 w-full border bg-ivory px-4 py-3 text-sm focus:border-bronze ${errors.message ? "border-red-400" : "border-ink/15"}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500" data-testid="inquiry-message-error">{errors.message}</p>}
                </div>
                <button type="submit" data-testid="inquiry-submit" className="inline-flex w-full items-center justify-center gap-2 bg-ink py-3.5 text-[12px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-bronze">
                  <Send size={14} /> Send Inquiry
                </button>
                <p className="text-center text-[11px] text-stone">or call us on +1 (212) 555-0148</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-sand py-20 mt-20" data-testid="similar-properties">
          <div className="container-x">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl">Similar Properties</h2>
              <Link to="/real-estate" className="text-[12px] uppercase tracking-[0.2em] hover:text-bronze">View all</Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => <PropertyCard key={s.id} p={s} />)}
            </div>
          </div>
        </section>
      )}

      <Lightbox images={p.images} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </>
  );
}