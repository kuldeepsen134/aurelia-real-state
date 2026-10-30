import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_PROPERTIES } from "@/data/properties";
import { DEFAULT_PROJECTS, DEMO_INQUIRIES } from "@/data/projects";
import { TESTIMONIALS, SERVICES } from "@/data/site";

const KEY = "aurelia-store-v1";

const defaults = () => ({
  properties: DEFAULT_PROPERTIES,
  projects: DEFAULT_PROJECTS,
  testimonials: TESTIMONIALS,
  inquiries: DEMO_INQUIRIES,
  serviceOverrides: {},
});

const StoreContext = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const saved = JSON.parse(raw);
    return { ...defaults(), ...saved };
  } catch {
    return defaults();
  }
}

export function StoreProvider({ children }) {
  const [store, setStore] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch {}
  }, [store]);

  const value = useMemo(() => {
    const set = (patch) => setStore((s) => ({ ...s, ...patch }));

    const makeId = (prefix) => prefix + Math.random().toString(36).slice(2, 8);

    return {
      ...store,
      addProperty: (p) => set({ properties: [{ ...p, id: makeId("p") }, ...store.properties] }),
      updateProperty: (id, patch) => set({ properties: store.properties.map((p) => (p.id === id ? { ...p, ...patch } : p)) }),
      deleteProperty: (id) => set({ properties: store.properties.filter((p) => p.id !== id) }),

      addProject: (j) => set({ projects: [{ ...j, id: makeId("j") }, ...store.projects] }),
      updateProject: (id, patch) => set({ projects: store.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) }),
      deleteProject: (id) => set({ projects: store.projects.filter((p) => p.id !== id) }),

      addTestimonial: (t) => set({ testimonials: [{ ...t, id: makeId("t") }, ...store.testimonials] }),
      updateTestimonial: (id, patch) => set({ testimonials: store.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)) }),
      deleteTestimonial: (id) => set({ testimonials: store.testimonials.filter((t) => t.id !== id) }),

      addInquiry: (i) => set({ inquiries: [{ ...i, id: makeId("i"), status: "New", date: new Date().toISOString().slice(0, 10) }, ...store.inquiries] }),
      updateInquiry: (id, patch) => set({ inquiries: store.inquiries.map((i) => (i.id === id ? { ...i, ...patch } : i)) }),
      deleteInquiry: (id) => set({ inquiries: store.inquiries.filter((i) => i.id !== id) }),

      setServiceOverride: (slug, patch) =>
        set({ serviceOverrides: { ...store.serviceOverrides, [slug]: { ...(store.serviceOverrides[slug] || {}), ...patch } } }),

      resetDemo: () => {
        localStorage.removeItem(KEY);
        setStore(defaults());
      },
    };
  }, [store]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const SERVICE_LIST = SERVICES;