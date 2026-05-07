import { OrderService } from '../../src/order-service.js';
import type { Order } from '../../src/order-types.js';

const baseOrder: Order = {
  id: 'ord-1',
  customerEmail: 'jane@example.com',
  customerType: 'guest',
  items: [
    { sku: 'sku-a', price: 10, quantity: 2 },
    { sku: 'sku-b', price: 5, quantity: 1 },
  ],
};

describe('OrderService — end-to-end behavior', () => {
  it('places a guest order with no discount', () => {
    const service = new OrderService();
    const result = service.placeOrder(baseOrder);

    expect(result.orderId).toBe('ord-1');
    expect(result.total).toBe(25);
    expect(result.invoice).toContain('INVOICE');
    expect(result.invoice).toContain('Order: ord-1');
    expect(result.invoice).toContain('Total: $25.00');
  });

  it('applies a 5% discount for member customers', () => {
    const service = new OrderService();
    const result = service.placeOrder({ ...baseOrder, customerType: 'member' });
    expect(result.total).toBe(23.75);
  });

  it('applies a 10% discount for premium customers', () => {
    const service = new OrderService();
    const result = service.placeOrder({ ...baseOrder, customerType: 'premium' });
    expect(result.total).toBe(22.5);
  });

  it('persists the order so it can be retrieved by id', () => {
    const service = new OrderService();
    service.placeOrder(baseOrder);
    expect(service.findOrder('ord-1')?.id).toBe('ord-1');
    expect(service.findOrder('missing')).toBeUndefined();
  });

  it('records a confirmation email for the customer', () => {
    const service = new OrderService();
    service.placeOrder(baseOrder);
    const sent = service.getSentEmails();
    expect(sent).toHaveLength(1);
    expect(sent[0]?.to).toBe('jane@example.com');
    expect(sent[0]?.body).toContain('Order ord-1');
    expect(sent[0]?.body).toContain('$25.00');
  });

  it('rejects an order with no items', () => {
    const service = new OrderService();
    expect(() => service.placeOrder({ ...baseOrder, items: [] })).toThrow();
  });

  it('rejects an order with an invalid email', () => {
    const service = new OrderService();
    expect(() => service.placeOrder({ ...baseOrder, customerEmail: 'no-at-sign' })).toThrow();
  });

  it('rejects an order item with non-positive price', () => {
    const service = new OrderService();
    expect(() =>
      service.placeOrder({
        ...baseOrder,
        items: [{ sku: 'bad', price: 0, quantity: 1 }],
      }),
    ).toThrow();
  });

  it('rejects an order item with non-positive quantity', () => {
    const service = new OrderService();
    expect(() =>
      service.placeOrder({
        ...baseOrder,
        items: [{ sku: 'bad', price: 10, quantity: 0 }],
      }),
    ).toThrow();
  });
});
