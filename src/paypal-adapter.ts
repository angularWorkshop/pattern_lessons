import type { PaymentProvider, PaymentResult } from './payment-provider.js';
import type { PayPalPayment } from './paypal-sdk.js';
import { PayPalSDK } from './paypal-sdk.js';

const STATE_TO_STATUS: Record<PayPalPayment['state'], PaymentResult['status']> = {
  APPROVED: 'paid',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
};

export class PayPalAdapter implements PaymentProvider {
  private readonly sdk: PayPalSDK;

  public constructor(sdk: PayPalSDK = new PayPalSDK()) {
    this.sdk = sdk;
  }

  public async pay(amount: number, currency: string): Promise<PaymentResult> {
    const payment = await this.sdk.createPayment(amount, currency);
    return this.toResult(payment);
  }

  public async cancel(id: string): Promise<PaymentResult> {
    const payment = await this.sdk.cancelPayment(id);
    return this.toResult(payment);
  }

  private toResult(payment: PayPalPayment): PaymentResult {
    return {
      id: payment.paymentId,
      provider: 'paypal',
      status: STATE_TO_STATUS[payment.state],
      amount: payment.total,
      currency: payment.currency,
    };
  }
}
