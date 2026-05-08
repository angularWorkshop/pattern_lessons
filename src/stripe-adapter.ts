import type { PaymentProvider, PaymentResult } from './payment-provider.js';
import { StripeSDK } from './stripe-sdk.js';

// TODO: обернуть StripeSDK так, чтобы класс реализовывал PaymentProvider.
// pay(amount, currency) — позвать sdk.charge, превратить ответ в PaymentResult.
// cancel(id) — позвать sdk.refund, превратить ответ.
export class StripeAdapter implements PaymentProvider {
  private readonly sdk: StripeSDK;

  public constructor(sdk: StripeSDK = new StripeSDK()) {
    this.sdk = sdk;
  }

  public async pay(_amount: number, _currency: string): Promise<PaymentResult> {
    throw new Error('StripeAdapter.pay is not implemented yet');
  }

  public async cancel(_id: string): Promise<PaymentResult> {
    throw new Error('StripeAdapter.cancel is not implemented yet');
  }
}
