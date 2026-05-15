// Минимальная реализация signals в стиле Solid/Angular.
// createSignal<T>(initial) → [getter, setter].
// effect(fn) автоматически подписывается на signal-ы, которые читает.
// При вызове setter все зависимые effect-ы пересчитываются.

export type Getter<T> = () => T;
export type Setter<T> = (next: T) => void;

type EffectFn = () => void;

// Модульный state.
let currentEffect: EffectFn | null = null;

// TODO: реализовать createSignal и effect.
//
// createSignal<T>(initial):
//   - Локальные: значение value и subscribers: Set<EffectFn>
//   - getter: если есть currentEffect — добавить его в subscribers; вернуть value
//   - setter: записать value, пройтись по копии subscribers и вызвать каждый
//   - return [getter, setter] as const
//
// effect(fn):
//   - previous = currentEffect
//   - currentEffect = fn
//   - try { fn() } finally { currentEffect = previous }
//   - Внутри fn все обращения к getter-ам затрекают fn в subscribers.

export function createSignal<T>(_initial: T): readonly [Getter<T>, Setter<T>] {
  throw new Error('createSignal is not implemented yet');
}

export function effect(_fn: EffectFn): void {
  throw new Error('effect is not implemented yet');
}
