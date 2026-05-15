# Topic 19 · Exercise 19.2 — Observer: signals на 50 строк · Solution

Реализуй упрощённые signals в стиле Solid/Angular. `createSignal` возвращает геттер и сеттер; `effect` автоматически подписывается на signal-ы, которые читает.

## Что нужно сделать

В `src/signals.ts`:

```ts
let currentEffect: EffectFn | null = null;

export function createSignal<T>(initial: T) {
  let value = initial;
  const subscribers = new Set<EffectFn>();

  const get: Getter<T> = () => {
    if (currentEffect) subscribers.add(currentEffect);
    return value;
  };
  const set: Setter<T> = (next) => {
    value = next;
    for (const sub of [...subscribers]) sub();
  };
  return [get, set] as const;
}

export function effect(fn: EffectFn): void {
  const previous = currentEffect;
  currentEffect = fn;
  try { fn(); } finally { currentEffect = previous; }
}
```

## Главное

Когда `effect(fn)` запускается, в `currentEffect` стоит `fn`. Любой `getter()` внутри `fn` видит этого «текущего» и добавляет в свои subscribers. Потом сеттер обходит subscribers и заново вызывает каждого.

## Критерии сдачи

- 7 тестов в `tests/unit/signals.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
