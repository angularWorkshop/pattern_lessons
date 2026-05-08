// Чужой SDK. Стиль: createPayment / cancelPayment, поля называются по-своему.
// Менять его нельзя — это сторонний пакет.
export interface PayPalPayment {
  paymentId: string;
  total: number;
  currency: string;
  state: 'APPROVED' | 'CANCELLED' | 'FAILED';
}

export class PayPalSDK {
  private readonly payments = new Map<string, PayPalPayment>();
  private nextId = 1;

  public async createPayment(total: number, currency: string): Promise<PayPalPayment> {
    const payment: PayPalPayment = {
      paymentId: `PP-${this.nextId++}`,
      total,
      currency,
      state: 'APPROVED',
    };
    this.payments.set(payment.paymentId, payment);
    return payment;
  }

  public async cancelPayment(paymentId: string): Promise<PayPalPayment> {
    const payment = this.payments.get(paymentId);
    if (!payment) {
      return { paymentId, total: 0, currency: 'USD', state: 'FAILED' };
    }
    payment.state = 'CANCELLED';
    return payment;
  }
}
