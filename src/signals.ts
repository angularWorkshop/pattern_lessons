export type Getter<T> = () => T;
export type Setter<T> = (next: T) => void;

type EffectFn = () => void;

let currentEffect: EffectFn | null = null;

export function createSignal<T>(initial: T): readonly [Getter<T>, Setter<T>] {
  let value = initial;
  const subscribers = new Set<EffectFn>();

  const get: Getter<T> = () => {
    if (currentEffect) subscribers.add(currentEffect);
    return value;
  };
  const set: Setter<T> = (next) => {
    value = next;
    for (const sub of [...subscribers]) {
      sub();
    }
  };
  return [get, set] as const;
}

export function effect(fn: EffectFn): void {
  const previous = currentEffect;
  currentEffect = fn;
  try {
    fn();
  } finally {
    currentEffect = previous;
  }
}
