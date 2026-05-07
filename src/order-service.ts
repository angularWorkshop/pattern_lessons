import type { Order, OrderResult, SentEmail } from './order-types.js';
import { OrderValidator } from './order-validator.js';
import { DiscountCalculator } from './discount-calculator.js';
import { OrderRepository } from './order-repository.js';
import { EmailNotifier } from './email-notifier.js';
import { InvoiceGenerator } from './invoice-generator.js';

export interface OrderServiceDeps {
  validator?: OrderValidator;
  calculator?: DiscountCalculator;
  repository?: OrderRepository;
  notifier?: EmailNotifier;
  invoiceGenerator?: InvoiceGenerator;
}

export class OrderService {
  private readonly orders = new Map<string, Order>();
  private readonly sentEmails: SentEmail[] = [];

  // TODO: store the injected deps and use them in placeOrder.
  // Right now the constructor accepts them but ignores them — this is a god class.
  public constructor(_deps: OrderServiceDeps = {}) {}

  public placeOrder(order: Order): OrderResult {
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

    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const rate =
      order.customerType === 'premium' ? 0.10
        : order.customerType === 'member' ? 0.05
        : 0;
    const total = Math.round((subtotal - subtotal * rate) * 100) / 100;

    this.orders.set(order.id, order);

    const body = `Order ${order.id} confirmed. Total: $${total.toFixed(2)}`;
    this.sentEmails.push({ to: order.customerEmail, body });

    const itemLines = order.items
      .map((item) => `  - ${item.sku} x${item.quantity} @ $${item.price.toFixed(2)}`)
      .join('\n');
    const invoice = [
      `INVOICE`,
      `Order: ${order.id}`,
      `Customer: ${order.customerEmail}`,
      itemLines,
      `Total: $${total.toFixed(2)}`,
    ].join('\n');

    return { orderId: order.id, total, invoice };
  }

  public findOrder(id: string): Order | undefined {
    return this.orders.get(id);
  }

  public getSentEmails(): readonly SentEmail[] {
    return this.sentEmails;
  }
}
