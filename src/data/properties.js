const U = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=srgb&fm=jpg&q=85&w=${w}`;

export const PROPERTY_TYPES = ["Villa", "Penthouse", "Estate", "Townhouse", "Residence"];
export const PROPERTY_STATUSES = ["For Sale", "Off-Market", "Reserved", "New Listing"];

export const LOCATIONS = [
  "Malibu, California",
  "Aspen, Colorado",
  "Miami Beach, Florida",
  "Manhattan, New York",
  "Palm Springs, California",
  "Scottsdale, Arizona",
  "Lake Tahoe, California",
  "Austin, Texas",
  "Kona, Hawaii",
  "Brooklyn, New York",
];

export const DEFAULT_PROPERTIES = [
  {
    id: "p1", slug: "cliffline-residence", name: "Cliffline Residence",
    location: "Malibu, California", price: 18500000, beds: 6, baths: 8, area: "12,400 sq ft",
    type: "Villa", status: "For Sale", year: 2024, featured: true, added: "2024-11-02",
    images: [U("photo-1613490493576-7fde63acd811"), U("photo-1599777560450-e462cffc5368"), U("photo-1724582586529-62622e50c0b3"), U("photo-1544984243-ec57ea16fe25")],
    description: "Cantilevered above the Pacific, Cliffline Residence is a six-bedroom composition of travertine, bronze and glass that appears to grow from the headland. Awarded International Architecture Award 2024.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Cast-in-place concrete & steel", Land: "2.1 oceanfront acres", Amenities: "Infinity pool, wellness wing, cinema, guest house", Parking: "6-car gallery" },
  },
  {
    id: "p2", slug: "aspen-timber-court", name: "Timber Court Chalet",
    location: "Aspen, Colorado", price: 14200000, beds: 5, baths: 6, area: "9,800 sq ft",
    type: "Estate", status: "For Sale", year: 2023, featured: true, added: "2024-09-18",
    images: [U("photo-1599777560450-e462cffc5368"), U("photo-1613553507747-5f8d62ad5904"), U("photo-1632829882891-5047ccc421bc")],
    description: "A restrained mountain estate of reclaimed timber and local stone, oriented around a double-height hearth hall with ski-in access and long views over the Roaring Fork valley.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Reclaimed Douglas fir frame", Land: "4.5 wooded acres", Amenities: "Spa, ski prep room, wine cellar", Parking: "4-car heated" },
  },
  {
    id: "p3", slug: "skyline-penthouse-nyc", name: "The Meridian Penthouse",
    location: "Manhattan, New York", price: 22950000, beds: 4, baths: 5, area: "6,200 sq ft",
    type: "Penthouse", status: "New Listing", year: 2024, featured: true, added: "2025-01-10",
    images: [U("photo-1762732793012-8bdab3af00b4"), U("photo-1776363116182-51694a04a1d5"), U("photo-1649155913488-c72449a40625"), U("photo-1489127089760-fc5aba0d9503")],
    description: "A full-floor penthouse crowned by a sculpted bronze stair and 360° terrace. Interiors by our atelier: book-matched marble, eucalyptus millwork and a gallery-scale entry.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Steel & low-iron glazing", Floor: "Full floor, 62nd", Amenities: "Private elevator, 2,000 sq ft terrace, studio", Parking: "2 valet" },
  },
  {
    id: "p4", slug: "miami-vela-villa", name: "Vela Waterfront Villa",
    location: "Miami Beach, Florida", price: 9750000, beds: 5, baths: 6, area: "7,900 sq ft",
    type: "Villa", status: "For Sale", year: 2023, featured: false, added: "2024-08-05",
    images: [U("photo-1721815693498-cc28507c0ba2"), U("photo-1631679706909-1844bbd07221"), U("photo-1705321963943-de94bb3f0dd3")],
    description: "Stucco, teak and deep overhangs shade a house built for the tropics — 110 feet of water frontage, summer kitchen and a courtyard pool aligned to the evening breeze.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Collaboration: Studio Verde", Structure: "CMU & timber", Land: "0.7 waterfront acres", Amenities: "Dock, pool, outdoor kitchen", Parking: "3-car" },
  },
  {
    id: "p5", slug: "desert-mesa-house", name: "Mesa Horizon House",
    location: "Palm Springs, California", price: 5400000, beds: 4, baths: 4, area: "5,100 sq ft",
    type: "Residence", status: "For Sale", year: 2022, featured: false, added: "2024-06-22",
    images: [U("photo-1544984243-ec57ea16fe25"), U("photo-1558442074-3c19857bc1dc"), U("photo-1724582586529-62622e50c0b3")],
    description: "A mid-century lineage revisited: low butterfly roof, board-formed concrete walls and a swimming pool that mirrors Mount San Jacinto at dusk.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Steel frame", Land: "1.2 acres", Amenities: "Pool, casita, solar array", Parking: "2-car" },
  },
  {
    id: "p6", slug: "brooklyn-lantern-townhouse", name: "The Lantern Townhouse",
    location: "Brooklyn, New York", price: 6800000, beds: 5, baths: 4, area: "4,600 sq ft",
    type: "Townhouse", status: "Reserved", year: 2023, featured: false, added: "2024-05-14",
    images: [U("photo-1632829882891-5047ccc421bc"), U("photo-1631679706909-1844bbd07221"), U("photo-1599696848652-f0ff23bc911f")],
    description: "An 1899 brownstone rebuilt behind its protected facade — a bronze-framed skylit stair, garden level kitchen and a top-floor observatory under restored tin ceilings.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Restored masonry + steel", Land: "25 x 100 ft lot", Amenities: "Garden, roof terrace, elevator", Parking: "Street + garage option" },
  },
  {
    id: "p7", slug: "scottsdale-canyon-estate", name: "Canyon Wing Estate",
    location: "Scottsdale, Arizona", price: 7600000, beds: 5, baths: 7, area: "8,700 sq ft",
    type: "Estate", status: "For Sale", year: 2024, featured: false, added: "2024-10-01",
    images: [U("photo-1670589953882-b94c9cb380f5"), U("photo-1657366934074-2c3f452b3e24"), U("photo-1544984243-ec57ea16fe25")].map(s => s.includes("1657366934074") ? U("photo-1691425700573-5e2e6e4f6157") : s),
    description: "Two monolithic stone wings screen a desert courtyard from the canyon wind; every principal room frames the McDowell Mountains through fourteen-foot glazing.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Rammed earth & steel", Land: "3.8 desert acres", Amenities: "Spa, pool, guest wing", Parking: "5-car" },
  },
  {
    id: "p8", slug: "tahoe-shore-lodge", name: "Shoreline Lodge",
    location: "Lake Tahoe, California", price: 11900000, beds: 6, baths: 7, area: "10,200 sq ft",
    type: "Estate", status: "For Sale", year: 2022, featured: false, added: "2024-04-11",
    images: [U("photo-1613553507747-5f8d62ad5904"), U("photo-1724582586529-62622e50c0b3"), U("photo-1544984243-ec57ea16fe25")],
    description: "Granite, cedar and glass on 240 feet of private lakefront — a great hall under a 28-foot ridge beam and a bunk wing built for three generations.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Collaboration: North Studio", Structure: "Timber frame", Land: "5.6 lakefront acres", Amenities: "Boathouse, spa, ski room", Parking: "4-car" },
  },
  {
    id: "p9", slug: "austin-foundry-lofts", name: "Foundry Penthouse No. 3",
    location: "Austin, Texas", price: 3900000, beds: 3, baths: 3, area: "3,400 sq ft",
    type: "Penthouse", status: "For Sale", year: 2021, featured: false, added: "2024-03-08",
    images: [U("photo-1489127089760-fc5aba0d9503"), U("photo-1705321963943-de94bb3f0dd3"), U("photo-1599696848652-f0ff23bc911f")],
    description: "Perched atop our award-winning Foundry conversion — original riveted trusses, a 40-foot living wall and terraces over the Colorado River.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Adaptive reuse, steel truss", Floor: "Penthouse, 9th", Amenities: "Rooftop pool, concierge", Parking: "2 deeded" },
  },
  {
    id: "p10", slug: "kona-cliff-villa", name: "Kona Cliff Villa",
    location: "Kona, Hawaii", price: 13400000, beds: 5, baths: 6, area: "8,100 sq ft",
    type: "Villa", status: "Off-Market", year: 2023, featured: false, added: "2024-02-19",
    images: [U("photo-1759256243437-9c8f7238c42b"), U("photo-1599777560450-e462cffc5368"), U("photo-1632829882891-5047ccc421bc")],
    description: "Lava-rock walls and deep eaves anchor a villa 60 feet above the Pacific; every room opens to trade-wind cross-ventilation and whale-season sunsets.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Lava rock & cedar", Land: "2.9 oceanfront acres", Amenities: "Infinity pool, ohana guest house", Parking: "4-car" },
  },
  {
    id: "p11", slug: "scottsdale-garden-house", name: "Garden Pavilion House",
    location: "Scottsdale, Arizona", price: 4250000, beds: 4, baths: 5, area: "4,900 sq ft",
    type: "Residence", status: "For Sale", year: 2024, featured: false, added: "2025-01-22",
    images: [U("photo-1705321963943-de94bb3f0dd3"), U("photo-1631679706909-1844bbd07221"), U("photo-1724582586529-62622e50c0b3")],
    description: "A single-storey pavilion wrapped around a desert garden — rammed-earth walls, clerestory light and a shaded loggia for eight months of outdoor living.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Rammed earth & glulam", Land: "1.5 acres", Amenities: "Pool, studio, orchard", Parking: "3-car" },
  },
  {
    id: "p12", slug: "manhattan-park-residence", name: "Park Lane Residence",
    location: "Manhattan, New York", price: 8900000, beds: 3, baths: 4, area: "3,900 sq ft",
    type: "Residence", status: "For Sale", year: 2022, featured: false, added: "2024-07-30",
    images: [U("photo-1649155913488-c72449a40625"), U("photo-1776363116182-51694a04a1d5"), U("photo-1489127089760-fc5aba0d9503")],
    description: "Directly over the park — a herringbone oak floor runs 90 feet from a bronze-framed gallery to a loggia hung in the treetops.",
    specs: { Architecture: "Aurelia & Stone", Interior: "Aurelia Atelier", Structure: "Steel & stone", Floor: "28th floor", Amenities: "Doorman, residents' club", Parking: "1 valet" },
  },
];

export const priceLabel = (p) => "$" + p.toLocaleString("en-US");