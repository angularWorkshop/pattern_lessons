// Lazy-loading proxy: возвращает объект, у которого тяжёлая инициализация
// откладывается до первого реального обращения к полю или методу.
// Под капотом — встроенный JS Proxy.

export interface ExpensiveResource {
  readonly id: string;
  readonly data: readonly number[];
  compute(): number;
}

// TODO: реализовать createLazy(factory).
// Возвращает Proxy, который:
// - При первом get на любое поле вызывает factory() и кэширует результат
// - Все последующие get'ы идут к кэшу
// - factory не должна вызываться при создании прокси
// - Счётчик initCount передаётся снаружи (для тестов)
//
// Используется паттерн:
//   let cached: T | null = null;
//   return new Proxy({} as T, {
//     get(target, prop) {
//       if (!cached) cached = factory();
//       return cached[prop];
//     }
//   });
export function createLazy<T extends object>(_factory: () => T): T {
  throw new Error('createLazy is not implemented yet');
}
