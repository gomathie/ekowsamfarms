export type PageId = 
  | 'home' 
  | 'about' 
  | 'divisions' 
  | 'store' 
  | 'training' 
  | 'gallery' 
  | 'blog' 
  | 'contact';

export interface Product {
  id: string;
  name: string;
  category: 'poultry' | 'aquaculture' | 'snails' | 'crops' | 'processed' | 'inputs';
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

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'livestock' | 'aquaculture' | 'crops' | 'processing' | 'training';
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
