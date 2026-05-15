import {
  addToCart,
  startCheckout,
  pay,
  ship,
  deliver,
  cancel,
  type OrderState,
} from '../../src/order.js';

const empty: OrderState = { status: 'cart', items: [] };

describe('Order — happy path', () => {
  it('cart → checkout → paid → shipped → delivered', () => {
    let state: OrderState = empty;
    state = addToCart(state, 'sku-1');
    state = addToCart(state, 'sku-2');
    state = startCheckout(state, 100);
    state = pay(state, 1000);
    state = ship(state, 'TRACK-1');
    state = deliver(state, 2000);
    expect(state.status).toBe('delivered');
    if (state.status === 'delivered') {
      expect(state.deliveredAt).toBe(2000);
      expect(state.total).toBe(100);
    }
  });
});

describe('Order — illegal transitions throw', () => {
  it('cannot pay from cart', () => {
    expect(() => pay(empty, 1)).toThrow();
  });

  it('cannot ship from cart', () => {
    expect(() => ship(empty, 'T-1')).toThrow();
  });

  it('cannot deliver from checkout', () => {
    const cs: OrderState = { status: 'checkout', items: [], total: 50 };
    expect(() => deliver(cs, 1)).toThrow();
  });
});

describe('Order — cancellation', () => {
  it('cancels from cart with zero refund', () => {
    const state = cancel(empty);
    expect(state.status).toBe('cancelled');
    if (state.status === 'cancelled') expect(state.refund).toBe(0);
  });

  it('cancels from checkout with zero refund', () => {
    const cs: OrderState = { status: 'checkout', items: [], total: 50 };
    const state = cancel(cs);
    if (state.status === 'cancelled') expect(state.refund).toBe(0);
  });

  it('cancels from paid with total refund', () => {
    const paid: OrderState = { status: 'paid', items: [], total: 50, paidAt: 1 };
    const state = cancel(paid);
    if (state.status === 'cancelled') expect(state.refund).toBe(50);
  });

  it('cannot cancel from shipped', () => {
    const shipped: OrderState = { status: 'shipped', items: [], total: 1, trackingId: 'x' };
    expect(() => cancel(shipped)).toThrow();
  });

  it('cannot cancel from delivered', () => {
    const delivered: OrderState = { status: 'delivered', items: [], total: 1, deliveredAt: 1 };
    expect(() => cancel(delivered)).toThrow();
  });
});
