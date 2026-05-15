// Стратегии расчёта цены корзины. Каждая — функция (cart) → priceBreakdown.
// Cart хранит товары; calculate(strategy) делегирует расчёт стратегии.

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

  // Контекст просто делегирует стратегии.
  public calculate(strategy: PricingStrategy): PriceBreakdown {
    return strategy(this);
  }
}

// Готовые стратегии.

// TODO: guestStrategy — никакой скидки, доставка 10 (если subtotal > 0), total = subtotal + shipping.
export const guestStrategy: PricingStrategy = (_cart) => {
  throw new Error('guestStrategy is not implemented yet');
};

// TODO: memberStrategy — 5% скидка, доставка 10. total = subtotal - discount + shipping.
export const memberStrategy: PricingStrategy = (_cart) => {
  throw new Error('memberStrategy is not implemented yet');
};

// TODO: premiumStrategy — 10% скидка, бесплатная доставка (shipping = 0).
export const premiumStrategy: PricingStrategy = (_cart) => {
  throw new Error('premiumStrategy is not implemented yet');
};
