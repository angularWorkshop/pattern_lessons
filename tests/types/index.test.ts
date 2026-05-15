import { expectTypeOf } from 'vitest';
import { pay, type OrderState } from '../../src/order.js';

describe('OrderState type contracts', () => {
  it('OrderState is a discriminated union by status', () => {
    type Statuses = OrderState['status'];
    expectTypeOf<Statuses>().toEqualTypeOf<
      'cart' | 'checkout' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
    >();
  });

  it('pay returns OrderState', () => {
    expectTypeOf(pay).returns.toEqualTypeOf<OrderState>();
  });
});
