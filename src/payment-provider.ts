// Унифицированный контракт платёжки. Высокоуровневый код знает только про него.
export interface PaymentResult {
  id: string;
  provider: 'stripe' | 'paypal';
  status: 'paid' | 'cancelled' | 'failed';
  amount: number;
  currency: string;
}

export interface PaymentProvider {
  pay(amount: number, currency: string): Promise<PaymentResult>;
  cancel(id: string): Promise<PaymentResult>;
}
