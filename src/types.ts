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

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceGHS: number;
  priceUSD: number;
  unit: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  specifications: Record<string, string>;
  bulkDiscount?: string;
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
  feeGHS: number;
  feeUSD: number;
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
  /** 0 means the event is free to attend */
  priceGHS: number;
  capacity: number;
  spotsRemaining: number;
  featured?: boolean;
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
  image: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  paymentMethod: 'momo' | 'card' | 'cod';
  items: CartItem[];
  subtotalGHS: number;
  deliveryFeeGHS: number;
  totalGHS: number;
  createdAt: string;
  status: 'pending' | 'confirmed';
}
