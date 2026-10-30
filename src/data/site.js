export const BRAND = {
  name: "Aurelia & Stone",
  short: "A&S",
  tagline: "Designing Spaces. Creating Legacies.",
  email: "hello@aureliastone.studio",
  phone: "+1 (212) 555-0148",
  whatsapp: "12125550148",
  whatsappDisplay: "+1 212 555 0148",
  address: "128 Grand Atelier Row, New York, NY 10013",
  hours: "Mon – Sat · 9:00 – 18:00 EST",
  founded: 1999,
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Architecture", to: "/architecture" },
  { label: "Real Estate", to: "/real-estate" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Contact", to: "/contact" },
];

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "Behance", href: "https://behance.net" },
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
  "https://images.unsplash.com/photo-1599777560450-e462cffc5368?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000",
];

export const STATS = [
  { value: 240, suffix: "+", label: "Projects Completed" },
  { value: 480, suffix: "+", label: "Happy Clients" },
  { value: 26, suffix: "", label: "Years of Experience" },
  { value: 18, suffix: "", label: "Design Excellence Awards" },
];

export const WHY_US = [
  { icon: "Landmark", title: "Experience", text: "26 years of shaping skylines, estates and legacies across three continents — with the portfolio to prove it." },
  { icon: "Compass", title: "Innovation", text: "Parametric tools, sustainable systems and an in-house 3D visualisation lab keep our work a decade ahead." },
  { icon: "Gem", title: "Quality", text: "Every joint, grain and finish is specified, sampled and supervised. We accept nothing less than exacting." },
  { icon: "Scale", title: "Transparency", text: "Open budgets, honest timelines and a single point of contact from first sketch to final key." },
  { icon: "HeartHandshake", title: "Client Satisfaction", text: "92% of our commissions arrive by referral — the quietest, truest measure of a studio." },
];

export const ABOUT = {
  intro: "Founded in 1999, Aurelia & Stone is an atelier of architects, interior curators and estate advisors bound by one conviction: a building should outlive trends and belong to its landscape.",
  philosophy: "We design with light before walls, with silence before noise, with the ground before the drawing. Our work moves slowly on purpose — fewer projects, deeper attention, architecture that reads as inevitable rather than impressive.",
  imageA: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
  imageB: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
};

export const MARQUEE_ITEMS = [
  "Architecture",
  "Estate Curation",
  "Interior Atelier",
  "Masterplanning",
  "Restoration",
  "3D Visualisation",
  "New York",
  "Lake Como",
  "Kyoto",
];

export const SERVICES = [
  {
    slug: "architectural-design",
    title: "Architectural Design",
    icon: "Compass",
    short: "Ground-up residential and civic architecture, from first massing study to construction documents.",
    image: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Our core discipline. We take singular sites and translate them into architecture that feels inevitable — balancing client ambition, planning constraints and the quiet physics of light. Every commission is led by a principal, never delegated.",
    process: [
      { step: "01", title: "Concept & Feasibility", text: "Site analysis, brief development and massing studies to establish what the land wants to hold." },
      { step: "02", title: "Design Development", text: "Plans, sections and material palettes resolved to millimetre precision with physical models." },
      { step: "03", title: "Documentation", text: "Full construction documents, engineering coordination and permit navigation." },
      { step: "04", title: "Delivery", text: "On-site supervision through handover, with a two-year post-occupancy review." },
    ],
    benefits: ["Principal-led design", "Fixed-fee clarity", "Sustainability-first detailing", "Permit success rate above 98%"],
  },
  {
    slug: "residential-construction",
    title: "Residential Construction",
    icon: "Building",
    short: "Bespoke homes built by our own construction arm — design and build under one roof.",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Owning the build removes the gap where budgets bleed and details are lost. Our crews and vetted trades execute our drawings directly, with weekly cost reporting and a founder on site at every milestone.",
    process: [
      { step: "01", title: "Pre-Construction", text: "Trade tendering, value engineering and a locked guaranteed-maximum-price." },
      { step: "02", title: "Foundation & Frame", text: "Structural works executed to surveyor-verified tolerances." },
      { step: "03", title: "Envelope & Interiors", text: "Facade, joinery and finishes installed by specialist ateliers." },
      { step: "04", title: "Handover", text: "Snag-free delivery with a digital home manual and 24-month care plan." },
    ],
    benefits: ["Single point of accountability", "GMP cost certainty", "Weekly site reporting", "Award-winning build quality"],
  },
  {
    slug: "commercial-architecture",
    title: "Commercial Architecture",
    icon: "Building2",
    short: "Workplaces, hospitality and retail environments engineered for brand and return.",
    image: "https://images.unsplash.com/photo-1536501483244-925da0b87089?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Commercial work must earn its keep. We design hospitality, workplace and retail buildings where the architecture is the marketing — measurable in footfall, tenancy premiums and press.",
    process: [
      { step: "01", title: "Commercial Brief", text: "Market study, tenant mix and yield modelling before a single line is drawn." },
      { step: "02", title: "Experience Design", text: "Customer journeys mapped and prototyped at full scale." },
      { step: "03", title: "Technical Delivery", text: "BIM-coordinated documentation with landlord and authority packages." },
      { step: "04", title: "Launch Support", text: "Brand-architecture alignment through fit-out and opening." },
    ],
    benefits: ["Yield-conscious design", "BIM Level 2 delivery", "Hospitality specialisation", "Press-ready architecture"],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    icon: "Sofa",
    short: "Complete interior architecture, furniture curation and art advisory.",
    image: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Interiors are where architecture becomes daily life. Our interior atelier designs from the shell inwards — bespoke joinery, lighting scenes, stone books and textile libraries curated across 14 countries.",
    process: [
      { step: "01", title: "Interior Concept", text: "Atmosphere studies, material palettes and spatial choreography." },
      { step: "02", title: "Bespoke Joinery", text: "Millwork drawings produced alongside our furniture makers." },
      { step: "03", title: "Curation", text: "Art, object and antique sourcing with our gallery partners." },
      { step: "04", title: "Styling & Handover", text: "Full installation and seasonal restyling service." },
    ],
    benefits: ["In-house material library", "Bespoke furniture studio", "Art advisory network", "Turnkey installation"],
  },
  {
    slug: "real-estate-development",
    title: "Real Estate Development",
    icon: "KeyRound",
    short: "Design-led development of boutique residences and legacy estates.",
    image: "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "We develop the buildings we would want to live in — small-batch, design-led projects where architecture leads the pro forma rather than serving it. Typically 4 to 20 residences per project.",
    process: [
      { step: "01", title: "Sourcing", text: "Off-market land and legacy assets sourced through 26 years of relationships." },
      { step: "02", title: "Structuring", text: "Capital stacking, entitlement and joint-venture architecture." },
      { step: "03", title: "Design & Build", text: "Our architecture, construction and interiors teams deliver in-house." },
      { step: "04", title: "Curation & Sale", text: "Marketing, staging and sale through our estate brokerage." },
    ],
    benefits: ["Off-market access", "Design-led pro formas", "Vertical integration", "Legacy positioning"],
  },
  {
    slug: "property-consultation",
    title: "Property Consultation",
    icon: "ClipboardCheck",
    short: "Independent acquisition advisory for collectors, families and funds.",
    image: "https://images.unsplash.com/photo-1649155913488-c72449a40625?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "We act solely for the buyer — appraising, negotiating and structuring acquisitions of significant properties, with the eye of architects and the discipline of fiduciaries.",
    process: [
      { step: "01", title: "Mandate", text: "Defining the brief, budget envelope and confidentiality protocol." },
      { step: "02", title: "Search & Appraisal", text: "Technical due diligence — structure, services, land and latent cost." },
      { step: "03", title: "Negotiation", text: "Offer strategy and exchange management on your behalf." },
      { step: "04", title: "Post-Acquisition", text: "Renovation feasibility and phased improvement planning." },
    ],
    benefits: ["Buy-side only", "Technical due diligence", "Off-market pipeline", "Absolute confidentiality"],
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    icon: "Hammer",
    short: "Sensitive transformation of heritage and mid-century structures.",
    image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Older buildings carry intelligence worth keeping. We renovate with surgical restraint — restoring what is fine, replacing what is failed and inserting modern life without erasing memory.",
    process: [
      { step: "01", title: "Heritage Survey", text: "Historic fabric assessment and conservation strategy." },
      { step: "02", title: "Insertion Design", text: "New services and structure threaded through the old." },
      { step: "03", title: "Craft Restoration", text: "Specialist trades for stone, plaster, timber and metal." },
      { step: "04", title: "Reveal", text: "Careful completion with conservation sign-off." },
    ],
    benefits: ["Conservation expertise", "Craftsperson network", "Hidden-cost forecasting", "Heritage approval record"],
  },
  {
    slug: "3d-visualization",
    title: "3D Visualisation",
    icon: "Boxes",
    short: "Cinematic architectural renders, animation and VR walkthroughs.",
    image: "https://images.unsplash.com/photo-1762732793012-8bdab3af00b4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
    overview: "Our visualisation lab produces imagery indistinguishable from photography — used for planning approvals, pre-sales marketing and design refinement before ground is ever broken.",
    process: [
      { step: "01", title: "Scene Building", text: "Accurate BIM-derived models with true material physics." },
      { step: "02", title: "Art Direction", text: "Lighting, season and story matched to your audience." },
      { step: "03", title: "Still & Film", text: "Hero stills, cinematic flythroughs and interactive VR." },
      { step: "04", title: "Marketing Kit", text: "Print and web-ready assets for sales launch." },
    ],
    benefits: ["Photoreal quality", "VR walkthroughs", "Pre-sale marketing assets", "Planning-approval support"],
  },
];

export const TESTIMONIALS = [
  {
    quote: "Aurelia & Stone did not design us a house — they designed us a life we had not dared to ask for. Eighteen months on, the light in the morning room still stops conversation.",
    name: "Jonathan & Marisa Hale",
    project: "Cliffline Residence, Malibu",
    initials: "JH",
  },
  {
    quote: "The most rigorous architects we have commissioned in thirty years of development. Budget honest, programme exact, and the finished building outperformed the renders.",
    name: "Diana Whitfield",
    project: "The Foundry — Commercial Workplace, Austin",
    initials: "DW",
  },
  {
    quote: "They restored our 1908 townhouse with the patience of conservators and the nerve of modernists. Every craftsman they brought through that door was a master.",
    name: "The Okonkwo Family",
    project: "Heritage Townhouse Restoration, Brooklyn Heights",
    initials: "OF",
  },
  {
    quote: "From land search to keys-in-hand, one team, one standard. Our villa appreciated 40% before completion — but honestly, we would refuse to sell it.",
    name: "A. von Aren",
    project: "Villa Sereno — Design & Build, Lake Como",
    initials: "AV",
  },
];

export const VALUES = [
  { title: "Slowness as Standards", text: "We take on nine projects a year, never more. Depth beats volume, every time." },
  { title: "Ground Before Drawing", text: "Every design begins with weeks on site — soil, sun, wind and neighbours understood before sketching." },
  { title: "Honest Budgets", text: "Costs are published to clients weekly. Surprises are a design failure." },
  { title: "Built to Inherit", text: "We detail for fifty-year lifespans and design for buildings that will be loved, not merely occupied." },
];

export const ACHIEVEMENTS = [
  { year: "2024", title: "International Architecture Award — Cliffline Residence" },
  { year: "2023", title: "Awwwards Site of the Day — Studio Portfolio" },
  { year: "2022", title: "Dezeen Award, Housing Project — Villa Sereno, Lake Como" },
  { year: "2019", title: "AIA Housing Award — The Foundry Residences" },
  { year: "2016", title: "Heritage Conservation Commendation — Brooklyn Heights" },
  { year: "2011", title: "European Prize for Contemporary Architecture — Shortlist" },
];

export const OFFICES = [
  { city: "New York", address: "128 Grand Atelier Row, NY 10013", phone: "+1 (212) 555-0148" },
  { city: "Lake Como", address: "Via Regina 42, 22010 Bellagio", phone: "+39 031 555 0148" },
  { city: "Kyoto", address: "Nakagyo-ku, Sanjo 21, Kyoto 604", phone: "+81 75 555 0148" },
];

export const BUDGET_OPTIONS = [
  "Under $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M – $15M",
  "Above $15M",
];

export const INQUIRY_STATUS = ["New", "In Review", "Contacted", "Closed"];
