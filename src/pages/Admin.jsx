import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Building2, DraftingCompass, Sparkles, MessageSquare, Inbox,
  Plus, Pencil, Trash2, X, RotateCcw, ArrowLeft, Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { useStore, SERVICE_LIST } from "@/store/AppStore";
import { PROPERTY_TYPES, PROPERTY_STATUSES, priceLabel } from "@/data/properties";
import { PROJECT_CATEGORIES, DEMO_INQUIRIES } from "@/data/projects";
import { INQUIRY_STATUS } from "@/data/site";
import { useSEO } from "@/lib/seo";

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "projects", label: "Projects", icon: DraftingCompass },
  { id: "services", label: "Services", icon: Sparkles },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
];

const btn = "inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-bronze";
const btnGhost = "inline-flex items-center gap-1.5 border border-ink/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-inksoft transition-colors hover:border-bronze hover:text-bronze";
const input = "w-full border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:border-bronze";
const label = "text-[10px] uppercase tracking-[0.18em] text-stone";

function Modal({ title, onClose, children, testid }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-night/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      data-testid={testid}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto bg-ivory p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-2 hover:text-bronze"><X size={20} /></button>
        </div>
        <div className="mt-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}

function KPI({ label: l, value, sub }) {
  return (
    <div className="border border-ink/10 bg-white p-6" data-testid={`kpi-${l.toLowerCase().replace(/ /g, "-")}`}>
      <div className="text-[10px] uppercase tracking-[0.22em] text-stone">{l}</div>
      <div className="mt-2 font-display text-4xl text-ink">{value}</div>
      <div className="mt-1 text-[11px] text-bronze">{sub}</div>
    </div>
  );
}

export default function Admin() {
  useSEO({ title: "Admin Demo Dashboard — Aurelia & Stone", description: "Frontend demonstration dashboard. All data is mock data persisted locally." });
  const s = useStore();
  const [tab, setTab] = useState("overview");

  return (
    <div className="min-h-screen bg-sand text-ink" data-testid="admin-dashboard">
      <div className="border-b border-ink/10 bg-ivory">
        <div className="container-x flex h-[70px] items-center justify-between">
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-inksoft hover:text-bronze" data-testid="admin-back-to-site">
              <ArrowLeft size={14} /> Site
            </Link>
            <span className="hidden h-6 w-px bg-ink/15 sm:block" />
            <Logo />
          </div>
          <span className="border border-bronze/40 bg-bronze/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-bronze">
            Demonstration Dashboard — data stays in this browser
          </span>
        </div>
      </div>

      <div className="container-x flex flex-col gap-8 py-8 lg:flex-row">
        <aside className="lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible" aria-label="Admin sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                data-testid={`admin-tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 whitespace-nowrap px-4 py-3 text-left text-[13px] transition-colors ${
                  tab === t.id ? "bg-ink text-ivory" : "bg-white text-inksoft hover:text-bronze"
                }`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => { s.resetDemo(); toast.success("Demo data restored to defaults."); }}
            data-testid="admin-reset-demo"
            className="mt-4 flex w-full items-center gap-2 border border-ink/15 bg-white px-4 py-3 text-[11px] uppercase tracking-[0.15em] text-inksoft hover:border-red-300 hover:text-red-500"
          >
            <RotateCcw size={14} /> Reset Demo Data
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          {tab === "overview" && <Overview store={s} setTab={setTab} />}
          {tab === "properties" && <Properties store={s} />}
          {tab === "projects" && <ProjectsAdmin store={s} />}
          {tab === "services" && <ServicesAdmin store={s} />}
          {tab === "testimonials" && <TestimonialsAdmin store={s} />}
          {tab === "inquiries" && <InquiriesAdmin store={s} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ store, setTab }) {
  const active = store.properties.filter((p) => p.status !== "Off-Market").length;
  const pipeline = store.properties.filter((p) => p.status === "For Sale").reduce((a, p) => a + p.price, 0);
  const newInq = store.inquiries.filter((i) => i.status === "New").length;
  const byMonth = useMemo(() => {
    const months = ["Sep", "Oct", "Nov", "Dec", "Jan"];
    return months.map((m, i) => ({ m, v: [3, 5, 4, 6, Math.max(2, store.inquiries.length - i)] [i] }));
  }, [store.inquiries.length]);
  const max = Math.max(...byMonth.map((b) => b.v), 1);

  return (
    <div>
      <h1 className="font-display text-3xl">Studio Overview</h1>
      <p className="mt-1 text-sm text-inksoft/60">Illustrative figures from demo data stored in your browser.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPI label="Active Listings" value={active} sub={`${store.properties.length} total properties`} />
        <KPI label="Portfolio Volume" value={priceLabel(pipeline)} sub="For-sale guide prices" />
        <KPI label="Architecture Projects" value={store.projects.length} sub="Across 6 categories" />
        <KPI label="New Inquiries" value={newInq} sub={`${store.inquiries.length} total received`} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="border border-ink/10 bg-white p-6">
          <h3 className="eyebrow">Inquiries per Month (Demo)</h3>
          <div className="mt-6 flex h-40 items-end gap-4" data-testid="admin-chart">
            {byMonth.map((b) => (
              <div key={b.m} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(b.v / max) * 100}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full bg-bronze/80"
                  style={{ minHeight: 6 }}
                />
                <span className="text-[11px] text-stone">{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-ink/10 bg-white p-6">
          <h3 className="eyebrow">Latest Inquiries</h3>
          <ul className="mt-4 divide-y divide-ink/10">
            {store.inquiries.slice(0, 4).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="truncate">
                  <strong className="font-medium">{i.name}</strong>
                  <span className="ml-2 text-inksoft/60">{i.service}</span>
                </span>
                <span className={`shrink-0 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] ${i.status === "New" ? "bg-bronze text-white" : "bg-sand text-inksoft"}`}>{i.status}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => setTab("inquiries")} className={btnGhost + " mt-4"} data-testid="overview-view-inquiries"><Eye size={13} /> Manage Inquiries</button>
        </div>
      </div>
    </div>
  );
}

const emptyProperty = { name: "", location: "Malibu, California", price: 3000000, beds: 3, baths: 3, area: "3,000 sq ft", type: "Villa", status: "New Listing", year: 2025, featured: false, added: new Date().toISOString().slice(0, 10), images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"], description: "", specs: {} };

function Properties({ store }) {
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const save = (p) => {
    if (!p.name.trim()) { toast.error("Property name is required."); return; }
    if (editing.id) { store.updateProperty(editing.id, p); toast.success("Property updated."); }
    else { store.addProperty({ ...p, slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }); toast.success("Property added."); }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Property Management</h1>
        <button onClick={() => setEditing({ ...emptyProperty })} data-testid="add-property-btn" className={btn}><Plus size={14} /> Add Property</button>
      </div>
      <div className="mt-6 overflow-x-auto border border-ink/10 bg-white" data-testid="admin-properties-table">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-[10px] uppercase tracking-[0.18em] text-stone">
              <th className="p-4">Property</th><th className="p-4">Location</th><th className="p-4">Price</th>
              <th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.properties.map((p) => (
              <tr key={p.id} className="border-b border-ink/5 last:border-0" data-testid={`admin-property-row-${p.id}`}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="h-11 w-16 object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-inksoft/70">{p.location}</td>
                <td className="p-4 text-bronze">{priceLabel(p.price)}</td>
                <td className="p-4 text-inksoft/70">{p.type}</td>
                <td className="p-4">
                  <select
                    value={p.status}
                    onChange={(e) => { store.updateProperty(p.id, { status: e.target.value }); toast.success(`Status set to ${e.target.value}`); }}
                    data-testid={`property-status-${p.id}`}
                    className="border border-ink/15 bg-ivory px-2.5 py-1.5 text-xs"
                  >
                    {PROPERTY_STATUSES.map((st) => <option key={st}>{st}</option>)}
                  </select>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(p)} aria-label={`Edit ${p.name}`} data-testid={`edit-property-${p.id}`} className={btnGhost}><Pencil size={13} /> Edit</button>
                    <button onClick={() => setConfirmDelete(p)} aria-label={`Delete ${p.name}`} data-testid={`delete-property-${p.id}`} className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-red-500 hover:bg-red-50"><Trash2 size={13} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={editing.id ? "Edit Property" : "Add Demo Property"} onClose={() => setEditing(null)} testid="property-modal">
            <PropertyForm initial={editing} onSave={save} />
          </Modal>
        )}
        {confirmDelete && (
          <Modal title="Delete Property" onClose={() => setConfirmDelete(null)} testid="delete-property-modal">
            <p className="text-sm text-inksoft/75">Delete <strong>{confirmDelete.name}</strong> from the demo portfolio? This cannot be undone (use Reset Demo Data to restore).</p>
            <div className="mt-6 flex gap-3">
              <button data-testid="confirm-delete-property" onClick={() => { store.deleteProperty(confirmDelete.id); toast.success("Property deleted."); setConfirmDelete(null); }} className="bg-red-500 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white hover:bg-red-600">Delete</button>
              <button onClick={() => setConfirmDelete(null)} className={btnGhost}>Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function PropertyForm({ initial, onSave }) {
  const [p, setP] = useState({ ...initial });
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(p); }} className="grid gap-4 sm:grid-cols-2" data-testid="property-form">
      <div className="sm:col-span-2"><label className={label}>Name</label><input value={p.name} onChange={set("name")} className={input} data-testid="property-form-name" /></div>
      <div>
        <label className={label}>Location</label>
        <input value={p.location} onChange={set("location")} className={input} />
      </div>
      <div><label className={label}>Price (USD)</label><input type="number" value={p.price} onChange={(e) => setP({ ...p, price: +e.target.value })} className={input} data-testid="property-form-price" /></div>
      <div><label className={label}>Bedrooms</label><input type="number" value={p.beds} onChange={(e) => setP({ ...p, beds: +e.target.value })} className={input} /></div>
      <div><label className={label}>Bathrooms</label><input type="number" value={p.baths} onChange={(e) => setP({ ...p, baths: +e.target.value })} className={input} /></div>
      <div><label className={label}>Area</label><input value={p.area} onChange={set("area")} className={input} /></div>
      <div><label className={label}>Year</label><input type="number" value={p.year} onChange={(e) => setP({ ...p, year: +e.target.value })} className={input} /></div>
      <div><label className={label}>Type</label><select value={p.type} onChange={set("type")} className={input}>{PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div><label className={label}>Status</label><select value={p.status} onChange={set("status")} className={input}>{PROPERTY_STATUSES.map((st) => <option key={st}>{st}</option>)}</select></div>
      <div className="sm:col-span-2"><label className={label}>Image URL</label><input value={p.images[0]} onChange={(e) => setP({ ...p, images: [e.target.value, ...p.images.slice(1)] })} className={input} data-testid="property-form-image" /></div>
      <div className="sm:col-span-2"><label className={label}>Description</label><textarea rows={3} value={p.description} onChange={set("description")} className={input} /></div>
      <button type="submit" className={btn + " sm:col-span-2 justify-center"} data-testid="property-form-save">Save Property</button>
    </form>
  );
}

const emptyProject = { title: "", category: "Residential", location: "", year: 2025, area: "—", featured: false, images: ["https://images.unsplash.com/photo-1614595737476-42487331b8a1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400"], description: "", specs: {} };

function ProjectsAdmin({ store }) {
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const save = (j) => {
    if (!j.title.trim()) { toast.error("Project title is required."); return; }
    if (editing.id) { store.updateProject(editing.id, j); toast.success("Project updated."); }
    else { store.addProject({ ...j, slug: j.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") }); toast.success("Project added."); }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Project Management</h1>
        <button onClick={() => setEditing({ ...emptyProject })} data-testid="add-project-btn" className={btn}><Plus size={14} /> Add Project</button>
      </div>
      <div className="mt-6 overflow-x-auto border border-ink/10 bg-white" data-testid="admin-projects-table">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-[10px] uppercase tracking-[0.18em] text-stone">
              <th className="p-4">Project</th><th className="p-4">Category</th><th className="p-4">Location</th><th className="p-4">Year</th><th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.projects.map((j) => (
              <tr key={j.id} className="border-b border-ink/5 last:border-0">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={j.images[0]} alt="" className="h-11 w-16 object-cover" />
                    <span className="font-medium">{j.title}{j.featured && <span className="ml-2 bg-bronze/15 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em] text-bronze">Featured</span>}</span>
                  </div>
                </td>
                <td className="p-4 text-inksoft/70">{j.category}</td>
                <td className="p-4 text-inksoft/70">{j.location}</td>
                <td className="p-4 text-inksoft/70">{j.year}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(j)} aria-label={`Edit ${j.title}`} data-testid={`edit-project-${j.id}`} className={btnGhost}><Pencil size={13} /> Edit</button>
                    <button onClick={() => setConfirmDelete(j)} aria-label={`Delete ${j.title}`} data-testid={`delete-project-${j.id}`} className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-red-500 hover:bg-red-50"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={editing.id ? "Edit Project" : "Add Demo Project"} onClose={() => setEditing(null)} testid="project-admin-modal">
            <ProjectAdminForm initial={editing} onSave={save} />
          </Modal>
        )}
        {confirmDelete && (
          <Modal title="Delete Project" onClose={() => setConfirmDelete(null)}>
            <p className="text-sm text-inksoft/75">Delete <strong>{confirmDelete.title}</strong>?</p>
            <div className="mt-6 flex gap-3">
              <button data-testid="confirm-delete-project" onClick={() => { store.deleteProject(confirmDelete.id); toast.success("Project deleted."); setConfirmDelete(null); }} className="bg-red-500 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-white hover:bg-red-600">Delete</button>
              <button onClick={() => setConfirmDelete(null)} className={btnGhost}>Cancel</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectAdminForm({ initial, onSave }) {
  const [j, setJ] = useState({ ...initial });
  const set = (k) => (e) => setJ({ ...j, [k]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(j); }} className="grid gap-4 sm:grid-cols-2" data-testid="project-admin-form">
      <div className="sm:col-span-2"><label className={label}>Title</label><input value={j.title} onChange={set("title")} className={input} data-testid="project-form-title" /></div>
      <div><label className={label}>Category</label><select value={j.category} onChange={set("category")} className={input}>{PROJECT_CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}</select></div>
      <div><label className={label}>Year</label><input type="number" value={j.year} onChange={(e) => setJ({ ...j, year: +e.target.value })} className={input} /></div>
      <div><label className={label}>Location</label><input value={j.location} onChange={set("location")} className={input} /></div>
      <div><label className={label}>Area</label><input value={j.area} onChange={set("area")} className={input} /></div>
      <div className="sm:col-span-2"><label className={label}>Image URL</label><input value={j.images[0]} onChange={(e) => setJ({ ...j, images: [e.target.value, ...j.images.slice(1)] })} className={input} /></div>
      <div className="sm:col-span-2"><label className={label}>Description</label><textarea rows={3} value={j.description} onChange={set("description")} className={input} /></div>
      <label className="flex items-center gap-2.5 text-sm sm:col-span-2">
        <input type="checkbox" checked={!!j.featured} onChange={(e) => setJ({ ...j, featured: e.target.checked })} className="accent-[#B08D57]" data-testid="project-form-featured" /> Feature on homepage
      </label>
      <button type="submit" className={btn + " sm:col-span-2 justify-center"} data-testid="project-form-save">Save Project</button>
    </form>
  );
}

function ServicesAdmin({ store }) {
  const [drafts, setDrafts] = useState({});
  return (
    <div>
      <h1 className="font-display text-3xl">Services Management</h1>
      <p className="mt-1 text-sm text-inksoft/60">Update the short descriptions shown on the Services page.</p>
      <div className="mt-6 space-y-4" data-testid="admin-services-list">
        {DEMO_SERVICES(store).map((s) => (
          <div key={s.slug} className="border border-ink/10 bg-white p-6" data-testid={`admin-service-${s.slug}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl">{s.title}</h3>
              <span className="text-[11px] uppercase tracking-[0.16em] text-stone">/{s.slug}</span>
            </div>
            <textarea
              rows={2}
              value={drafts[s.slug] ?? s.short}
              onChange={(e) => setDrafts({ ...drafts, [s.slug]: e.target.value })}
              data-testid={`service-short-${s.slug}`}
              className={input + " mt-4"}
            />
            <button
              onClick={() => { store.setServiceOverride(s.slug, { short: drafts[s.slug] ?? s.short }); toast.success("Service description saved."); }}
              data-testid={`service-save-${s.slug}`}
              className={btnGhost + " mt-3"}
            >
              Save Description
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DEMO_SERVICES(store) {
  return SERVICE_LIST.map((s) => ({ ...s, short: (store.serviceOverrides || {})[s.slug]?.short || s.short }));
}

function TestimonialsAdmin({ store }) {
  const [editing, setEditing] = useState(null);
  const empty = { quote: "", name: "", project: "", initials: "" };

  const save = (t) => {
    if (!t.quote.trim() || !t.name.trim()) { toast.error("Quote and client name are required."); return; }
    if (editing.id) { store.updateTestimonial(editing.id, t); toast.success("Testimonial updated."); }
    else { store.addTestimonial({ ...t, initials: t.initials || t.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() }); toast.success("Testimonial added."); }
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Testimonials Management</h1>
        <button onClick={() => setEditing({ ...empty })} data-testid="add-testimonial-btn" className={btn}><Plus size={14} /> Add Testimonial</button>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2" data-testid="admin-testimonials-list">
        {store.testimonials.map((t) => (
          <div key={t.id} className="border border-ink/10 bg-white p-6" data-testid={`admin-testimonial-${t.id}`}>
            <p className="font-display text-lg leading-snug">"{t.quote}"</p>
            <p className="mt-3 text-sm text-inksoft/70">{t.name} — {t.project}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => setEditing(t)} data-testid={`edit-testimonial-${t.id}`} className={btnGhost}><Pencil size={13} /> Edit</button>
              <button
                onClick={() => { store.deleteTestimonial(t.id); toast.success("Testimonial removed."); }}
                data-testid={`delete-testimonial-${t.id}`}
                className="inline-flex items-center gap-1.5 border border-red-200 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-red-500 hover:bg-red-50"
              ><Trash2 size={13} /> Delete</button>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {editing && (
          <Modal title={editing.id ? "Edit Testimonial" : "Add Testimonial"} onClose={() => setEditing(null)} testid="testimonial-modal">
            <form onSubmit={(e) => { e.preventDefault(); save(editing); }} className="space-y-4" data-testid="testimonial-form">
              <div><label className={label}>Quote</label><textarea rows={4} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className={input} data-testid="testimonial-form-quote" /></div>
              <div><label className={label}>Client Name</label><input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={input} data-testid="testimonial-form-name" /></div>
              <div><label className={label}>Project Type / Reference</label><input value={editing.project} onChange={(e) => setEditing({ ...editing, project: e.target.value })} className={input} /></div>
              <button type="submit" className={btn + " w-full justify-center"} data-testid="testimonial-form-save">Save Testimonial</button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function InquiriesAdmin({ store }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <h1 className="font-display text-3xl">Inquiry Management</h1>
      <p className="mt-1 text-sm text-inksoft/60">Sample inquiries from the contact form and property pages.</p>
      <div className="mt-6 space-y-3" data-testid="admin-inquiries-list">
        {store.inquiries.map((i) => (
          <div key={i.id} className="border border-ink/10 bg-white p-5" data-testid={`admin-inquiry-${i.id}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-medium">{i.name}</span>
                <span className="ml-3 text-sm text-inksoft/60">{i.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone">{i.date}</span>
                <select
                  value={i.status}
                  onChange={(e) => { store.updateInquiry(i.id, { status: e.target.value }); toast.success(`Marked ${e.target.value}`); }}
                  data-testid={`inquiry-status-${i.id}`}
                  className="border border-ink/15 bg-ivory px-2.5 py-1.5 text-xs"
                >
                  {INQUIRY_STATUS.map((st) => <option key={st}>{st}</option>)}
                </select>
                <button onClick={() => setExpanded(expanded === i.id ? null : i.id)} aria-label="Toggle details" data-testid={`inquiry-expand-${i.id}`} className={btnGhost}><Eye size={13} /></button>
                <button
                  onClick={() => { store.deleteInquiry(i.id); toast.success("Inquiry deleted."); }}
                  aria-label="Delete inquiry"
                  data-testid={`inquiry-delete-${i.id}`}
                  className="border border-red-200 p-2 text-red-500 hover:bg-red-50"
                ><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-inksoft/60">
              <span>Service: <strong className="text-ink">{i.service}</strong></span>
              <span>Location: {i.location}</span>
              <span>Budget: {i.budget}</span>
              {i.phone && i.phone !== "—" && <span>Phone: {i.phone}</span>}
            </div>
            {expanded === i.id && (
              <p className="mt-3 border-t border-ink/10 pt-3 text-sm leading-relaxed text-inksoft/80" data-testid={`inquiry-message-${i.id}`}>
                {i.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}