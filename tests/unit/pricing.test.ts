import {
  Cart,
  guestStrategy,
  memberStrategy,
  premiumStrategy,
} from '../../src/pricing.js';

const buildCart = (...prices: number[]): Cart => {
  const cart = new Cart();
  prices.forEach((p, i) => cart.add({ sku: `sku-${i}`, price: p, quantity: 1 }));
  return cart;
};

describe('Pricing — guest', () => {
  it('no discount, shipping 10', () => {
    const cart = buildCart(40, 60);
    const out = cart.calculate(guestStrategy);
    expect(out).toEqual({ subtotal: 100, discount: 0, shipping: 10, total: 110 });
  });

  it('empty cart has zero everywhere', () => {
    const out = new Cart().calculate(guestStrategy);
    expect(out).toEqual({ subtotal: 0, discount: 0, shipping: 0, total: 0 });
  });
});

describe('Pricing — member', () => {
  it('5% off, shipping 10', () => {
    const cart = buildCart(100);
    const out = cart.calculate(memberStrategy);
    expect(out).toEqual({ subtotal: 100, discount: 5, shipping: 10, total: 105 });
  });
});

describe('Pricing — premium', () => {
  it('10% off, free shipping', () => {
    const cart = buildCart(200);
    const out = cart.calculate(premiumStrategy);
    expect(out).toEqual({ subtotal: 200, discount: 20, shipping: 0, total: 180 });
  });
});

describe('Pricing — strategy is independent of Cart', () => {
  it('the same cart yields different totals depending on strategy', () => {
    const cart = buildCart(50, 50);
    expect(cart.calculate(guestStrategy).total).toBe(110);
    expect(cart.calculate(memberStrategy).total).toBe(105);
    expect(cart.calculate(premiumStrategy).total).toBe(90);
  });
});

describe('Pricing — multiple items', () => {
  it('counts quantities correctly', () => {
    const cart = new Cart();
    cart.add({ sku: 'a', price: 30, quantity: 2 });
    cart.add({ sku: 'b', price: 20, quantity: 3 });
    expect(cart.calculate(guestStrategy).subtotal).toBe(120);
    expect(cart.calculate(guestStrategy).total).toBe(130);
  });
});
