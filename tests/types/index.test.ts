import { expectTypeOf } from 'vitest';
import { Cart, type PriceBreakdown, type PricingStrategy } from '../../src/pricing.js';

describe('Pricing type contracts', () => {
  it('PricingStrategy is (cart: Cart) => PriceBreakdown', () => {
    expectTypeOf<PricingStrategy>().toEqualTypeOf<(cart: Cart) => PriceBreakdown>();
  });
  it('Cart.calculate returns PriceBreakdown', () => {
    expectTypeOf(Cart.prototype.calculate).returns.toEqualTypeOf<PriceBreakdown>();
  });
});
