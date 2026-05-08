// Чужой SDK. Стиль: charge / refund, поля называются по-своему.
// Менять его нельзя — это сторонний пакет.
export interface StripeChargeResponse {
  charge_id: string;
  amount_cents: number;
  currency_code: string;
  charged: boolean;
}

export interface StripeRefundResponse {
  charge_id: string;
  refunded: boolean;
}

export class StripeSDK {
  private readonly charges = new Map<string, { amount: number; currency: string; charged: boolean }>();
  private nextId = 1;

  public async charge(amount: number, currency: string): Promise<StripeChargeResponse> {
    const id = `ch_${this.nextId++}`;
    this.charges.set(id, { amount, currency, charged: true });
    return { charge_id: id, amount_cents: amount, currency_code: currency, charged: true };
  }

  public async refund(chargeId: string): Promise<StripeRefundResponse> {
    const ch = this.charges.get(chargeId);
    if (!ch) {
      return { charge_id: chargeId, refunded: false };
    }
    ch.charged = false;
    return { charge_id: chargeId, refunded: true };
  }
}
