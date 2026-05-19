export const COMPANY = {
  name: "Accu-Fab",
  /** Sitewide description: hero intro, footer, Open Graph defaults */
  tagline:
    "At our locally owned shop in Milan, New Mexico, no job is too small. With CNC and manual machining equipment, precision welding, hydraulic repair, and custom fabrication capabilities, Accu-Fab serves the Four Corners region and Texas as your go-to partner.",
  /** Short positioning line for hero badges & footer accents */
  shortTagline:
    "Precision Welding • CNC and Manual Machining • Four Corners + Texas",
  phone: "(505) 876-0658",
  phoneHref: "tel:+15058760658",
  email: "Accufab.weld@gmail.com",
  emailHref: "mailto:Accufab.weld@gmail.com",
  address: "Milan, New Mexico",
} as const;

/** Top-level navigation — routed section pages */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Contact / Quote" },
] as const;

/** Links shown in the Explore Services / mobile navigation menu */
export const EXPLORE_SERVICE_LINKS = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export const VALUES = [
  {
    title: "Integrity",
    description: "We do what we say — transparent partnerships built on trust.",
  },
  {
    title: "Accountability",
    description: "Every project owner, every deadline, every quality standard.",
  },
  {
    title: "Ingenuity",
    description:
      "Hands-on engineering and practical manufacturing solutions that solve tough weld and machining challenges.",
  },
  {
    title: "Quality",
    description: "Class A finishing and precision tolerances, every time.",
  },
  {
    title: "Passion",
    description: "Craftsmanship and pride in American manufacturing excellence.",
  },
  {
    title: "Collaboration",
    description: "Extension of your team from concept through production.",
  },
] as const;

export const STRENGTHS = [
  {
    title: "Made in USA",
    description:
      "Domestic fabrication with accountable weld procedures, machining discipline, and transparent program ownership.",
    icon: "flag",
  },
  {
    title: "Welding & Machining Depth",
    description:
      "Certified weld processes (MIG/TIG), fixture-supported assemblies, and CNC plus manual machining matched to repair, fit-up, and print-critical features.",
    icon: "flame",
  },
  {
    title: "Fabrication Finish Quality",
    description:
      "Powder coat, wet paint, silk screen, and hardware-ready assemblies built for OEM cosmetics and fit-up.",
    icon: "sparkles",
  },
  {
    title: "Responsive Partner",
    description:
      "Fast-turn prototypes through sustained production — engineered support without losing shop-floor agility.",
    icon: "zap",
  },
] as const;

/** Homepage capabilities — welded / machined / fabricated focus */
export const HOME_CAPABILITIES = [
  {
    title: "Precision Welding",
    description:
      "MIG & TIG weld procedures with disciplined joint prep, fixture strategy, and inspection-backed structural integrity.",
    icon: "welding",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
  },
  {
    title: "CNC and Manual Machining",
    description:
      "CNC machining, manual mill and lathe work, tight tolerances, and machined interfaces integrated with weldments, drill pipe work, and fabrication.",
    icon: "machining",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
  {
    title: "Drill Pipe and Fabrication",
    description:
      "Precision blanks, punched features, brake-formed geometry, and hardware-ready assemblies built for repeatable OEM builds.",
    icon: "sheetMetal",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
  },
  {
    title: "Laser Cutting & Forming",
    description:
      "Clean-edge laser profiles paired with accurate forming — optimized nests, bend allowances, and consistent fabrication outcomes.",
    icon: "laserForming",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    title: "Finishing & Assembly",
    description:
      "Powder coat & wet finishes, silk screening, kitting, mechanical assembly, and OEM-ready packaging.",
    icon: "finishingAssembly",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    title: "Engineering & Design Support",
    description:
      "DFM feedback, prototyping, weld & machining feasibility, drawing clarification, and launch planning beside your engineers.",
    icon: "engineeringDesign",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
] as const;

/** Customer segments — weldments, machined parts & fabricated metal */
export const HOME_MARKETS = [
  {
    id: "datacenter-it",
    title: "Data Centers & IT Infrastructure",
    description:
      "Welded frames, formed panels, and machined brackets for racks, cabinets, and aisle-ready assemblies demanding cosmetic discipline.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=80",
  },
  {
    id: "power-electrical",
    title: "Power Equipment & Electrical OEMs",
    description:
      "Chassis weldments, bus-bar interfaces, formed enclosures, and hardware integrations for distribution, UPS, PDU, and industrial power gear.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80",
  },
  {
    id: "industrial-machinery",
    title: "Industrial Machinery OEMs",
    description:
      "Heavy-gauge weldments, machined pivot blocks, guarding, bases, and fabricated brackets engineered for vibration, alignment, and service access.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80",
  },
  {
    id: "commercial-contract",
    title: "Commercial Fabrication Partners",
    description:
      "Repeatable weld, drill pipe, and fabrication programs for specialty vehicle, agriculture, infrastructure, and diversified OEM portfolios needing USA sourcing.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1000&q=80",
  },
] as const;

/** Highlight metrics for Why Accu-Fab band */
export const WHY_STATS = [
  {
    value: "35+",
    label: "Years weld & fab discipline",
    hint: "Made in USA multisite footprint",
  },
  {
    value: "500K+",
    label: "Sq ft manufacturing space",
    hint: "Machining, welding & finishing under one roof",
  },
  {
    value: "99.7%",
    label: "First-pass quality yield",
    hint: "Documented weld & machining controls",
  },
  {
    value: "24/7",
    label: "Program coverage",
    hint: "Engineering tied to shop realities",
  },
] as const;

export const CAPABILITIES = [
  {
    id: "fabrication",
    title: "Metal Fabrication",
    description:
      "Laser-cut blanks, punched features, brake-formed geometry, MIG/TIG weldments, and integrated CNC and manual machining.",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80",
  },
  {
    id: "finishing",
    title: "Finishing & Assembly",
    description:
      "Powder coat & wet finishes, mechanical assembly, kitting, and OEM-ready packaging.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  },
  {
    id: "engineering",
    title: "Engineering",
    description:
      "DFM for weld joints & machined interfaces, prototyping, tooling guidance, and drawing clarification.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80",
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    description:
      "Kanban-driven releases and accountable scheduling from raw sheet & plate through weld, machine, finish, and ship.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
  },
] as const;

export const SOLUTIONS = [
  {
    id: "power",
    title: "Power Equipment",
    description:
      "Welded chassis, formed enclosures, and machined interfaces for UPS, PDU, switchgear, and distribution OEMs.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    id: "datacenter",
    title: "Data Centers",
    description:
      "Welded rack frames, formed panels, and cosmetic-critical cabinets backed by repeatable weld, drill pipe, and fabrication disciplines.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: "stainless",
    title: "Stainless Fabrication",
    description:
      "TIG welding and sanitary finishes for medical, food-grade, and corrosion-critical fabricated assemblies.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    id: "outdoor",
    title: "Outdoor / Structural Cabinets",
    description:
      "Heavy-gauge weldments and formed skins engineered for harsh-service enclosures and infrastructure OEMs.",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&q=80",
  },
  {
    id: "assembly",
    title: "Machined & Welded Subassemblies",
    description:
      "Machined weldment prep, bracket integration, hardware install, and tested builds ready for your final line.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
] as const;

export const LEADERSHIP = [
  {
    name: "Michael Chen",
    role: "Chief Executive Officer",
    bio: "30+ years leading precision manufacturing operations across North America.",
  },
  {
    name: "Sarah Mitchell",
    role: "VP of Operations",
    bio: "Expert in lean fabrication operations, weld throughput, machining flow, and multisite scaling.",
  },
  {
    name: "David Torres",
    role: "Director of Engineering",
    bio: "Mechanical engineering leader specializing in DFM and OEM partnerships.",
  },
  {
    name: "Jennifer Walsh",
    role: "VP of Sales & Business Development",
    bio: "Building long-term relationships with technology-driven OEM customers.",
  },
] as const;

export const PROJECTS = [
  {
    title: "Welded Rack Frames & CNC Brackets",
    client: "Hyperscale Data Center OEM",
    description:
      "Structural MIG weldments plus machined bracketry and alignment features for aisle-ready rack assemblies.",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80",
    tags: ["MIG Welding", "CNC and Manual Machining", "Fabrication"],
  },
  {
    title: "Laser-Cut PDU Chassis Weldments",
    client: "Power Distribution OEM",
    description:
      "Laser-profiled blanks, precision forming, and TIG-critical seams on PDU housings built for thermal and EMI discipline.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80",
    tags: ["Laser Cutting", "TIG Welding", "Forming"],
  },
  {
    title: "Industrial Guarding Weldments",
    client: "Machinery OEM",
    description:
      "Formed sheet, fixture-controlled MIG welding, and machined hinge mounts for heavy-equipment guarding packages.",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80",
    tags: ["Drill Pipe and Fabrication", "MIG Welding", "Machining"],
  },
  {
    title: "Precision Fabrication Skids",
    client: "Industrial Contract Partner",
    description:
      "Brake-formed pans, stitch and seam welds, and powder-coated structural skids sized for vibration-isolated payloads.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
    tags: ["Fabrication", "Welding", "Finishing"],
  },
  {
    title: "Stainless TIG Enclosures",
    client: "Medical Technology OEM",
    description:
      "Sanitary-profile blanks, controlled TIG sequencing, and blended cosmetic welds on instrument-grade housings.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80",
    tags: ["TIG Welding", "Stainless", "Cosmetics"],
  },
  {
    title: "Heavy Plate Base Weldments",
    client: "Capital Equipment OEM",
    description:
      "Thick-plate weld prep, multi-pass weldments, and CNC plus manual machining of mounting pads tied to assembly-level tolerances.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80",
    tags: ["Heavy Weldments", "CNC and Manual Machining", "Alignment"],
  },
] as const;

export const FOOTER_LINKS = {
  /** Primary site navigation echoed in footer */
  navigate: [
    { href: "/about", label: "About" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/quote", label: "Contact / Quote" },
  ],
  resources: [
    { href: "/careers", label: "Careers" },
    { href: "/policies", label: "Policies" },
    { href: "/news", label: "News" },
  ],
} as const;
