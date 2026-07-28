import { Product, Workshop, Division, BlogPost, GalleryItem, Testimonial } from '../types';

export const FARM_INFO = {
  name: "Ekow Sam Farms",
  tagline: "Freshness You Can Trust, From Our Farm to Your Table.",
  foundedYear: 2018,
  founder: "Ekow Sam",
  location: "DL hospital street, Accra, Ghana / Millenium City, Kasoa",
  address: "Millenium City, Kasoa",
  gpsLocation: "5°33'26.7\"N 0°12'45.0\"W",
  phones: ["055 519 8194", "+(233) 55 519 8194"],
  emails: ["samderreck@gmail.com", "hello@ekowsamfarms.com"],
  openingHours: "Mon - Sat: 7:30 AM - 5:30 PM | Sun: Closed",
  farmSizeAcres: 500,
  livestockCapacity: "15,000+ Birds",
  socials: {
    facebook: "https://facebook.com/ekowsamfarms",
    instagram: "https://instagram.com/ekowsamfarms",
    twitter: "https://twitter.com/ekowsamfarms",
    youtube: "https://youtube.com/@ekowsamfarms",
    whatsapp: "0555198194"
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
    rating: 5.0,
    reviewsCount: 342,
    description: "Farm-fresh large brown eggs collected daily from our free-flowing, nutrient-fed layer chickens. High in omega-3 and protein, with a rich golden yolk.",
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
    rating: 4.9,
    reviewsCount: 284,
    description: "Hygienically slaughtered, plucked, and dressed broiler chicken raised on organic feed without artificial growth hormones. Vacuum-packed for freshness.",
    specifications: {
      "Average Weight": "2.5kg - 3.0kg dressed",
      "Feed Standard": "Organic / Hormone-Free",
      "Processing": "FDA-standard clean cold-chilled slaughtering",
      "Packaging": "Vacuum sealed food-grade pouch"
    }
  },
  {
    id: "prod-3",
    name: "Kosua ne Meko (Fresh Eggs with Pepper)",
    category: "ready-to-eat",
    priceGHS: 25,
    priceUSD: 1.85,
    unit: "Pack",
    image: "https://images.unsplash.com/photo-1628268909376-e8c459632eb3?auto=format&fit=crop&q=80&w=800",
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 156,
    description: "Our signature Kosua ne Meko! Boiled farm-fresh eggs paired with our special spicy, aromatic pepper sauce. Check out our brand at kosuanemeko.com.",
    specifications: {
      "Ingredients": "Farm fresh eggs, local spices, fresh pepper",
      "Spiciness": "Medium to Hot",
      "Brand": "Kosuanemeko (kosuanemeko.com)"
    }
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "ws-1",
    title: "Modern Poultry & Broiler Management Masterclass",
    category: "Poultry Management",
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
    id: "ws-2",
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
    description: "Designed for investors, land owners, diaspora Ghanaians, and agricultural entrepreneurs seeking to build scalable commercial poultry farms with high ROI.",
    modules: [
      "Land acquisition, soil testing & farm master planning in Ghana",
      "CapEx and OpEx financial modeling for 5-year farm viability",
      "Poultry housing engineering & biosecurity integration",
      "Managing farm labor, security, and digital inventory tracking",
      "FDA, MoFA, and EPA regulatory compliance and permits"
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
    id: "wholesale",
    title: "Wholesale & B2B Supply",
    subtitle: "High-Volume Poultry for Businesses",
    iconName: "Factory",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    summary: "Consistent, high-volume poultry supply for hotels, restaurants, and catering services.",
    fullDetails: "We offer reliable, high-volume supply of premium dressed chicken and farm-fresh eggs to B2B clients, ensuring your kitchen never runs out of quality ingredients.",
    highlights: [
      "Consistent daily supply",
      "Volume discounts for B2B partners",
      "Strict hygiene and cold-chain maintenance"
    ],
    keyProducts: ["Crate Eggs Wholesale", "Dressed Broiler Bulk Supply"],
    capacity: "Serving 100+ Businesses"
  },
  {
    id: "home-delivery",
    title: "Doorstep Home Delivery",
    subtitle: "Farm-to-Fork Convenience",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    summary: "Farm-fresh crates of eggs and dressed birds delivered straight to your doorstep.",
    fullDetails: "Don't have time for the market? Our dedicated delivery team brings vacuum-sealed dressed chicken and fresh eggs directly to your home, ensuring convenience without compromising quality.",
    highlights: [
      "Fast, cold-chain delivery",
      "Professional invoicing",
      "Flexible delivery scheduling"
    ],
    keyProducts: ["Home Egg Crates", "Family Pack Dressed Chicken"],
    capacity: "Daily Dispatch Across Accra"
  },
  {
    id: "livestock-sales",
    title: "Live Stock Sales",
    subtitle: "Healthy Birds for Your Needs",
    iconName: "Egg",
    image: "https://images.unsplash.com/photo-1518552718167-93cf637ebba3?auto=format&fit=crop&q=80&w=800",
    summary: "Healthy, well-vaccinated birds for those looking to start their own poultry journey or for festive seasons.",
    fullDetails: "Whether you're celebrating a festival or looking to raise your own birds, we provide healthy, well-vaccinated live birds that guarantee quality and size.",
    highlights: [
      "Well-vaccinated and healthy",
      "Great for festive seasons",
      "High quality breeds"
    ],
    keyProducts: ["Live Broilers", "Point-of-Lay Hens"],
    capacity: "Available on Demand"
  },
  {
    id: "consulting",
    title: "Agricultural Consulting",
    subtitle: "Expert Guidance for Farm Setup",
    iconName: "GraduationCap",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    summary: "Expert advice and practical training for aspiring farmers and agribusiness investors.",
    fullDetails: "Leverage our years of commercial farming experience. We provide consultancy on farm design, biosecurity, feed formulation, and business management.",
    highlights: [
      "Turnkey farm setups",
      "Practical workshops",
      "Ongoing mentorship"
    ],
    keyProducts: ["Poultry Bootcamps", "Farm Design Blueprints"],
    capacity: "Monthly Cohorts"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "From Farm to Fork: Why Hormone-Free Poultry Matters for Your Family",
    category: "Health & Nutrition",
    author: "Ekow Sam",
    date: "July 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    snippet: "Discover why choosing hormone-free, organic poultry is crucial for your family's health and how Ekow Sam Farms guarantees freshness.",
    content: [
      "In today's fast-paced world, the food we put on our tables matters more than ever. Commercial poultry often relies on growth hormones to accelerate production, but at what cost to our health?",
      "At Ekow Sam Farms, we believe that nature knows best. Our birds are raised on a strict organic feed diet, completely free from artificial growth hormones or harmful additives.",
      "Hormone-free poultry not only tastes better—retaining that authentic, natural flavor—but it also provides peace of mind. You know exactly what you're feeding your family: clean, protein-rich meat that supports healthy development without the risk of unwanted chemical exposure.",
      "When you choose Ekow Sams, you're choosing freshness you can trust, straight from our farm to your fork."
    ],
    tags: ["Health", "Organic", "Poultry", "Family Wellness"]
  },
  {
    id: "blog-2",
    title: "5 Signs of Truly Fresh Eggs (And How to Test Them at Home)",
    category: "Tips & Tricks",
    author: "Dr. Abena Osei",
    date: "June 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    snippet: "Not all eggs are created equal. Learn the five tell-tale signs of a fresh egg and a simple water test you can do at home.",
    content: [
      "Eggs are a staple in almost every Ghanaian household, but finding truly fresh ones can sometimes be a challenge when shopping at generic grocery stores.",
      "Here are 5 signs to look for:",
      "1. A cloudy white (albumen) indicates extreme freshness. As eggs age, the white becomes clearer.",
      "2. The yolk should sit high and firm. If it flattens out immediately when cracked, the egg is older.",
      "3. The shell should have a slightly chalky, rough texture rather than a smooth, shiny one.",
      "4. The float test: Place the egg in a bowl of water. A fresh egg will lay flat on the bottom. An older egg will stand on end, and a bad egg will float.",
      "5. A strong, vibrant golden-orange yolk color, like the ones from our farm, indicates a healthy, nutrient-rich diet.",
      "Our crates are delivered within 24 hours of laying, ensuring you get the freshest eggs possible."
    ],
    tags: ["Eggs", "Freshness", "Cooking Tips", "Quality Control"]
  },
  {
    id: "blog-3",
    title: "Scaling Your Restaurant: Why Choosing the Right Poultry Supplier is Key",
    category: "B2B & Business",
    author: "Ekow Sam",
    date: "June 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800",
    snippet: "Consistency, hygiene, and timely delivery. Find out why top restaurants partner with Ekow Sam Farms for their poultry needs.",
    content: [
      "For any restaurant or catering business, the quality of your ingredients is the foundation of your reputation. When it comes to poultry, consistency is key.",
      "Partnering with a reliable farm like Ekow Sam Farms ensures that you receive the exact size and quality of dressed birds you need, exactly when you need them. No more running out of stock during peak hours or dealing with substandard meat from unverified sources.",
      "Our wholesale B2B supply guarantees vacuum-sealed, cold-chain delivered poultry that maintains its freshness from our processing unit to your kitchen.",
      "We handle the biosecurity and hygiene, so you can focus on what you do best: creating incredible meals for your customers."
    ],
    tags: ["B2B", "Restaurant Supply", "Wholesale", "Agribusiness"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Modern Biosecure Poultry Layers Unit",
    category: "poultry",
    imageUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=800",
    description: "Our layer facility producing thousands of crate eggs daily under clean hygienic standards."
  },
  {
    id: "gal-2",
    title: "Hygienic Poultry Processing",
    category: "processing",
    imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    description: "Cold-chain processing to ensure the highest safety and freshness for our dressed broilers."
  },
  {
    id: "gal-3",
    title: "Kosua ne Meko Preparation",
    category: "processing",
    imageUrl: "https://images.unsplash.com/photo-1628268909376-e8c459632eb3?auto=format&fit=crop&q=80&w=800",
    description: "Our signature Kosua ne Meko, ready to eat and packed with flavor."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Mrs. Akosua Mensah",
    role: "Local Resident & Mother of Three",
    company: "Home Delivery Customer",
    comment: "I started buying from Ekow Sams because I wanted hormone-free meat for my children. The difference in taste is incredible! Their eggs have that rich, golden yolk you just don't find in the supermarkets anymore. It’s peace of mind for my family.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-2",
    name: "Dr. Evelyn Tetteh",
    role: "Medical Practitioner",
    company: "Accra",
    comment: "I rarely have time for the market, so the Ekow Sams home delivery service is a lifesaver. The poultry arrives vacuum-sealed and cold, exactly when they say it will. It’s professional, hygienic, and incredibly convenient for my busy schedule.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test-3",
    name: "Mr. Samuel Dogbe",
    role: "Manager",
    company: "GreenLeaf Grocery Mart",
    comment: "We’ve worked with several farms over the years, but Ekow Sams is in a league of its own. Their biosecurity standards and professional invoicing make them a dream to work with. Our customers specifically ask for their crates of eggs by name.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  }
];

export const FAQS = [
  {
    question: "Where is Ekow Sam Farms located and can I visit?",
    answer: "Our main commercial farm estate is located at Millenium City, Kasoa. We also have an office on DL hospital street, Accra. We welcome visitors for scheduled farm tours or training sessions!"
  },
  {
    question: "Do you deliver farm produce across Ghana?",
    answer: "Yes! We operate dedicated temperature-controlled delivery vans serving Greater Accra Region and its environs for our Doorstep Home Delivery service. Wholesale supplies can be arranged for broader regions."
  },
  {
    question: "Are your poultry products organic and hormone-free?",
    answer: "Absolutely. We pride ourselves on our Organic Feed Policy. Our birds receive no growth hormones or harmful additives, ensuring safe, healthy, and great-tasting poultry for your family."
  },
  {
    question: "What makes your Kosua ne Meko special?",
    answer: "We use our own farm-fresh eggs with rich golden yolks and a proprietary spicy pepper recipe. Check out kosuanemeko.com for more about this specific brand!"
  },
  {
    question: "How do I register for your Farmers Training Workshops?",
    answer: "You can view upcoming workshop schedules on our Training & Consultancy page and register directly for topics like Poultry Management and Turnkey Farm Setup."
  }
];
