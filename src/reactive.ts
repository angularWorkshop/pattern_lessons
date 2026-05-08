// Мини-Vue: reactive(obj) и effect(fn) на встроенном JS Proxy.
//
// Идея:
// - reactive(obj) возвращает Proxy. На read трекаем зависимость от current effect.
// - effect(fn) выставляет себя как current, вызывает fn (тот читает поля, они трекаются),
//   снимает себя. Когда поля меняются (через set), вызываем все зависимые effect-ы.
//
// TODO: реализовать:
// 1. Глобальный `let currentEffect: (() => void) | null = null`
// 2. Глобальная WeakMap<object, Map<PropertyKey, Set<() => void>>> — depsMap
// 3. reactive(target) — возвращает Proxy с обработчиками:
//    - get: если currentEffect — добавить его в depsMap для (target, prop). Вернуть значение
//    - set: записать значение, потом запустить все effect-ы из depsMap для (target, prop)
// 4. effect(fn): сохранить currentEffect, вызвать fn, восстановить currentEffect.
//    Вернуть функцию-cleanup, которая удалит эффект из всех Set.

export function reactive<T extends object>(_target: T): T {
  throw new Error('reactive is not implemented yet');
}

export function effect(_fn: () => void): () => void {
  throw new Error('effect is not implemented yet');
}
