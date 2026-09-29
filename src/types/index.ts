export type Category =
  | 'Indoor'
  | 'Air Purifying'
  | 'Succulents'
  | 'Herbs'
  | 'Flowering'
  | 'Pots & Planters';

export type LightNeed = 'Low' | 'Medium' | 'Bright';
export type PlantSize = 'Small' | 'Medium' | 'Large';

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  mrp: number;
  images: string[];
  light: LightNeed;
  petSafe: boolean;
  beginner: boolean;
  size: PlantSize;
  stock: number;
  rating: number;
  reviewCount: number;
  careGuide: {
    water: string;
    light: string;
    humidity: string;
  };
  sellerId: string;
  tags: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Out for delivery' | 'Delivered' | 'Cancelled';
  address: Address;
  paymentMethod: 'COD' | 'UPI';
  placedAt: string;
  estimatedDelivery: string;
  couponCode?: string;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'shipping';
  value: number;
  minOrder?: number;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: string[];
}
