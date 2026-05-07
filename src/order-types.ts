export type CustomerType = 'guest' | 'member' | 'premium';

export interface OrderItem {
  sku: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerEmail: string;
  customerType: CustomerType;
  items: OrderItem[];
}

export interface OrderResult {
  orderId: string;
  total: number;
  invoice: string;
}

export interface SentEmail {
  to: string;
  body: string;
}
