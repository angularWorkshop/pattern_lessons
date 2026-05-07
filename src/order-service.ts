import type { Order, OrderResult } from './order-types.js';
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
  private readonly validator: OrderValidator;
  private readonly calculator: DiscountCalculator;
  private readonly repository: OrderRepository;
  private readonly notifier: EmailNotifier;
  private readonly invoiceGenerator: InvoiceGenerator;

  public constructor(deps: OrderServiceDeps = {}) {
    this.validator = deps.validator ?? new OrderValidator();
    this.calculator = deps.calculator ?? new DiscountCalculator();
    this.repository = deps.repository ?? new OrderRepository();
    this.notifier = deps.notifier ?? new EmailNotifier();
    this.invoiceGenerator = deps.invoiceGenerator ?? new InvoiceGenerator();
  }

  public placeOrder(order: Order): OrderResult {
    this.validator.validate(order);
    const { total } = this.calculator.calculate(order);
    this.repository.save(order);
    this.notifier.send(
      order.customerEmail,
      `Order ${order.id} confirmed. Total: $${total.toFixed(2)}`,
    );
    const invoice = this.invoiceGenerator.generate(order, total);
    return { orderId: order.id, total, invoice };
  }

  public findOrder(id: string): Order | undefined {
    return this.repository.find(id);
  }

  public getSentEmails(): readonly { to: string; body: string }[] {
    return this.notifier.getSent();
  }
}
