export function deepClone<T>(value: T): T {
  return cloneWithCache(value, new WeakMap<object, unknown>());
}

function cloneWithCache<T>(value: T, cache: WeakMap<object, unknown>): T {
  if (value === null || value === undefined) {
    return value;
  }
  if (typeof value !== 'object') {
    return value;
  }

  const obj = value as object;
  const cached = cache.get(obj);
  if (cached !== undefined) {
    return cached as T;
  }

  if (value instanceof Date) {
    const cloned = new Date(value.getTime());
    cache.set(obj, cloned);
    return cloned as T;
  }

  if (value instanceof Map) {
    const cloned = new Map();
    cache.set(obj, cloned);
    for (const [k, v] of value as Map<unknown, unknown>) {
      cloned.set(cloneWithCache(k, cache), cloneWithCache(v, cache));
    }
    return cloned as T;
  }

  if (value instanceof Set) {
    const cloned = new Set();
    cache.set(obj, cloned);
    for (const item of value as Set<unknown>) {
      cloned.add(cloneWithCache(item, cache));
    }
    return cloned as T;
  }

  if (Array.isArray(value)) {
    const cloned: unknown[] = [];
    cache.set(obj, cloned);
    for (let i = 0; i < value.length; i++) {
      cloned[i] = cloneWithCache(value[i], cache);
    }
    return cloned as T;
  }

  const cloned: Record<string, unknown> = {};
  cache.set(obj, cloned);
  for (const key of Object.keys(value as object)) {
    cloned[key] = cloneWithCache((value as Record<string, unknown>)[key], cache);
  }
  return cloned as T;
}
