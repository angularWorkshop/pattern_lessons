import { StripeAdapter } from '../../src/stripe-adapter.js';
import { PayPalAdapter } from '../../src/paypal-adapter.js';
import { StripeSDK } from '../../src/stripe-sdk.js';
import { PayPalSDK } from '../../src/paypal-sdk.js';
import type { PaymentProvider } from '../../src/payment-provider.js';

describe('StripeAdapter — wraps StripeSDK as PaymentProvider', () => {
  it('pay returns a normalized PaymentResult', async () => {
    const adapter = new StripeAdapter(new StripeSDK());
    const result = await adapter.pay(1500, 'USD');
    expect(result.provider).toBe('stripe');
    expect(result.status).toBe('paid');
    expect(result.amount).toBe(1500);
    expect(result.currency).toBe('USD');
    expect(result.id).toMatch(/^ch_/);
  });

  it('cancel marks the charge as cancelled', async () => {
    const sdk = new StripeSDK();
    const adapter = new StripeAdapter(sdk);
    const paid = await adapter.pay(1000, 'EUR');
    const cancelled = await adapter.cancel(paid.id);
    expect(cancelled.provider).toBe('stripe');
    expect(cancelled.status).toBe('cancelled');
  });

  it('cancel for unknown id reports failed', async () => {
    const adapter = new StripeAdapter(new StripeSDK());
    const result = await adapter.cancel('does-not-exist');
    expect(result.status).toBe('failed');
  });
});

describe('PayPalAdapter — wraps PayPalSDK as PaymentProvider', () => {
  it('pay returns a normalized PaymentResult', async () => {
    const adapter = new PayPalAdapter(new PayPalSDK());
    const result = await adapter.pay(2500, 'USD');
    expect(result.provider).toBe('paypal');
    expect(result.status).toBe('paid');
    expect(result.amount).toBe(2500);
    expect(result.currency).toBe('USD');
    expect(result.id).toMatch(/^PP-/);
  });

  it('cancel marks payment as cancelled', async () => {
    const sdk = new PayPalSDK();
    const adapter = new PayPalAdapter(sdk);
    const paid = await adapter.pay(500, 'GBP');
    const cancelled = await adapter.cancel(paid.id);
    expect(cancelled.status).toBe('cancelled');
  });

  it('cancel for unknown id reports failed', async () => {
    const adapter = new PayPalAdapter(new PayPalSDK());
    const result = await adapter.cancel('not-real');
    expect(result.status).toBe('failed');
  });
});

describe('Same client code works with either adapter', () => {
  async function checkout(provider: PaymentProvider): Promise<string> {
    const result = await provider.pay(100, 'USD');
    return `${result.provider}:${result.status}`;
  }

  it('Stripe and PayPal both fit the PaymentProvider contract', async () => {
    expect(await checkout(new StripeAdapter())).toBe('stripe:paid');
    expect(await checkout(new PayPalAdapter())).toBe('paypal:paid');
  });
});
