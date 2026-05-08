export interface ExpensiveResource {
  readonly id: string;
  readonly data: readonly number[];
  compute(): number;
}

export function createLazy<T extends object>(factory: () => T): T {
  let cached: T | null = null;
  const ensureLoaded = (): T => {
    if (cached === null) {
      cached = factory();
    }
    return cached;
  };
  return new Proxy({} as T, {
    get(_target, prop, receiver): unknown {
      const target = ensureLoaded();
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === 'function') {
        return value.bind(target);
      }
      return value;
    },
  });
}
