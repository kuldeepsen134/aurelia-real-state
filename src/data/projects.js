const U = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=srgb&fm=jpg&q=85&w=${w}`;

export const PROJECT_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Modern Villas",
  "Interior Design",
  "Institutional",
  "Landscape Architecture",
];

export const DEFAULT_PROJECTS = [
  {
    id: "j1", slug: "cliffline-residence-arch", title: "Cliffline Residence",
    category: "Modern Villas", location: "Malibu, California", year: 2024,
    area: "12,400 sq ft", featured: true,
    images: [U("photo-1613490493576-7fde63acd811"), U("photo-1599777560450-e462cffc5368"), U("photo-1724582586529-62622e50c0b3")],
    description: "A house in dialogue with the void. Three travertine volumes step down the headland, each turned to a different register of the Pacific — dawn horizon, noon glare, dusk fade. Bronze screens filter the western sun; the pool is cut into living rock.",
    specs: { Materials: "Travertine, bronze, low-iron glass", Status: "Completed", Client: "Private", Team: "14 architects, 3 engineers" },
  },
  {
    id: "j2", slug: "the-foundry", title: "The Foundry",
    category: "Commercial", location: "Austin, Texas", year: 2021,
    area: "180,000 sq ft", featured: true,
    images: [U("photo-1536501483244-925da0b87089"), U("photo-1691425700573-5e2e6e4f6157"), U("photo-1614595737476-42487331b8a1")],
    description: "A 1920s rivet works reborn as a creative workplace. The original truss line is kept exposed for 400 feet; new programmes hang inside it as blackened-steel boxes, touched by light from a new continuous skylight.",
    specs: { Materials: "Existing steel, blackened steel, oak", Status: "Completed", Client: "Foundry Partners LLC", Awards: "AIA Housing Award 2019" },
  },
  {
    id: "j3", slug: "villa-sereno", title: "Villa Sereno",
    category: "Modern Villas", location: "Bellagio, Lake Como", year: 2023,
    area: "9,200 sq ft", featured: true,
    images: [U("photo-1670589953882-b94c9cb380f5"), U("photo-1613553507747-5f8d62ad5904"), U("photo-1544984243-ec57ea16fe25")],
    description: "On a terraced orchard above the lake, Villa Sereno descends in five stone platforms. Local Ceppo di Grè walls, cherry orchards replanted on the roof terraces and a swimming pool that dissolves into the water below.",
    specs: { Materials: "Ceppo di Grè stone, cherry timber", Status: "Completed", Client: "Private" },
  },
  {
    id: "j4", slug: "sanjo-attelier", title: "Sanjo Atelier",
    category: "Interior Design", location: "Kyoto, Japan", year: 2023,
    area: "3,100 sq ft", featured: true,
    images: [U("photo-1631679706909-1844bbd07221"), U("photo-1705321963943-de94bb3f0dd3"), U("photo-1599696848652-f0ff23bc911f")],
    description: "Our Kyoto interior atelier: a machiya townhouse stripped to its beams and re-composed with cedar, washi and a single 400-year-old granite basin. Light is treated as the primary material.",
    specs: { Materials: "Cedar, washi paper, granite", Status: "Completed", Client: "Private" },
  },
  {
    id: "j5", slug: "meridian-tower", title: "Meridian Tower",
    category: "Commercial", location: "Manhattan, New York", year: 2022,
    area: "320,000 sq ft", featured: false,
    images: [U("photo-1691425700573-5e2e6e4f6157"), U("photo-1549791084-5f78368b208b"), U("photo-1614595737476-42487331b8a1")],
    description: "A 38-storey residential tower whose facade is a woven bronze veil — 2,400 panels each angled by algorithm to balance river light against privacy.",
    specs: { Materials: "Bronze veil, limestone base", Status: "Completed", Client: "Meridian Group" },
  },
  {
    id: "j6", slug: "whitmore-library", title: "Whitmore Library",
    category: "Institutional", location: "Portland, Oregon", year: 2020,
    area: "42,000 sq ft", featured: false,
    images: [U("photo-1614595737476-42487331b8a1"), U("photo-1536501483244-925da0b87089"), U("photo-1503387837-b154d5074bd2")],
    description: "A public library conceived as a covered town square. Reading rooms radiate from a daylit atrium under a folded CLT roof; every seat holds a view of mature firs.",
    specs: { Materials: "Cross-laminated timber, granite", Status: "Completed", Client: "City of Portland" },
  },
  {
    id: "j7", slug: "halcyon-gardens", title: "Halcyon Gardens",
    category: "Landscape Architecture", location: "Charleston, South Carolina", year: 2022,
    area: "6 acres", featured: false,
    images: [U("photo-1544984243-ec57ea16fe25"), U("photo-1721815693498-cc28507c0ba2"), U("photo-1599777560450-e462cffc5368")],
    description: "A pleasure ground rebuilt from a derelict rice plantation — native grass meadows, a rill of recycled rainwater and 400 live oaks underplanted with camellia alleys.",
    specs: { Materials: "Native planting, oolitic limestone", Status: "Completed", Client: "Halcyon Trust" },
  },
  {
    id: "j8", slug: "casa-ombra", title: "Casa Ombra",
    category: "Residential", location: "Scottsdale, Arizona", year: 2024,
    area: "5,600 sq ft", featured: false,
    images: [U("photo-1724582586529-62622e50c0b3"), U("photo-1544984243-ec57ea16fe25"), U("photo-1558442074-3c19857bc1dc")],
    description: "A courtyard house for the desert: rammed-earth walls 24 inches thick, a shaded water court at the centre, and rooms that borrow light twice — once from the sky, once from the pool.",
    specs: { Materials: "Rammed earth, glulam, terrazzo", Status: "Completed", Client: "Private" },
  },
  {
    id: "j9", slug: "atrium-residences", title: "Atrium Residences",
    category: "Residential", location: "Miami Beach, Florida", year: 2021,
    area: "96,000 sq ft", featured: false,
    images: [U("photo-1721815693498-cc28507c0ba2"), U("photo-1705321963943-de94bb3f0dd3"), U("photo-1631679706909-1844bbd07221")],
    description: "Twenty-eight residences arranged around a planted atrium that opens to the trade winds — a courtyard typology borrowed from the Caribbean and detailed in Florida keystone.",
    specs: { Materials: "Keystone, teak, glass", Status: "Completed", Client: "Vela Developments" },
  },
  {
    id: "j10", slug: "stone-bathhouse", title: "Stone Bathhouse",
    category: "Institutional", location: "Reykjavik, Iceland", year: 2019,
    area: "18,000 sq ft", featured: false,
    images: [U("photo-1614595737476-42487331b8a1"), U("photo-1549791084-5f78368b208b"), U("photo-1536501483244-925da0b87089")],
    description: "A public bathhouse set into a basalt rise, heated entirely by geothermal exchange. Pools are carved to the horizon; the changing rooms are lit by a single skylit slot.",
    specs: { Materials: "Basalt, copper, glass", Status: "Completed", Client: "Reykjavik City" },
  },
  {
    id: "j11", slug: "meadow-house", title: "Meadow House",
    category: "Residential", location: "Hudson Valley, New York", year: 2023,
    area: "4,200 sq ft", featured: false,
    images: [U("photo-1632829882891-5047ccc421bc"), U("photo-1544984243-ec57ea16fe25"), U("photo-1724582586529-62622e50c0b3")],
    description: "A long, low blackened-timber barn that disappears into its meadow — the roof planted, the walls charred, the only façade a fully glazed end wall facing 20 acres of wildflowers.",
    specs: { Materials: "Shou sugi ban cedar, CLT", Status: "Completed", Client: "Private" },
  },
  {
    id: "j12", slug: "atrium-workspace", title: "Canopy Workspace",
    category: "Commercial", location: "Singapore", year: 2024,
    area: "140,000 sq ft", featured: false,
    images: [U("photo-1691425700573-5e2e6e4f6157"), U("photo-1549791084-5f78368b208b"), U("photo-1614595737476-42487331b8a1")],
    description: "A workplace under a single perpetual canopy — a steel-and-timber gridshell roof floating above six garden courtyards, naturally ventilated for most of the year.",
    specs: { Materials: "Gridshell steel, tropical hardwood", Status: "Completed", Client: "Canopy REIT" },
  },
];

export const TEAM = [
  { name: "Eleanor Voss", role: "Founding Principal", image: "https://images.unsplash.com/photo-1606143412458-acc5f86de897?crop=entropy&cs=srgb&fm=jpg&q=85&w=800", bio: "Founded the atelier in 1999 after a decade at some of Europe's most exacting practices. Eleanor leads every commission and still draws the first plan by hand." },
  { name: "Marcus Chen", role: "Design Director", image: "https://images.unsplash.com/photo-1558730234-d8b2281b0d00?crop=entropy&cs=srgb&fm=jpg&q=85&w=800", bio: "Leads our commercial and tower work. Marcus built the studio's parametric facade lab and lectures on computational design." },
  { name: "Amara Okafor", role: "Head of Interiors", image: "https://images.unsplash.com/photo-1654765437547-6b572f52ee1a?crop=entropy&cs=srgb&fm=jpg&q=85&w=800", bio: "Curator of our material and textile libraries. Amara's interiors are collected as often as they are commissioned." },
  { name: "Sofia Marchetti", role: "Real Estate Director", image: "https://images.unsplash.com/photo-1581841064838-a470c740e8ee?crop=entropy&cs=srgb&fm=jpg&q=85&w=800", bio: "Runs estate curation and our development pipeline. Sofia has placed over $1.8B of design-led property across three continents." },
];

export const DEMO_INQUIRIES = [
  { id: "i1", name: "Charlotte Reyes", email: "c.reyes@example.com", phone: "+1 310 555 0199", service: "Architectural Design", location: "Santa Barbara, CA", budget: "$5M – $15M", message: "We have acquired a coastal lot and are seeking a principal-led design team for a family residence.", status: "New", date: "2025-01-14" },
  { id: "i2", name: "Hiroshi Tanaka", email: "h.tanaka@example.com", phone: "+81 90 5550 2231", service: "Interior Design", location: "Kyoto, Japan", budget: "$1M – $5M", message: "Interior curation for a completed villa. Interested in the material library service.", status: "In Review", date: "2025-01-11" },
  { id: "i3", name: "Evelyn Grant", email: "e.grant@example.com", phone: "+44 20 5550 8842", service: "Property Consultation", location: "London, UK", budget: "Above $15M", message: "Buy-side advisory for a listed Georgian residence, discreet mandate.", status: "Contacted", date: "2025-01-08" },
  { id: "i4", name: "Miguel Santos", email: "m.santos@example.com", phone: "+1 305 555 0127", service: "Real Estate Development", location: "Miami, FL", budget: "$5M – $15M", message: "Exploring a JV on a small-batch waterfront development, 8–12 units.", status: "New", date: "2025-01-05" },
  { id: "i5", name: "Laura Beckmann", email: "l.beckmann@example.com", phone: "+49 30 5550 6612", service: "Renovation & Remodeling", location: "Berlin, Germany", budget: "$500K – $1M", message: "1902 Stadtvilla renovation, heritage protected facade.", status: "Closed", date: "2024-12-29" },
];