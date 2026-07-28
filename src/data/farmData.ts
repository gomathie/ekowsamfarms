import { Product, Workshop, Division, BlogPost, GalleryItem, Testimonial } from '../types';

export const FARM_INFO = {
  name: "Ekow Sam Farms",
  tagline: "Pioneering Sustainable Commercial Agriculture & Agro-Processing in Ghana",
  foundedYear: 2018,
  founder: "Ekow Sam",
  location: "Ekow Sam Farm Estate, Gomoa East District, Central Region, Ghana",
  address: "Off Accra - Cape Coast Highway, Gomoa Potsin Junction, Central Region",
  gpsLocation: "5°23'06.7\"N 0°36'45.0\"W (GPS: CG-1234-5678)",
  phones: ["+233 (0) 24 123 4567", "+233 (0) 50 888 9900", "+233 (0) 30 299 1122"],
  emails: ["info@ekowsamfarms.com", "sales@ekowsamfarms.com", "training@ekowsamfarms.com"],
  openingHours: "Mon - Sat: 7:30 AM - 5:30 PM | Sun: Closed for Farm Rest & Sanitization",
  farmSizeAcres: 500,
  livestockCapacity: "15,000+ Birds & Small Ruminants",
  fishCapacity: "100,000+ Catfish & Tilapia",
  snailCapacity: "35,000+ Giant African Land Snails",
  socials: {
    facebook: "https://facebook.com/ekowsamfarms",
    instagram: "https://instagram.com/ekowsamfarms",
    twitter: "https://twitter.com/ekowsamfarms",
    youtube: "https://youtube.com/@ekowsamfarms",
    whatsapp: "+233241234567"
  }
};

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Fresh Commercial Table Eggs (Crate of 30)",
    category: "poultry",
    priceGHS: 65,
    priceUSD: 4.80,
    unit: "Crate (30 large brown eggs)",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 128,
    description: "Farm-fresh large brown eggs collected daily from our free-flowing, nutrient-fed layer chickens in biosecure poultry units. High in omega-3 and protein.",
    specifications: {
      "Grade": "Grade A Large",
      "Yolk Color": "Rich Golden Orange",
      "Packaging": "Eco-friendly molded pulp crate (30 eggs)",
      "Shelf Life": "30 days stored in cool dry place"
    },
    bulkDiscount: "10% off on orders above 20 crates"
  },
  {
    id: "prod-2",
    name: "Live Dressed Broiler Chicken (2.5kg - 3.0kg)",
    category: "poultry",
    priceGHS: 120,
    priceUSD: 8.90,
    unit: "Per Whole Bird",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewsCount: 94,
    description: "Hygienically slaughtered, plucked, and dressed broiler chicken raised on 100% natural grain feed without artificial growth hormones.",
    specifications: {
      "Average Weight": "2.5kg - 3.0kg dressed",
      "Feed Standard": "100% Non-GMO Soy & Yellow Corn",
      "Processing": "FDA-standard clean cold-chilled slaughtering",
      "Packaging": "Vacuum sealed food-grade pouch"
    }
  },
  {
    id: "prod-3",
    name: "Giant African Land Snails (Archachatina marginata - Pack of 10)",
    category: "snails",
    priceGHS: 180,
    priceUSD: 13.30,
    unit: "Pack of 10 Jumbo Snails",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 67,
    description: "Large, healthy, organically bred Giant African Land Snails (A. marginata). Rich in iron, low in cholesterol, fed on calcium-rich papaya leaves and organic formulate.",
    specifications: {
      "Species": "Archachatina marginata (Glover variety)",
      "Size": "12cm - 15cm shell length",
      "Weight": "180g - 250g per live snail",
      "Purged": "Purged for 48 hours prior to delivery"
    },
    bulkDiscount: "Free delivery on 5+ packs in Accra & Cape Coast"
  },
  {
    id: "prod-4",
    name: "Oven-Smoked Catfish (Pack of 5 Large)",
    category: "processed",
    priceGHS: 160,
    priceUSD: 11.85,
    unit: "Pack of 5 Fish",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 156,
    description: "Premium Clarias catfish grown in clean recirculating aquaculture systems, seasoned with organic natural spices and smoked over aromatic hardwood.",
    specifications: {
      "Net Weight": "1.2kg per pack",
      "Smoked Method": "Clean Stainless Steel Oven-Smoking (Low Polycyclic Aromatic Hydrocarbons)",
      "Shelf Life": "Up to 6 months un-refrigerated in dry pack",
      "Usage": "Ready to cook into soups, stews, and gravies"
    }
  },
  {
    id: "prod-5",
    name: "Fresh Live African Catfish (Per Kg)",
    category: "aquaculture",
    priceGHS: 45,
    priceUSD: 3.33,
    unit: "Per Kg (approx 1-2 live fish)",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewsCount: 82,
    description: "Lively, healthy table-size African Catfish harvested directly from our freshwater ponds upon order. Tender meat with zero muddy taste.",
    specifications: {
      "Average Size": "800g - 1.5kg per fish",
      "Water Environment": "Aerated freshwater spring tanks",
      "Options": "Live in oxygenated bag OR freshly gutted on demand"
    }
  },
  {
    id: "prod-6",
    name: "High-Quality Cassava Flour (HQCF - 5kg Bag)",
    category: "processed",
    priceGHS: 75,
    priceUSD: 5.55,
    unit: "5kg Bag",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 45,
    description: "Unfermented, clean, odor-free, 100% white High Quality Cassava Flour processed from our organic farm-grown cassava within 24 hours of harvest.",
    specifications: {
      "Gluten Free": "100% Gluten-Free",
      "Moisture Content": "< 10%",
      "Uses": "Baking, soup thickener, pastry making, composite flour blends"
    }
  },
  {
    id: "prod-7",
    name: "Organic Greenhouse Tomatoes (5kg Crate)",
    category: "crops",
    priceGHS: 110,
    priceUSD: 8.15,
    unit: "5kg Box",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 73,
    description: "Plump, firm, pesticide-free greenhouse tomatoes grown under strict climate-controlled conditions with drip fertigation.",
    specifications: {
      "Variety": "Eva F1 Hybrid Greenhouse Tomato",
      "Skin": "Thick firm skin, long shelf life (up to 21 days)",
      "Brix (Sweetness)": "High natural sweetness"
    }
  },
  {
    id: "prod-8",
    name: "Snail Breeding Starter Kit (10 Mature Breeders + Cage Blueprint + Guide)",
    category: "snails",
    priceGHS: 450,
    priceUSD: 33.30,
    unit: "Complete Kit",
    image: "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: false,
    rating: 5.0,
    reviewsCount: 39,
    description: "Ideal for aspiring snail farmers. Contains 10 point-of-lay Giant African Land Snails, calcium feed supplement, substrate guide, and 1-on-1 telephone advice.",
    specifications: {
      "Breeders": "10 sexually mature point-of-lay snails (15cm+)",
      "Extras": "1kg Calcium Supplement + Snail Care Manual + Cage Specs"
    }
  },
  {
    id: "prod-9",
    name: "High-Grade Organic Bio-Fertilizer (25kg Bag)",
    category: "inputs",
    priceGHS: 90,
    priceUSD: 6.66,
    unit: "25kg Woven Bag",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: false,
    rating: 4.9,
    reviewsCount: 51,
    description: "Composted poultry manure enriched with biochar and neem cake. Restores soil microbial life and boosts crop yield naturally without chemical leaching.",
    specifications: {
      "Composition": "Composted Poultry Manure + Biochar + Plant Ash",
      "NPK Ratio": "Balanced Organic NPK 4-3-3",
      "Moisture": "Curated dry powder / granular"
    }
  },
  {
    id: "prod-10",
    name: "Catfish Fingerlings & Post-Fingerlings (Batch of 500)",
    category: "aquaculture",
    priceGHS: 600,
    priceUSD: 44.40,
    unit: "Batch of 500 Healthy Shooters",
    image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: false,
    rating: 4.8,
    reviewsCount: 33,
    description: "Dutch strain Clarias gariepinus fingerlings bred in our modern hatchery. Fast growth rates, disease resistant, high feed conversion ratio (FCR).",
    specifications: {
      "Size": "Post-fingerling (5cm - 7cm)",
      "Survival Rate": "> 95% guaranteed with proper care",
      "Strain": "Dutch Clarias Gariepinus Super Strain"
    }
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-1",
    title: "Commercial Snail Farming (Heliculture) Masterclass",
    category: "Heliculture & Agro-Enterprise",
    duration: "2 Days (Sat - Sun)",
    date: "August 15 - 16, 2026",
    location: "Ekow Sam Farm Estate, Gomoa East & Virtual Live Stream",
    feeGHS: 500,
    feeUSD: 37,
    instructor: "Ekow Sam & Dr. K. Mensah (Lead Heliculturist)",
    seatsRemaining: 14,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    description: "Learn step-by-step how to establish a low-cost, high-profit commercial snail farm in West Africa. Covers breeding, housing designs, feed formulation, slime extraction, and export logistics.",
    modules: [
      "Introduction to Archachatina marginata & Achatina achatina biology",
      "Designing intensive, semi-intensive, and greenhouse snail pens",
      "Soil treatment, pest control & humidity regulation",
      "Feed formulation using local farm byproducts & calcium boosters",
      "Egg harvesting, incubation & hatchling care",
      "Market linkages: Restaurants, cosmetic slime buyers & export standards"
    ],
    includes: [
      "Certiﬁcate of Completion certified by MoFA trainers",
      "10 Point-of-lay Breeder Snails to start your farm",
      "Comprehensive 60-page Heliculture Blueprint Handbook",
      "Buffet Farm Lunch & Refreshments on both days",
      "Access to Ekow Sam Farmers Alumni Support Group"
    ]
  },
  {
    id: "ws-2",
    title: "Commercial Catfish Breeding & High-Density Aquaculture Course",
    category: "Aquaculture & Fish Farming",
    duration: "3 Days Intensive",
    date: "August 28 - 30, 2026",
    location: "Ekow Sam Hatchery & Demonstration Ponds, Gomoa East",
    feeGHS: 850,
    feeUSD: 63,
    instructor: "Ing. Kwame Asante (Lead Aquaculture Engineer)",
    seatsRemaining: 8,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    description: "Hands-on practical training on catfish hormone stripping, egg incubation, fingerling nursing, pond construction (Tarpaulin, RAS & Earthen), feed optimization, and smoked fish processing.",
    modules: [
      "Broodstock selection & hormonal induction (Hypophysation)",
      "Hatchery management & Artemia feeding protocols",
      "Designing Recirculating Aquaculture Systems (RAS) on a budget",
      "Water quality parameters: pH, Dissolved Oxygen, Ammonia management",
      "On-farm feed milling & floating pellet production",
      "Value addition: Smoking, gutting, packaging, and marketing strategies"
    ],
    includes: [
      "Practical stripping & hatching session with live fish",
      "500 Post-Fingerlings starter stock voucher",
      "Aquaculture Management Software template",
      "Lunch & farm tour included"
    ]
  },
  {
    id: "ws-3",
    title: "Modern Poultry & Broiler Management Masterclass",
    category: "Poultry & Livestock",
    duration: "2 Days",
    date: "September 12 - 13, 2026",
    location: "Ekow Sam Farms Poultry Complex & Online",
    feeGHS: 600,
    feeUSD: 44,
    instructor: "Dr. Abena Osei (Veterinary Specialist)",
    seatsRemaining: 18,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    description: "Master brooding management, bio-security, vaccination schedules, litter care, feed conversion ratios (FCR), and automated processing for maximum poultry profitability.",
    modules: [
      "Brooding room climate setup and chick arrival procedures",
      "Vaccination schedule and disease diagnostic keys",
      "Feed management for 35-day broiler harvest cycle",
      "Biosecurity protocols and fly/rodent control",
      "Dressed poultry processing hygiene and cold chain logistics"
    ],
    includes: [
      "Poultry Health Manual & Vaccination Schedule Chart",
      "Farm Biosecurity Starter Kit",
      "Certificate of Participation"
    ]
  },
  {
    id: "ws-4",
    title: "Turnkey Agribusiness Setup & Farm Management Consultancy",
    category: "Agribusiness Management",
    duration: "1 Day Executive Session",
    date: "September 26, 2026",
    location: "Accra Conference Center & Ekow Sam Estate",
    feeGHS: 1200,
    feeUSD: 89,
    instructor: "Ekow Sam (CEO & Founder)",
    seatsRemaining: 10,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    description: "Designed for investors, land owners, diaspora Ghanaians, and agricultural entrepreneurs seeking to build scalable 10+ acre commercial farms with high ROI.",
    modules: [
      "Land acquisition, soil testing & farm master planning in Ghana",
      "CapEx and OpEx financial modeling for 5-year farm viability",
      "Irrigation engineering & solar power integration for agriculture",
      "Managing farm labor, security, and digital inventory tracking",
      "FDA, MoFA, and EPA regulatory compliance and export permits"
    ],
    includes: [
      "Private 1-on-1 Farm Feasibility Consultation with Ekow Sam",
      "Sample Agribusiness Business Plan Template (.docx/.xlsx)",
      "VIP Farm Tour with Executive Transport from Accra"
    ]
  }
];

export const DIVISIONS: Division[] = [
  {
    id: "poultry-livestock",
    title: "Poultry & Livestock Division",
    subtitle: "High-Yield Egg Layers, Dressed Broilers, Grasscutters & Small Ruminants",
    iconName: "Egg",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    summary: "Our flagship livestock unit housing over 15,000 birds under strict biosecure conditions. We produce thousands of egg crates daily, premium dressed chickens, and breed grasscutters & Boer goats.",
    fullDetails: "Ekow Sam Farms operates modern battery cage and deep litter systems designed for optimal animal welfare, airflow, and biosecurity. All feed is formulated on-site using yellow corn, soy meal, and essential micronutrients. We supply major hotel chains, restaurants, supermarkets, and wholesale egg distributors across Accra, Central Region, and Western Region.",
    highlights: [
      "Daily egg production exceeding 1,200 crates",
      "35-day automated broiler harvest cycle with 2.8kg average weight",
      "Captive breeding of Grasscutters (Greater Cane Rat) for meat & breeding stock",
      "Strict zero-antibiotic withdrawal periods ensuring safe meat for consumers"
    ],
    keyProducts: ["Fresh Crate Eggs", "Dressed Broilers", "Live Layers", "Breeding Grasscutters", "Boer Goats"],
    capacity: "15,000+ Birds & Ruminants"
  },
  {
    id: "aquaculture",
    title: "Aquaculture & Fish Hatchery Division",
    subtitle: "Pristine Freshwater Catfish, Tilapia & High-Density Recirculating Ponds",
    iconName: "Fish",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    summary: "State-of-the-art fish hatchery producing over 100,000 fingerlings monthly and raising high-grade African Catfish and Tilapia in clean spring-fed earthen and tarpaulin ponds.",
    fullDetails: "Water quality is the cornerstone of fish health at Ekow Sam Farms. Utilizing recirculating filtration and continuous aeration systems, our fish grow fast with firm, delicious meat free from muddy off-flavors. We process fresh fish daily into live supplies, gutted fresh packs, and stainless steel oven-smoked catfish.",
    highlights: [
      "Hatchery capacity of 100,000+ fingerlings per month",
      "Earthen ponds spanning 15 acres + 30 high-density plastic tanks",
      "Proprietary floating feed formulation ensuring 1.1 Feed Conversion Ratio",
      "Hygienic oven-smoking unit with vacuum packaging technology"
    ],
    keyProducts: ["Table Catfish", "Fresh Tilapia", "Dutch Strain Fingerlings", "Oven-Smoked Catfish"],
    capacity: "100,000+ Fish Annually"
  },
  {
    id: "heliculture",
    title: "Heliculture (Snail Farming) Division",
    subtitle: "Organic Giant African Land Snails (A. marginata), Slime & Breeding Stock",
    iconName: "Bug",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    summary: "Ghana's premier commercial snail breeding facility with over 35,000 Giant African Land Snails housed in bio-controlled greenhouse pens.",
    fullDetails: "Heliculture at Ekow Sam Farms is conducted in eco-friendly greenhouse trench pens enriched with natural soil microbiota, calcium-rich diets, and banana shade canopies. We harvest snails for culinary consumption, supply point-of-lay breeders to new farmers, and extract pure cosmetic-grade snail slime filtrate for pharmaceutical and beauty products.",
    highlights: [
      "Selective breeding of Archachatina marginata for maximum size (up to 250g+)",
      "Zero chemical pesticide environment with natural humidity misting",
      "Cold-extracted snail slime for cosmetics export",
      "Complete turnkey snail cage design and stocking services"
    ],
    keyProducts: ["Jumbo Live Snails", "Oven-Dried Snails", "Point-of-Lay Breeders", "Snail Slime Extract"],
    capacity: "35,000+ Snails"
  },
  {
    id: "crops-greenhouse",
    title: "Crops & Greenhouse Horticulture",
    subtitle: "Organic Vegetables, Tomatoes, Peppers, Maize, Cassava & Plantain",
    iconName: "Sprout",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
    summary: "Over 350 acres dedicated to open-field grain/tuber cultivation alongside 10 high-tech climate-controlled greenhouses producing premium vegetables year-round.",
    fullDetails: "By integrating drip irrigation powered by solar boreholes, Ekow Sam Farms produces crops continuously throughout both dry and wet seasons in Ghana. Waste from our livestock units is composted into rich organic fertilizer that feeds our fields, closing the nutrient loop.",
    highlights: [
      "Year-round drip-irrigated greenhouse tomato & sweet pepper production",
      "300+ acres of high-yield yellow maize for livestock feed & market sale",
      "Disease-resistant cassava tubers processed into High Quality Cassava Flour (HQCF)",
      "Organic compost utilization reducing reliance on chemical fertilizers"
    ],
    keyProducts: ["Greenhouse Tomatoes", "Habenero Peppers", "Yellow Maize", "Cassava Tubers", "Plantains"],
    capacity: "350+ Acres Cultivated"
  },
  {
    id: "agro-processing",
    title: "Agro-Processing & Value Addition",
    subtitle: "Hygienic Vacuum Sealing, Smoked Products, Cassava Flour & Solar Drying",
    iconName: "Factory",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
    summary: "Transforming raw farm outputs into packaged, shelf-stable, FDA-certified food products for local retail and international export.",
    fullDetails: "Value addition ensures farm produce never goes to waste. Our processing factory features stainless steel processing tables, blast chillers, low-PAH smokeless kilns, and automatic vacuum sealers. We pack our products under strict hygienic guidelines adhering to Ghana Food and Drugs Authority (FDA) standards.",
    highlights: [
      "FDA Ghana approved processing unit",
      "Nitrogen-flushed packaging for extended shelf life without artificial preservatives",
      "Cold-chain transport vans for fresh produce delivery",
      "Custom white-label packaging for corporate clients and supermarkets"
    ],
    keyProducts: ["Vacuum Smoked Catfish", "Dry Snails", "HQCF Cassava Flour", "Poultry Feed Blends"],
    capacity: "5 Tons Processed Daily"
  },
  {
    id: "training-consultancy",
    title: "Agribusiness Training & Farm Setup Consultancy",
    subtitle: "Empowering Next-Generation Farmers, Investors & Diaspora Entrepreneurs",
    iconName: "GraduationCap",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    summary: "Practical hands-on agricultural workshops, feasibility studies, soil analysis, and turnkey farm setup services across West Africa.",
    fullDetails: "We believe in building food security through knowledge sharing. Over 2,500 individuals, youth groups, retiree investors, and diaspora Ghanaians have passed through Ekow Sam Farms training programs. We offer both on-farm physical bootcamps and virtual live interactive modules.",
    highlights: [
      "2,500+ trained agribusiness entrepreneurs to date",
      "Custom turnkey farm construction: Snail pens, fish ponds, poultry cages",
      "MoFA-recognized certification",
      "Post-training mentorship and guaranteed buy-back programs for select produce"
    ],
    keyProducts: ["Snail Masterclass", "Fish Hatchery Course", "Poultry BootCamp", "Turnkey Farm Setup"],
    capacity: "500+ Trainees Per Year"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Snail Farming (Heliculture) is Ghana's Most Lucrative Hidden Agribusiness",
    category: "Heliculture",
    author: "Ekow Sam",
    date: "July 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    snippet: "Discover how low capital setup, minimal space requirements, and high export demand for giant African snails make heliculture a goldmine in West Africa.",
    content: [
      "Snail farming, scientifically known as heliculture, has emerged as one of the most profitable yet under-exploited agricultural ventures in Ghana and across West Africa.",
      "Unlike conventional livestock like cattle or poultry that require expensive feeds, large expanses of land, and high daily operational costs, Giant African Land Snails (Archachatina marginata) thrive on organic leaves, fruits, and calcium supplements in compact, eco-friendly greenhouse pens.",
      "Key Financial Advantages:",
      "1. High ROI: A modest setup with 100 breeder snails can multiply into over 5,000 snails within 12-14 months, generating upwards of 300% returns.",
      "2. Low Mortality & Odorless: Snails are quiet, non-disruptive, and produce zero offensive odor when kept in well-managed soil trenches.",
      "3. Triple Revenue Stream: Sell live jumbo snails for culinary meat, supply point-of-lay breeders to new farmers, or harvest pure snail slime for cosmetics companies.",
      "At Ekow Sam Farms, our monthly Snail Masterclass provides practical step-by-step guidance, starter breeder stocks, and ongoing technical mentorship to ensure your farm succeeds."
    ],
    tags: ["Snail Farming", "Ghana Agribusiness", "Heliculture", "High ROI", "Organic Farming"]
  },
  {
    id: "blog-2",
    title: "5 Critical Water Quality Parameters Every Catfish Farmer in Ghana Must Monitor",
    category: "Aquaculture",
    author: "Ing. Kwame Asante",
    date: "June 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    snippet: "Poor water quality is responsible for over 80% of fish mortalities in catfish farming. Learn how to optimize pH, Dissolved Oxygen, and Ammonia levels.",
    content: [
      "Catfish farming in tarpaulin tanks, concrete vats, or earthen ponds can yield immense profits if water quality is prioritized.",
      "Many beginner fish farmers make the mistake of focusing solely on expensive feed without understanding that dirty, de-oxygenated water stops fish from digesting feed properly, leading to slow growth and sudden die-offs.",
      "The 5 Non-Negotiable Water Parameters:",
      "1. Dissolved Oxygen (DO): Keep DO levels above 4.0 mg/L using aeration pumps or frequent freshwater exchanges.",
      "2. pH Balance: Ideal pH for African Catfish ranges between 6.5 and 8.5. Acidic water (below 6.0) causes skin lesions and stress.",
      "3. Unionized Ammonia (NH3): Ammonia build-up from fish waste and uneaten feed is toxic. Perform 30% water flushes whenever ammonia rises.",
      "4. Water Temperature: Maintain water between 26°C and 30°C for maximum metabolic activity.",
      "5. Turbidity & Clarity: Excessive algae blooms can cause night-time oxygen depletion.",
      "Ekow Sam Farms offers water testing kits and high-density RAS designs tailored for urban and commercial aquaculture setups."
    ],
    tags: ["Catfish Farming", "Aquaculture", "Water Parameters", "Fish Hatchery", "Ghana Agriculture"]
  },
  {
    id: "blog-3",
    title: "How Circular Zero-Waste Farming Reduces Operational Costs by 35%",
    category: "Sustainable Agriculture",
    author: "Ekow Sam",
    date: "June 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800",
    snippet: "Explore how Ekow Sam Farms integrates poultry waste, catfish effluent, and crop residue into an eco-friendly closed-loop agricultural ecosystem.",
    content: [
      "In modern commercial farming, waste is simply an unutilized resource.",
      "At Ekow Sam Farms, our circular farming model connects all our operational divisions into a self-sustaining web:",
      "- Poultry Manure -> Composted into high-NPK organic fertilizer for our maize, tomato, and cassava fields.",
      "- Catfish Wastewater -> Rich in nitrates, pumped directly to irrigate greenhouse vegetable beds.",
      "- Cassava & Plantain Leaves -> High-protein feed for our breeding snails and ruminants.",
      "- Maize Harvest -> Milled into energy-dense feed for our poultry layers and broilers.",
      "By closing the loop, we slash synthetic fertilizer and external feed expenditures by over 35%, ensuring affordable prices for our consumers and protecting the environment."
    ],
    tags: ["Circular Economy", "Zero Waste", "Organic Farming", "Eco Friendly", "Ekow Sam Farms"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Modern Biosecure Poultry Layers Unit",
    category: "livestock",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    description: "Our automated battery layer facility producing thousands of crate eggs daily under clean hygienic standards."
  },
  {
    id: "gal-2",
    title: "Catfish Fingerlings Hatchery & Nursery Ponds",
    category: "aquaculture",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800",
    description: "Hormone stripping and fingerling nursing bays equipped with oxygenated water circulation."
  },
  {
    id: "gal-3",
    title: "Greenhouse Snail Breeding Trench Pens",
    category: "livestock",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
    description: "Eco-friendly humid trench pens filled with organic soil and banana shade trees for Giant African Snails."
  },
  {
    id: "gal-4",
    title: "Drip-Irrigated Greenhouse Tomato Harvest",
    category: "crops",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800",
    description: "Climate-controlled greenhouse growing plump, pesticide-free Eva F1 tomatoes."
  },
  {
    id: "gal-5",
    title: "Stainless Steel Smokeless Fish Kiln Processing",
    category: "processing",
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
    description: "FDA-compliant oven-smoking unit transforming fresh catfish into aromatic, long shelf-life vacuum packs."
  },
  {
    id: "gal-6",
    title: "Practical Farmers Workshop Session",
    category: "training",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    description: "Trainees receiving hands-on instructions during our weekend Snail & Aquaculture masterclass."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Chief Chef Kweku Anansi",
    role: "Executive Head Chef",
    company: "Royal Palm Beach Hotel, Cape Coast",
    comment: "Ekow Sam Farms has been our sole supplier of fresh eggs, dressed broilers, and smoked catfish for 3 years. The freshness, consistency, and prompt delivery to our hotel kitchen are unmatched in Ghana.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    name: "Mrs. Evelyn Boateng",
    role: "Agribusiness Graduate",
    company: "GreenHaven Snail Enterprise, Kumasi",
    comment: "Attending the 2-Day Snail Farming Masterclass at Ekow Sam Farms was the best investment I made. Their practical step-by-step guidance and healthy breeder stock helped me set up my 1,000-snail farm seamlessly!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    name: "Mr. Michael Mensah",
    role: "Procurement Manager",
    company: "Afritrade Supermarket Network, Accra",
    comment: "Their vacuum-packed smoked catfish and high quality cassava flour are top sellers on our shelves. FDA compliant, neat barcode packaging, and always in demand by our domestic and international shoppers.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

export const FAQS = [
  {
    question: "Where is Ekow Sam Farms located and can I visit?",
    answer: "Our main commercial farm estate is located at Gomoa Potsin Junction along the Accra - Cape Coast Highway in the Central Region of Ghana (approx. 45 minutes from Accra). We welcome visitors! You can book a farm tour through our Gallery & Tours page or call +233 24 123 4567."
  },
  {
    question: "Do you deliver farm produce and processed foods across Ghana?",
    answer: "Yes! We operate dedicated temperature-controlled delivery vans serving Greater Accra Region, Central Region, Western Region (Takoradi), and Ashanti Region (Kumasi). Bulk orders can also be dispatched nationwide."
  },
  {
    question: "How do I register for your Farmers Training Workshops?",
    answer: "You can view upcoming workshop schedules on our Training & Consultancy page, choose your preferred session (Snail Farming, Catfish Breeding, Poultry, or Agribusiness), and complete the online registration form. Payment can be made via Mobile Money (MTN MoMo, Vodafone Cash) or Bank Transfer."
  },
  {
    question: "Are your food products certified by FDA Ghana?",
    answer: "Absolutely. All our agro-processed products, including oven-smoked catfish, dried snails, packaged poultry, and high-quality cassava flour, are processed in our hygienic facility under Ghana Food and Drugs Authority (FDA) standards."
  },
  {
    question: "Do you offer turnkey farm setup services for diaspora investors?",
    answer: "Yes. For Ghanaians living abroad and commercial investors looking to build profitable farms without stress, we provide complete turnkey services: land evaluation, pond/pen/cage construction, seed stocking, staff training, and ongoing farm management supervision."
  }
];
