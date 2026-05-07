import type { Order } from './order-types.js';

export interface PriceBreakdown {
  subtotal: number;
  discount: number;
  total: number;
}

export class DiscountCalculator {
  // TODO: extract subtotal/discount/total math out of OrderService.
  // Rates: premium = 10%, member = 5%, guest = 0.
  // Round total to 2 decimals.
  public calculate(_order: Order): PriceBreakdown {
    throw new Error('DiscountCalculator.calculate is not implemented yet');
  }
}
