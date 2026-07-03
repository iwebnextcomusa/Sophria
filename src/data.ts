import { Service, Project, Testimonial, FAQItem } from "./types";

export const SERVICES: Service[] = [
  {
    id: "hardwood",
    title: "Hardwood Flooring",
    category: "hardwood",
    shortDescription: "Timeless elegance with premium solid and engineered pre-finished hardwood options.",
    fullDescription: "Nothing compares to the authentic warmth, luxury, and lifelong durability of professional solid hardwood flooring. Our craftsmen handle everything from subfloor preparation to the meticulous layout of hand-selected planks, ensuring a perfectly flat, flush, and squeak-free installation. Solid hardwood adds significant equity to your property and can be sanded and refinished multiple times to adapt to evolving design trends.",
    benefits: [
      "Increases long-term property resale value",
      "Can be sanded and refinished multiple times",
      "Hypoallergenic and exceptionally easy to clean",
      "Timeless organic warmth and custom stain possibilities"
    ],
    process: [
      "Acclimation: We store the wood inside your home for 72+ hours to stabilize moisture levels.",
      "Subfloor Preparation: Sanding, leveling, and securing your subfloor to guarantee a squeak-free foundation.",
      "Underlayment Installation: Laying down high-grade vapor and acoustic barriers.",
      "Plank Layout & Nailing: Artful staggering of joints, blind-nailing with professional pneumatic systems.",
      "Finishing Touches: Installation of coordinating shoe moldings, transition strips, and detailed trim."
    ],
    idealApplications: ["Living Rooms", "Bedrooms", "Dining Rooms", "Home Offices", "Main Floor Hallways"],
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lvp",
    title: "Luxury Vinyl Plank (LVP)",
    category: "vinyl",
    shortDescription: "100% waterproof, high-performance flooring with gorgeous, realistic wood grain textures.",
    fullDescription: "Luxury Vinyl Plank (LVP) is the ultimate solution for active households, offering beautiful wood aesthetics with the absolute strength of composite materials. Highly resistant to water, pet scratches, dents, and heavy impact, our LVP installations feature realistic embossed-in-register (EIR) wood textures. It is perfect for moisture-prone areas like basements, bathrooms, and high-traffic kitchens.",
    benefits: [
      "100% waterproof - will not expand, buckle, or warp",
      "Maximum scratch, stain, and dent resistance",
      "Soft and comfortable underfoot compared to tile",
      "Outstanding acoustic dampening with integrated cork or foam backing"
    ],
    process: [
      "Moisture Assessment: Testing concrete subfloors for moisture vapor emission rates.",
      "Precision Leveling: Grind down high points and fill low valleys with premium self-leveling underlayment.",
      "Floating Layout: Planning expansion gaps and click-locking planks with expert alignment.",
      "Seamless Transition: Connecting seamlessly with existing tile or stairs using bespoke threshold adapters."
    ],
    idealApplications: ["Basements", "Kitchens", "Bathrooms", "Mudrooms", "High-Traffic Corridors", "Pet-Owner Residences"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "laminate",
    title: "Laminate Flooring",
    category: "laminate",
    shortDescription: "Cost-effective, highly durable flooring with modern, authentic wood grain designs.",
    fullDescription: "Our premium laminate flooring solutions offer an incredible balance of affordability and supreme durability. Constructed with high-density fiberboard and a tough aluminum-oxide wear layer, modern laminate replicates premium wood species with incredible accuracy. It is highly resistant to fading under UV light, making it a stellar choice for bright, sunny spaces.",
    benefits: [
      "Budget-friendly alternative to hardwood",
      "Outstanding wear and scratch resistance",
      "Highly resistant to fading from sunlight (UV rays)",
      "Vapor-barrier options make it suitable for radiant floor heating systems"
    ],
    process: [
      "Site Prep: Cleaning, vacuuming, and testing subfloor flatness.",
      "Sound Barrier: Laying dense underlayment to eliminate the 'hollow' sound often associated with laminate.",
      "Staggered Expansion Setup: Implementing expansion joints and precise click-lock layout."
    ],
    idealApplications: ["Sunrooms", "Bedrooms", "Rental Properties", "Playrooms", "Condos and Apartments"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "engineered",
    title: "Engineered Hardwood",
    category: "hardwood",
    shortDescription: "Real hardwood beauty built with an ultra-stable, multi-layered core structure.",
    fullDescription: "Engineered hardwood delivers the exact look and touch of solid hardwood but is engineered with a stable multi-ply core that minimizes natural wood expansion and contraction. This makes it highly resistant to humidity fluctuations, allowing you to install authentic real wood directly over concrete slabs, in basements, or over radiant heating systems where solid hardwood would fail.",
    benefits: [
      "Excellent dimensional stability against heat and humidity",
      "Features a real premium hardwood veneer top wear layer",
      "Suitable for installation directly over concrete and radiant heating",
      "Can be glued, nailed, or floated depending on subfloor requirements"
    ],
    process: [
      "Relative Humidity Testing: Analyzing environment climate conditions.",
      "Core Selection: Matching ply density with your specific subfloor.",
      "Gluing or Nailing: Applying specialized low-VOC adhesives or precision cleats for perfect adhesion."
    ],
    idealApplications: ["Condominiums", "Concrete Slabs", "Over Radiant Heating", "Basements", "Main Floors"],
    imageUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tile",
    title: "Tile Installation",
    category: "tile",
    shortDescription: "Custom ceramic, porcelain, and natural stone tile for kitchens, baths, and backsplashes.",
    fullDescription: "A gorgeous tile installation provides incredible durability, water protection, and elevated architectural design. We install high-end porcelain, ceramic, marble, slate, and glass tiles with flawless precision. Our process focuses heavily on proper waterproofing membranes (Schluter systems) and level-plane layouts to guarantee no lippage or grout cracking.",
    benefits: [
      "Impervious to water, steam, and staining",
      "Vast array of shapes, colors, patterns, and stone finishes",
      "Excellent lifetime durability with minimal maintenance",
      "Ideal for heating cable systems for cozy warm floors"
    ],
    process: [
      "Substrate Reinforcement: Installation of cement boards or anti-fracture membranes (Schluter-DITRA).",
      "Grid Planning: Laser-level alignment and symmetrical planning to avoid thin slivers at borders.",
      "Thin-set & Leveling Clips: Utilizing mechanical leveling clips to achieve absolute zero-lippage.",
      "Grouting & Sealing: Applying premium stain-resistant epoxy or polymer grout, followed by sealer."
    ],
    idealApplications: ["Showers & Bathrooms", "Kitchen Floors & Backsplashes", "Foyers", "Laundry Rooms", "Fireplace Surrounds"],
    imageUrl: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "stairs",
    title: "Stair Refinishing & Custom Stairs",
    category: "other",
    shortDescription: "Complete transformation of worn stairs with custom treads, custom stains, and modern railings.",
    fullDescription: "Your staircase is often the architectural focal point of your home. We specialize in updating worn, carpeted stairs into beautiful hardwood highlights. From capping old pine stairs with solid oak treads to sanding, staining, and finishing existing staircases to match your new hardwood flooring perfectly, our masters deliver outstanding craftsmanship. We also install modern metal or wood balusters and custom handrails.",
    benefits: [
      "Creates a jaw-dropping architectural centerpiece",
      "Perfect color-matching to your new hardwood floors",
      "Eliminates worn, dusty stair carpet for easy maintenance",
      "Option to upgrade to modern metal balusters and contemporary posts"
    ],
    process: [
      "Sanding: Heavy sanding to bare wood using dust-extracted machinery.",
      "Staining: Custom hands-on sample matching to achieve the perfect tone.",
      "Topcoating: Multiple layers of heavy-traffic polyurethane finish (matte, satin, or semi-gloss).",
      "Rebuilding: Option to replace stringers, caps, posts, or balusters."
    ],
    idealApplications: ["Main Staircases", "Split-level Stairs", "Railing Upgrades", "Carpet-to-Wood conversions"],
    imageUrl: "https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "repair",
    title: "Floor Repair & Restoration",
    category: "repair",
    shortDescription: "Squeak removal, scratch treatment, water damage board replacements, and custom patching.",
    fullDescription: "Don't replace your entire floor if only a section is damaged. Sophria specializes in detailed spot repairs, board replacements, scratch remediation, and fixing underlying structural floor issues. We can surgically remove water-damaged hardwood or buckled planks, replace them with matching species, and blend the finishes so the repair is completely undetectable.",
    benefits: [
      "Cost-saving alternative to complete flooring replacement",
      "Saves beautiful, historic wood structures from being discarded",
      "Eliminates annoying, loud floor squeaks and creaks permanently",
      "Secures loose planks and removes hazardous trip-points"
    ],
    process: [
      "Inspection: Identifying the structural root cause (e.g., loose joists, water leakage, settling).",
      "Surgical Removal: Careful removal of damaged planks without affecting bordering floors.",
      "Subfloor Anchoring: Reinforcing subfloor fasteners to quiet squeaking.",
      "Seamless Integration: Sourcing identical wood grain, custom shaping, and precise blend finishing."
    ],
    idealApplications: ["Water-Damaged Areas", "Squeaking Living Rooms", "Dented Entryways", "Post-renovation patching"],
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "removal",
    title: "Floor Removal & Dustless Prep",
    category: "repair",
    shortDescription: "Clean, fast, dust-controlled removal of old carpet, hardwood, tile, and sheet flooring.",
    fullDescription: "Proper installation starts with clean, damage-free removal of your old floor. Sophria uses dust-controlled equipment to tear up old carpeting, nail-ridden hardwood, deep-set ceramic tiles, or stubborn glue-down vinyl. We focus heavily on protecting your walls, cabinets, and air quality, leaving the subfloor perfectly clean and ready for your new investment.",
    benefits: [
      "Minimizes airborne silica and dust in your living environment",
      "Saves you hours of back-breaking labor",
      "Protects walls, trim, and baseboards from damage during demolition",
      "Complete, professional disposal of all waste materials included"
    ],
    process: [
      "Area Containment: Laying plastic protective zip-walls and setting up HEPA air scrubbers.",
      "Surgical Demolition: Utilizing pneumatic scrapers and specialized tools to uplift old material.",
      "Fastener Extraction: Pulling every remaining nail, staple, cleat, or tack-strip.",
      "Adhesive Grinding: Scraping or grinding old thinset and glue to achieve a flat subfloor."
    ],
    idealApplications: ["Pre-Installation Phase", "Allergy-Sensitive Homes", "Thinset-Heavy Tile Removals"],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "commercial",
    title: "Commercial Flooring",
    category: "commercial",
    shortDescription: "Durable, slip-resistant, and high-performance floors for retail, offices, and institutions.",
    fullDescription: "Commercial floors must withstand heavy foot traffic, rolling loads, and rigorous cleaning while maintaining a professional design. Sophria offers specialized commercial vinyl sheet, safety safety-slip tile, high-end commercial carpets, and durable wood laminates. We coordinate around your operational hours to minimize downtime, working nights or weekends if necessary.",
    benefits: [
      "Ultra-durable wear layers designed for heavy-duty commercial loads",
      "Meets strict fire, building code, and ADA slip-resistance requirements",
      "Quiet acoustics and comfortable underfoot for standing staff",
      "Fast, flexible scheduling (after-hours/weekends) to minimize business disruption"
    ],
    process: [
      "Project Coordination: Detailed site logistics to match business operations.",
      "Subfloor Leveling: Self-leveling concrete application to support heavy industrial standards.",
      "Adhesive Application: High-performance pressure-sensitive adhesives.",
      "Heat Welding: Heat-welding seams for sheet vinyl to prevent water penetration and bacterial growth."
    ],
    idealApplications: ["Corporate Offices", "Retail Stores & Boutiques", "Medical Clinics", "Gyms & Fitness Centers", "Schools & Daycares"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "residential",
    title: "Residential Flooring Solutions",
    category: "other",
    shortDescription: "Premium whole-home flooring transformations tailored to your style, budget, and family needs.",
    fullDescription: "From modern open-concept main levels to cozy basement renovations and luxurious master bedroom updates, our residential flooring services combine ultimate visual design with practical durability. We walk you through material selections, texture, underlayment options, and trim matching, delivering a custom solution that elevates your home's aesthetic and value.",
    benefits: [
      "Tailored styling to complement your home's specific interior architecture",
      "Child-safe and pet-friendly low-VOC material choices",
      "Detailed visual trim matching (baseboards, transitions, vents)",
      "Unmatched local installation warranty for absolute peace of mind"
    ],
    process: [
      "Consultation: In-home measurement and review of lifestyle needs.",
      "Sourcing: Bringing samples directly to your lighting conditions.",
      "Comprehensive Install: Fast, clean, and highly organized daily cleanup."
    ],
    idealApplications: ["Whole Home Upgrades", "New Custom Builds", "Kitchen & Bath remodels", "Basement conversions"],
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "custom",
    title: "Custom Pattern Flooring & Inlays",
    category: "other",
    shortDescription: "Artistic herringbone, chevron, geometric borders, and custom stained finishes.",
    fullDescription: "Make a striking statement with custom pattern installations. Herringbone, Chevron, custom wood borders, and detailed tile patterns can elevate an ordinary entryway or dining room into an extraordinary luxury showpiece. Our elite carpenters possess the mathematical precision and patient craftsmanship required to execute these complex patterns flawlessly.",
    benefits: [
      "Provides a truly unique, highly luxurious focal point",
      "Elevates your property into a bespoke architectural showcase",
      "Bespoke wood borders can outline dining or seating zones naturally",
      "Expert alignment ensures geometric perfection across multiple rooms"
    ],
    process: [
      "Geometric Design: Creating detailed CAD blueprints of pattern scales.",
      "Laser Guide Alignment: Snapping multiple intersecting gridlines to ensure perfect symmetry.",
      "Precision Milling: Custom cutting of every single intersecting board with exact tolerances.",
      "Specialized Glue-Down: Double-fastened adhesion to ensure zero board shifting over the lifetime."
    ],
    idealApplications: ["Main Foyers", "Formal Dining Rooms", "Feature Halls", "Master Suites"],
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Custom Oak Herringbone Living Room",
    category: "Hardwood",
    description: "Sanded, installed, and custom-stained white oak herringbone pattern hardwood across a sprawling open-concept living room in Ancaster.",
    beforeUrl: "https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=800&q=80",
    afterUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    location: "Ancaster, ON"
  },
  {
    id: "p2",
    title: "Premium Waterproof LVP Kitchen & Main Floor",
    category: "LVP",
    description: "Replaced damaged sheet vinyl and old tile with luxurious, wide-plank waterproof luxury vinyl plank across the kitchen, laundry room, and foyer.",
    beforeUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80",
    afterUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    location: "Hamilton Mountain, ON"
  },
  {
    id: "p3",
    title: "Elegant Oak Staircase Conversion",
    category: "Stairs",
    description: "Uplifted 25-year-old stained green carpet from a main entry staircase and capped it with solid red oak treads, custom-stained to match new main level flooring.",
    beforeUrl: "https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=800&q=80&blur=10",
    afterUrl: "https://images.unsplash.com/photo-1562663474-6cbb3fee4c77?auto=format&fit=crop&w=800&q=80",
    location: "Mississauga, ON"
  },
  {
    id: "p4",
    title: "Master Ensuite Large-Format Porcelain Tile",
    category: "Tile",
    description: "Full subfloor prep using Schluter-Ditra membrane, followed by seamless installation of 24x48 modern marble-look porcelain tile with leveling clips.",
    beforeUrl: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80&blur=10",
    afterUrl: "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80",
    location: "Oakville, ON"
  },
  {
    id: "p5",
    title: "Commercial Office Lounge Carpet Tiles",
    category: "Commercial",
    description: "Overnight installation of high-performance acoustic carpet tiles in an upscale corporate lounge to minimize business disruption.",
    beforeUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80&blur=8",
    afterUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    location: "Burlington, ON"
  },
  {
    id: "p6",
    title: "Basement Level Modern Wood Laminate",
    category: "Laminate",
    description: "Full concrete grind, moisture barrier install, and laying high-density wood-look laminate flooring with warm gold undertones.",
    beforeUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80&blur=12",
    afterUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    location: "Stoney Creek, ON"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Arthur Pendelton",
    rating: 5,
    review: "Sophria did an outstanding job transforming our old, carpeted main level into beautiful, seamless engineered hardwood. Mansoor was extremely thorough with the initial estimate, and the installation team was incredibly respectful, clean, and completed the job exactly on schedule. The white oak herringbone foyer is a work of art! Highly recommend them for anyone in the Hamilton area.",
    projectType: "Engineered Hardwood & Custom Pattern Foyer",
    location: "Ancaster, ON",
    date: "May 2026"
  },
  {
    id: "t2",
    name: "Sarah Jenkins",
    rating: 5,
    review: "We are absolutely in love with our new LVP flooring! We have three dogs and two young kids, so waterproof durability was our main goal. Sophria guided us to a beautiful grey oak LVP that looks identical to real wood but is completely indestructible. Outstanding craftsmanship on the stair refinishing as well. They custom stained the stair caps to match the LVP perfectly.",
    projectType: "LVP Installation & Stair Refinishing",
    location: "Hamilton Mountain, ON",
    date: "April 2026"
  },
  {
    id: "t3",
    name: "Dr. Marcus Vance",
    rating: 5,
    review: "Highly professional service. We contracted Sophria to replace the vinyl tile across our dental clinic in Burlington. They worked over the weekend to ensure our clinic wasn't closed during patient hours. The sheet vinyl heat-welded seams are flawless, meeting our hygiene standards perfectly. Outstanding communication throughout the process.",
    projectType: "Commercial Specialty Sheet Vinyl",
    location: "Burlington, ON",
    date: "June 2026"
  },
  {
    id: "t4",
    name: "Elena Rostova",
    rating: 5,
    review: "I had a great experience with Mansoor and his crew. They removed our cracked old kitchen tile and replaced it with elegant porcelain slabs. No lippage at all—the floor is perfectly flat, and the grout lines are razor-thin. They were prompt, cleaned up at the end of every single day, and finished a day earlier than quoted. Will definitely hire them again for our upstairs hardwood.",
    projectType: "Kitchen Porcelain Tile Installation",
    location: "Oakville, ON",
    date: "March 2026"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    question: "How long does a typical flooring installation take?",
    answer: "For most residential projects (e.g., 1,000 square feet of hardwood, laminate, or LVP), the installation takes between 2 to 4 days. This includes subfloor preparation and transitions. Stair refinishing or custom tile installations can take an additional 2-3 days due to curing times and complex custom-cutting requirements. We always provide a detailed timeline prior to starting.",
    category: "process"
  },
  {
    id: "f2",
    question: "Do you offer free estimates, and how does the process work?",
    answer: "Yes, we offer 100% free, no-obligation estimates for homeowners and businesses in Hamilton and surrounding areas. You can request an estimate online through our contact form, chat with our AI assistant, or call (437) 605-4750. We will schedule a convenient time to visit your site, measure the spaces, review physical material samples, and provide a detailed written proposal within 24 hours.",
    category: "pricing"
  },
  {
    id: "f3",
    question: "Why should I choose Luxury Vinyl Plank (LVP) over traditional hardwood?",
    answer: "LVP is 100% waterproof, highly scratch-resistant, dent-proof, and budget-friendly, making it a stellar choice for active homes with pets, young children, or moisture-prone areas like basements and bathrooms. Traditional hardwood, while adding high resale value and authentic luxury, can warp under moisture and scratch more easily. LVP offers the look of wood with absolute maintenance peace-of-mind.",
    category: "materials"
  },
  {
    id: "f4",
    question: "What is your warranty coverage on flooring installations?",
    answer: "At Sophria, we stand firmly behind our premium craftsmanship. We offer a 3-Year Lifetime Craftsmanship Warranty on all installations, which covers any structural issues, loose boards, grout cracks, or transition separations. Additionally, the premium materials we source come with extensive manufacturer wear-and-tear warranties ranging from 25 years to limited-lifetime coverage.",
    category: "warranty"
  },
  {
    id: "f5",
    question: "Do I need to acclimate my hardwood flooring before installation?",
    answer: "Yes. Solid hardwood and engineered hardwood must acclimate inside the service environment for at least 72 hours (sometimes up to a week for solid hardwood) before installation. This allows the wood to adapt to your home's relative humidity and temperature, preventing boards from expanding, shrinking, or gapping after they are nailed down.",
    category: "process"
  }
];

export const SERVICE_AREAS = [
  "Hamilton",
  "Burlington",
  "Oakville",
  "Mississauga",
  "Brampton",
  "Milton",
  "Ancaster",
  "Dundas",
  "Stoney Creek",
  "Grimsby",
  "Niagara Region"
];
