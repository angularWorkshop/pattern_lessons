type EffectFn = () => void;

interface ActiveEffect {
  fn: EffectFn;
  deps: Set<Set<EffectFn>>;
}

let currentEffect: ActiveEffect | null = null;
const depsMap = new WeakMap<object, Map<PropertyKey, Set<EffectFn>>>();

function track(target: object, key: PropertyKey): void {
  if (!currentEffect) return;
  let perTarget = depsMap.get(target);
  if (!perTarget) {
    perTarget = new Map();
    depsMap.set(target, perTarget);
  }
  let perKey = perTarget.get(key);
  if (!perKey) {
    perKey = new Set();
    perTarget.set(key, perKey);
  }
  perKey.add(currentEffect.fn);
  currentEffect.deps.add(perKey);
}

function trigger(target: object, key: PropertyKey): void {
  const perTarget = depsMap.get(target);
  if (!perTarget) return;
  const perKey = perTarget.get(key);
  if (!perKey) return;
  for (const effectFn of [...perKey]) {
    if (currentEffect && effectFn === currentEffect.fn) continue;
    effectFn();
  }
}

export function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(t, key, receiver): unknown {
      track(t, key);
      return Reflect.get(t, key, receiver);
    },
    set(t, key, value, receiver): boolean {
      const ok = Reflect.set(t, key, value, receiver);
      trigger(t, key);
      return ok;
    },
  });
}

export function effect(fn: EffectFn): () => void {
  const active: ActiveEffect = { fn, deps: new Set() };
  const previous = currentEffect;
  currentEffect = active;
  try {
    fn();
  } finally {
    currentEffect = previous;
  }
  return () => {
    for (const dep of active.deps) {
      dep.delete(fn);
    }
    active.deps.clear();
  };
}
