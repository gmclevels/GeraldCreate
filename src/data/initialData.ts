import { PortfolioConfig } from '../types.ts';

export const INITIAL_CONFIG: PortfolioConfig = {
  profile: {
    name: "Gerald Uzor",
    brandName: "Gerald Creates",
    role: "Nigerian Entrepreneur & Digital Creator",
    location: "Nigeria (Lagos • Awka/Anambra • Abuja & Nationwide Delivery)",
    headline: "Ideas, Skills and Projects That Create Value",
    shortIntro: "Connecting physical structural excellence with modern digital systems. From decorative stamped concrete and luxury 3D metallic epoxy installations to verified real estate facilitation and high-utility AI toolkits.",
    email: "geraldcreates@example.com",
    phone: "+234 800 000 0000",
    whatsapp: "2348000000000",
    twitter: "https://twitter.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    aboutBio: `I am Gerald Uzor, a Nigerian multidisciplinary entrepreneur focused on high-integrity physical execution and strategic digital commerce.

My work bridges two vital worlds: the physical craftsmanship of building construction, engineering, master decorative stamped concrete, and luxury 3D metallic epoxy flooring installations, alongside the rapid leverage of digital assets, real estate consulting through Gerald's Property Hub, and practical toolkits like the AI Income Starter Kit.

I operate on three simple tenets:
1. Complete transparency — no inflated claims or artificial reviews.
2. Enduring structural quality — using tested mix designs, industrial epoxy resins, and proven pigments.
3. Accessible innovation — demystifying generative AI and digital workflows so professionals can generate sustainable value.`
  },
  services: [
    {
      id: "serv-const",
      title: "Construction, Stamped Concrete & 3D Epoxy",
      category: "construction",
      summary: "End-to-end residential construction, heavy-duty decorative stamped concrete compounds, and seamless luxury 3D metallic epoxy floorings for modern interiors.",
      icon: "hammer",
      points: [
        "Luxury 3D metallic epoxy & optical illusion floors for living rooms, penthouses, and commercial lounges",
        "Heavy-duty decorative stamped concrete with custom Italian slate, ashlar & cobble patterns",
        "Self-leveling crystal resin coatings with scratch-resistant, anti-stain polyaspartic topcoats",
        "Residential duplex construction supervision, foundation casting, and carcass framing",
        "Restoration and non-slip resealing for weathered stamped pavements and aged floors"
      ]
    },
    {
      id: "serv-prop",
      title: "Gerald's Property Hub",
      category: "property",
      summary: "Verified real estate brokerage assisting clients and diaspora investors with title-certified virgin land, residential duplexes, and prime rentals.",
      icon: "building-2",
      points: [
        "Direct land acquisitions with verified C of O, Governor's Consent, or registered gazette",
        "Vetted residential duplexes, terraces, and investment apartments for sale",
        "On-ground video inspections, boundary beacon validation, and legal due diligence",
        "Strategic rental placements for corporate executives and private tenants"
      ]
    },
    {
      id: "serv-digital",
      title: "AI & Digital Product Solutions",
      category: "digital",
      summary: "Strategic digital toolkits, automation blueprints, and educational frameworks designed to monetize modern Artificial Intelligence workflows.",
      icon: "cpu",
      points: [
        "The AI Income Starter Kit: actionable prompt suites and monetization playbooks",
        "Digital product architecture, Notion workspace setups, and automation workflows",
        "Consulting for Nigerian creators and businesses adopting generative AI tools",
        "No-code rapid deployment advisory for service businesses and personal brands"
      ]
    }
  ],
  properties: [
    {
      id: "prop-1",
      title: "Dry Table Commercial & Residential Land Plots",
      type: "land",
      location: "Strategic Growth Corridor, Epe / Ibeju-Lekki Axis, Lagos State",
      priceNote: "Inquire for Current Plot Acreage Rates",
      titleDocument: "Registered Survey & Freehold Gazette",
      isSample: true,
      description: "100% dry topography plot located within rapidly urbanizing commercial node. Ideal for buy-and-hold capital appreciation, private estate clusters, or commercial warehousing.",
      features: [
        "Dry ground requiring zero reclamation",
        "Instant deed allocation upon verification",
        "Direct access road connectivity",
        "Perimeter survey beacons confirmed"
      ]
    },
    {
      id: "prop-2",
      title: "Modern 4-Bedroom Semi-Detached Duplex with BQ",
      type: "sale",
      location: "Secure Gated Enclave, Lekki Scheme 2 / Ajah, Lagos State",
      priceNote: "Guide Price Upon Private Request",
      titleDocument: "Governor's Consent",
      isSample: true,
      description: "Contemporary duplex featuring high ceilings, stamped concrete parking bay for 4 vehicles, en-suite bedrooms, fitted kitchen with heat extractor, and 24/7 guarded security.",
      features: [
        "Decorative stamped concrete private compound",
        "Solar inverter prep wiring & industrial borehole",
        "Modern fitted cabinets & walk-in showers",
        "Family lounge with balcony view"
      ]
    },
    {
      id: "prop-3",
      title: "Executive 2-Bedroom Serviced Apartment",
      type: "rental",
      location: "Prime Residential District, Awka / Anambra State",
      priceNote: "Annual Rental Package",
      titleDocument: "Verified Tenancy Agreement",
      isSample: true,
      description: "Immaculately finished executive apartment in a peaceful, secure compound. Features stamped concrete driveway, dedicated power backup connection, and water filtration system.",
      features: [
        "Pre-paid metering & dedicated security post",
        "High-grade stamped concrete access driveway",
        "POP ceiling works with ambient recessed lighting",
        "Ample parking space per tenant"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Textured Italian Slate Stamped Concrete Compound",
      category: "construction",
      isSample: true,
      status: "Showcase Project [Sample]",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
      description: "Artisanal dual-color stamped concrete installation covering 380 sqm. Engineered with 12mm BRC wire mesh reinforcement, high-strength grade 30 concrete, charcoal antiquing release powder, and twin coats of solvent-based acrylic sealer.",
      meta: "380 sqm • Italian Slate Pattern • Solvent UV Sealer",
      linkText: "Request Stamping Estimate",
      highlights: [
        "Zero weed growth compared to regular paving blocks",
        "Slip-resistant matte-satin finish",
        "Integrated slope drains for rain runoff"
      ]
    },
    {
      id: "proj-epoxy",
      title: "Luxury 3D Metallic Marble Epoxy Flooring",
      category: "construction",
      isSample: true,
      status: "Showcase Project [Sample]",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80",
      description: "Seamless multi-coat 3D metallic epoxy floor installed for an executive penthouse lounge. Crafted with self-leveling crystal resin, pearlescent liquid gold marble swirls, and twin ultra-clear polyaspartic coats delivering mirror-depth luster and stain immunity.",
      meta: "220 sqm • Liquid Gold & Midnight Marble • 100% Seamless",
      linkText: "Request 3D Epoxy Quote",
      highlights: [
        "100% joint-free, hygienic, and non-porous surface",
        "Deep 3D optical refraction with metallic gold pigments",
        "Heavy impact, chemical, and scratch-resistant protective clearcoat"
      ]
    },
    {
      id: "proj-2",
      title: "The AI Income Starter Kit",
      category: "digital",
      isSample: false,
      status: "Flagship Digital Product",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
      description: "A comprehensive digital curriculum and prompt system engineered by Gerald Uzor. Empowers freelancers, writers, and digital creators with battle-tested workflows to deliver high-value client work in record time.",
      meta: "Digital Curriculum • 250+ Prompts • Automation Guides",
      linkText: "Get Instant Access",
      highlights: [
        "Prompt engineering for client copywriting & proposals",
        "Digital micro-product creation blueprints",
        "Lifetime access to future curriculum updates"
      ]
    },
    {
      id: "proj-3",
      title: "Gerald's Property Hub: Greenfield Estate Plots",
      category: "property",
      isSample: true,
      status: "Inspection Open [Sample]",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
      description: "Carefully vetted land investment opportunity in an emerging tech and commercial corridor. Each plot includes full survey validation, physical beacon inspections, and transparent legal documentation.",
      meta: "600 sqm Standard Plots • Dry Topography",
      linkText: "Book Physical Inspection",
      highlights: [
        "Clear institutional title documentation",
        "High appreciation potential within 24-36 months",
        "Flexible installment acquisition options"
      ]
    },
    {
      id: "proj-4",
      title: "Contemporary Villa Carcass & Structural Works",
      category: "construction",
      isSample: true,
      status: "Engineering Site [Sample]",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb1861571?auto=format&fit=crop&w=1000&q=80",
      description: "Full structural carcass management including deep raft foundation, reinforced column-beam framing, damp proofing membrane, and parapet concrete casting.",
      meta: "Structural Engineering • Raft Foundation",
      linkText: "Discuss Building Project",
      highlights: [
        "Strict batching test for cement-aggregate ratios",
        "Rigorous quality control on high-tensile steel rebars",
        "Transparent Bill of Quantities (BOQ)"
      ]
    },
    {
      id: "proj-5",
      title: "Executive 4-Bedroom Terrace Duplex",
      category: "property",
      isSample: true,
      status: "For Sale [Sample]",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "A tastefully delivered modern residential home with private stamped concrete driveway, fitted kitchen cabinetry, en-suite bedrooms, and dedicated facility security.",
      meta: "Lekki Axis • Governor's Consent",
      linkText: "Inquire Property Details",
      highlights: [
        "Gated access with armed security",
        "Dedicated stamped driveway and car port",
        "Excellent rental yield for property investors"
      ]
    },
    {
      id: "proj-6",
      title: "Creator AI Prompt & Automation Vault",
      category: "digital",
      isSample: true,
      status: "Digital Suite [Sample]",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      description: "Curated collection of Notion templates, AI prompt matrices, and automated lead capture funnels designed for independent creative entrepreneurs.",
      meta: "Notion System • Zapier / Make Blueprints",
      linkText: "Explore Digital Suite",
      highlights: [
        "Plug-and-play Notion business operating system",
        "Automated client inquiry intake templates",
        "Content calendar generation prompt chains"
      ]
    }
  ]
};
