export type PageId =
  | 'home'
  | 'about'
  | 'divisions'
  | 'store'
  | 'training'
  | 'events'
  | 'gallery'
  | 'blog'
  | 'contact';

export type ProductCategory =
  | 'eggs'
  | 'poultry'
  | 'live-birds'
  | 'ready-to-eat';

/**
 * Products carry no price. Rates vary with flock cycle, bird size, and order
 * volume, so the farm quotes each request directly after the customer submits it.
 */
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  /** The unit a quote is given against, e.g. "Crate (30 large brown eggs)". */
  unit: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  specifications: Record<string, string>;
  /** Bulk terms, worded without figures — e.g. "Volume discounts on 20+ crates". */
  bulkNote?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Workshop {
  id: string;
  title: string;
  category: string;
  duration: string;
  date: string;
  location: string;
  instructor: string;
  seatsRemaining: number;
  image: string;
  description: string;
  modules: string[];
  includes: string[];
}

export type EventCategory =
  | 'Open Farm Day'
  | 'Farmers Market'
  | 'Farm Tour'
  | 'Community Outreach'
  | 'Expo & Exhibition';

export interface FarmEvent {
  id: string;
  title: string;
  category: EventCategory;
  /** ISO date (YYYY-MM-DD) used for sorting and upcoming/past filtering */
  startDate: string;
  /** ISO date (YYYY-MM-DD); omit for single-day events */
  endDate?: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  summary: string;
  capacity: number;
  spotsRemaining: number;
  featured?: boolean;
  /** Official event site. When set, RSVP links out instead of using the on-site form. */
  externalUrl?: string;
  highlights: string[];
}

export interface Division {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  image: string;
  summary: string;
  fullDetails: string;
  highlights: string[];
  keyProducts: string[];
  capacity: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string[];
  tags: string[];
}

export type GalleryCategory = 'layers' | 'broilers' | 'eggs' | 'team';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  /** Optional headshot; cards fall back to initials when absent. */
  image?: string;
}

/**
 * A customer's request for produce. No totals are carried: the farm reviews the
 * request and comes back with a quote, so pricing happens off-site.
 */
export interface QuoteRequest {
  requestId: string;
  customerName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  /** Free-text notes: bird size, delivery window, recurring supply, etc. */
  notes?: string;
  items: CartItem[];
  createdAt: string;
  status: 'awaiting-quote';
}
