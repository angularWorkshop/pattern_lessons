import type { PaymentProvider, PaymentResult } from './payment-provider.js';
import { PayPalSDK } from './paypal-sdk.js';

// TODO: обернуть PayPalSDK под PaymentProvider.
// pay → createPayment, cancel → cancelPayment.
// Переводить APPROVED → 'paid', CANCELLED → 'cancelled', FAILED → 'failed'.
export class PayPalAdapter implements PaymentProvider {
  private readonly sdk: PayPalSDK;

  public constructor(sdk: PayPalSDK = new PayPalSDK()) {
    this.sdk = sdk;
  }

  public async pay(_amount: number, _currency: string): Promise<PaymentResult> {
    throw new Error('PayPalAdapter.pay is not implemented yet');
  }

  public async cancel(_id: string): Promise<PaymentResult> {
    throw new Error('PayPalAdapter.cancel is not implemented yet');
  }
}
