import { expectTypeOf } from 'vitest';
import { StripeAdapter } from '../../src/stripe-adapter.js';
import { PayPalAdapter } from '../../src/paypal-adapter.js';
import type { PaymentProvider } from '../../src/payment-provider.js';

describe('Adapter type contracts', () => {
  it('StripeAdapter implements PaymentProvider', () => {
    expectTypeOf<StripeAdapter>().toMatchTypeOf<PaymentProvider>();
  });
  it('PayPalAdapter implements PaymentProvider', () => {
    expectTypeOf<PayPalAdapter>().toMatchTypeOf<PaymentProvider>();
  });
});
