import { createLazy, type ExpensiveResource } from '../../src/lazy-proxy.js';

const buildResource = (initCounter: { count: number }): (() => ExpensiveResource) => () => {
  initCounter.count++;
  const data = Array.from({ length: 1000 }, (_, i) => i);
  return {
    id: 'res-1',
    data,
    compute() {
      return data.reduce((s, n) => s + n, 0);
    },
  };
};

describe('createLazy — proxy that defers initialization', () => {
  it('factory is NOT called on createLazy()', () => {
    const counter = { count: 0 };
    createLazy(buildResource(counter));
    expect(counter.count).toBe(0);
  });

  it('factory IS called on first property access', () => {
    const counter = { count: 0 };
    const lazy = createLazy(buildResource(counter));
    void lazy.id;
    expect(counter.count).toBe(1);
  });

  it('factory is NOT called twice on subsequent access', () => {
    const counter = { count: 0 };
    const lazy = createLazy(buildResource(counter));
    void lazy.id;
    void lazy.data;
    void lazy.compute();
    expect(counter.count).toBe(1);
  });

  it('proxy returns the same property values as the factory result', () => {
    const counter = { count: 0 };
    const lazy = createLazy(buildResource(counter));
    expect(lazy.id).toBe('res-1');
    expect(lazy.data.length).toBe(1000);
  });

  it('method calls go through to the cached object', () => {
    const counter = { count: 0 };
    const lazy = createLazy(buildResource(counter));
    expect(lazy.compute()).toBe((1000 * 999) / 2);
  });

  it('two lazy proxies are independent', () => {
    const c1 = { count: 0 };
    const c2 = { count: 0 };
    const a = createLazy(buildResource(c1));
    const b = createLazy(buildResource(c2));
    void a.id;
    expect(c1.count).toBe(1);
    expect(c2.count).toBe(0);
    void b.id;
    expect(c2.count).toBe(1);
  });
});
