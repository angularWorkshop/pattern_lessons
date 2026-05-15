export interface CartItem {
  sku: string;
  price: number;
  quantity: number;
}

export interface PriceBreakdown {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export type PricingStrategy = (cart: Cart) => PriceBreakdown;

export class Cart {
  private readonly items: CartItem[] = [];

  public add(item: CartItem): void {
    this.items.push(item);
  }

  public getItems(): readonly CartItem[] {
    return this.items;
  }

  public subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  public calculate(strategy: PricingStrategy): PriceBreakdown {
    return strategy(this);
  }
}

const round = (value: number): number => Math.round(value * 100) / 100;

export const guestStrategy: PricingStrategy = (cart) => {
  const subtotal = cart.subtotal();
  const shipping = subtotal > 0 ? 10 : 0;
  return { subtotal, discount: 0, shipping, total: subtotal + shipping };
};

export const memberStrategy: PricingStrategy = (cart) => {
  const subtotal = cart.subtotal();
  const discount = round(subtotal * 0.05);
  const shipping = subtotal > 0 ? 10 : 0;
  return { subtotal, discount, shipping, total: round(subtotal - discount + shipping) };
};

export const premiumStrategy: PricingStrategy = (cart) => {
  const subtotal = cart.subtotal();
  const discount = round(subtotal * 0.1);
  return { subtotal, discount, shipping: 0, total: round(subtotal - discount) };
};
