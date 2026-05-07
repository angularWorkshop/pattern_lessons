import type { Order } from './order-types.js';

export interface PriceBreakdown {
  subtotal: number;
  discount: number;
  total: number;
}

const DISCOUNT_RATES: Record<Order['customerType'], number> = {
  premium: 0.10,
  member: 0.05,
  guest: 0,
};

export class DiscountCalculator {
  public calculate(order: Order): PriceBreakdown {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const rate = DISCOUNT_RATES[order.customerType];
    const discount = Math.round(subtotal * rate * 100) / 100;
    const total = Math.round((subtotal - discount) * 100) / 100;
    return { subtotal, discount, total };
  }
}
