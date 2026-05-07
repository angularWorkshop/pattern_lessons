import { OrderValidator } from '../../src/order-validator.js';
import { DiscountCalculator } from '../../src/discount-calculator.js';
import { OrderRepository } from '../../src/order-repository.js';
import { EmailNotifier } from '../../src/email-notifier.js';
import { InvoiceGenerator } from '../../src/invoice-generator.js';
import { OrderService } from '../../src/order-service.js';
import type { Order } from '../../src/order-types.js';

const validOrder: Order = {
  id: 'ord-42',
  customerEmail: 'lee@example.com',
  customerType: 'member',
  items: [{ sku: 'sku-x', price: 20, quantity: 3 }],
};

describe('OrderValidator — single responsibility', () => {
  it('passes a valid order without throwing', () => {
    const validator = new OrderValidator();
    expect(() => validator.validate(validOrder)).not.toThrow();
  });

  it('rejects empty items', () => {
    const validator = new OrderValidator();
    expect(() => validator.validate({ ...validOrder, items: [] })).toThrow();
  });

  it('rejects malformed email', () => {
    const validator = new OrderValidator();
    expect(() => validator.validate({ ...validOrder, customerEmail: 'broken' })).toThrow();
  });

  it('rejects non-positive price', () => {
    const validator = new OrderValidator();
    expect(() =>
      validator.validate({
        ...validOrder,
        items: [{ sku: 'x', price: 0, quantity: 1 }],
      }),
    ).toThrow();
  });

  it('rejects non-positive quantity', () => {
    const validator = new OrderValidator();
    expect(() =>
      validator.validate({
        ...validOrder,
        items: [{ sku: 'x', price: 10, quantity: 0 }],
      }),
    ).toThrow();
  });
});

describe('DiscountCalculator — single responsibility', () => {
  it('returns subtotal/discount/total for a guest', () => {
    const calc = new DiscountCalculator();
    const breakdown = calc.calculate({ ...validOrder, customerType: 'guest' });
    expect(breakdown.subtotal).toBe(60);
    expect(breakdown.discount).toBe(0);
    expect(breakdown.total).toBe(60);
  });

  it('applies 5% discount for a member', () => {
    const calc = new DiscountCalculator();
    const breakdown = calc.calculate({ ...validOrder, customerType: 'member' });
    expect(breakdown.discount).toBe(3);
    expect(breakdown.total).toBe(57);
  });

  it('applies 10% discount for a premium customer', () => {
    const calc = new DiscountCalculator();
    const breakdown = calc.calculate({ ...validOrder, customerType: 'premium' });
    expect(breakdown.discount).toBe(6);
    expect(breakdown.total).toBe(54);
  });
});

describe('OrderRepository — single responsibility', () => {
  it('saves and finds an order by id', () => {
    const repo = new OrderRepository();
    repo.save(validOrder);
    expect(repo.find('ord-42')?.id).toBe('ord-42');
  });

  it('returns undefined for an unknown id', () => {
    const repo = new OrderRepository();
    expect(repo.find('nope')).toBeUndefined();
  });
});

describe('EmailNotifier — single responsibility', () => {
  it('records sent emails so they can be inspected', () => {
    const notifier = new EmailNotifier();
    notifier.send('lee@example.com', 'hi');
    notifier.send('lee@example.com', 'hi again');
    const sent = notifier.getSent();
    expect(sent).toHaveLength(2);
    expect(sent[0]).toEqual({ to: 'lee@example.com', body: 'hi' });
  });
});

describe('InvoiceGenerator — single responsibility', () => {
  it('renders an invoice with order id, customer, items and total', () => {
    const gen = new InvoiceGenerator();
    const text = gen.generate(validOrder, 57);
    expect(text).toContain('INVOICE');
    expect(text).toContain('Order: ord-42');
    expect(text).toContain('Customer: lee@example.com');
    expect(text).toContain('sku-x x3 @ $20.00');
    expect(text).toContain('Total: $57.00');
  });
});

describe('OrderService delegates to its collaborators', () => {
  it('runs validation through the injected OrderValidator', () => {
    class SpyValidator extends OrderValidator {
      public override validate(): void {
        throw new Error('SPY-VALIDATE-CALLED');
      }
    }
    const service = new OrderService({ validator: new SpyValidator() });
    expect(() => service.placeOrder(validOrder)).toThrow(/SPY-VALIDATE-CALLED/);
  });

  it('persists the order through the injected OrderRepository', () => {
    const repo = new OrderRepository();
    const service = new OrderService({ repository: repo });
    service.placeOrder(validOrder);
    expect(repo.find('ord-42')?.id).toBe('ord-42');
  });

  it('routes confirmation through the injected EmailNotifier', () => {
    const notifier = new EmailNotifier();
    const service = new OrderService({ notifier });
    service.placeOrder(validOrder);
    expect(notifier.getSent()).toHaveLength(1);
    expect(notifier.getSent()[0]?.to).toBe('lee@example.com');
  });
});
