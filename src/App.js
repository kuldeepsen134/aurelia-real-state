import { Component, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "@/store/AppStore";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { initLenis, scrollTop } from "@/lib/lenis";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const RealEstate = lazy(() => import("@/pages/RealEstate"));
const PropertyDetail = lazy(() => import("@/pages/PropertyDetail"));
const Architecture = lazy(() => import("@/pages/Architecture"));
const ArchitectureDetail = lazy(() => import("@/pages/ArchitectureDetail"));
const Projects = lazy(() => import("@/pages/Projects"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const Admin = lazy(() => import("@/pages/Admin"));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
          <p className="eyebrow">Aurelia & Stone</p>
          <h1 className="mt-4 font-display text-3xl">Something went off-plan.</h1>
          <p className="mt-3 max-w-md text-sm text-inksoft/70">{String(this.state.error)}</p>
          <a href="/" className="mt-8 bg-ink px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivory hover:bg-bronze">
            Back to Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollTop(true);
  }, [pathname]);
  return null;
}

function Loader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-ivory">
      <svg width="42" height="42" viewBox="0 0 64 64" className="animate-pulse">
        <rect width="64" height="64" rx="2" fill="#202020" />
        <path d="M32 10 L54 54 H45.5 L32 24.5 L18.5 54 H10 Z" fill="#B08D57" />
        <rect x="24" y="41" width="16" height="4" fill="#B08D57" />
      </svg>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdmin && <Navbar />}
      <Suspense fallback={<Loader />}>
        <AnimateRoutes location={location} />
      </Suspense>
      {!isAdmin && <Footer />}
    </>
  );
}

function AnimateRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/real-estate" element={<RealEstate />} />
      <Route path="/real-estate/:slug" element={<PropertyDetail />} />
      <Route path="/architecture" element={<Architecture />} />
      <Route path="/architecture/:slug" element={<ArchitectureDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <ErrorBoundary>
      <StoreProvider>
        <Toaster position="bottom-right" richColors closeButton />
        <BrowserRouter>
          <ScrollToTop />
          <Shell />
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  );
}