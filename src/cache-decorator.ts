const caches = new WeakMap<object, Map<string, unknown>>();

export function cache<This extends object, Args extends unknown[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args): Return {
    let perInstance = caches.get(this);
    if (!perInstance) {
      perInstance = new Map();
      caches.set(this, perInstance);
    }
    const key = JSON.stringify(args);
    if (perInstance.has(key)) {
      return perInstance.get(key) as Return;
    }
    const result = originalMethod.call(this, ...args);
    perInstance.set(key, result);
    return result;
  };
}
