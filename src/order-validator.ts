import type { Order } from './order-types.js';

export class OrderValidator {
  public validate(order: Order): void {
    if (order.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }
    if (!order.customerEmail.includes('@')) {
      throw new Error('Invalid customer email');
    }
    for (const item of order.items) {
      if (item.price <= 0) {
        throw new Error(`Item ${item.sku} has non-positive price`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Item ${item.sku} has non-positive quantity`);
      }
    }
  }
}
