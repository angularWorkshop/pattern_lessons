import type { Order } from './order-types.js';

export class InvoiceGenerator {
  public generate(order: Order, total: number): string {
    const itemLines = order.items
      .map((item) => `  - ${item.sku} x${item.quantity} @ $${item.price.toFixed(2)}`)
      .join('\n');
    return [
      `INVOICE`,
      `Order: ${order.id}`,
      `Customer: ${order.customerEmail}`,
      itemLines,
      `Total: $${total.toFixed(2)}`,
    ].join('\n');
  }
}
