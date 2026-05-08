import type { PaymentProvider, PaymentResult } from './payment-provider.js';
import { StripeSDK } from './stripe-sdk.js';

export class StripeAdapter implements PaymentProvider {
  private readonly sdk: StripeSDK;

  public constructor(sdk: StripeSDK = new StripeSDK()) {
    this.sdk = sdk;
  }

  public async pay(amount: number, currency: string): Promise<PaymentResult> {
    const response = await this.sdk.charge(amount, currency);
    return {
      id: response.charge_id,
      provider: 'stripe',
      status: response.charged ? 'paid' : 'failed',
      amount: response.amount_cents,
      currency: response.currency_code,
    };
  }

  public async cancel(id: string): Promise<PaymentResult> {
    const response = await this.sdk.refund(id);
    return {
      id: response.charge_id,
      provider: 'stripe',
      status: response.refunded ? 'cancelled' : 'failed',
      amount: 0,
      currency: '',
    };
  }
}
