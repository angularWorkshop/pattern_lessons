// Stage 3 TypeScript method decorator @cache.
// Кэширует результаты метода по аргументам (через JSON.stringify).
// Кэш — отдельный на каждый экземпляр класса (хранится в WeakMap).

// TODO: реализовать. Сигнатура декоратора метода в Stage 3:
// function decorator(
//   originalMethod: (this: T, ...args: A) => R,
//   context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>
// ): (this: T, ...args: A) => R
//
// Внутри: WeakMap<object, Map<string, R>>. Ключ args — JSON.stringify(args).
// Возвращаемая функция:
// 1. Берёт/создаёт map для this.
// 2. Если есть запись по key — возвращает.
// 3. Иначе вызывает originalMethod, кладёт в map, возвращает.
export function cache<This extends object, Args extends unknown[], Return>(
  _originalMethod: (this: This, ...args: Args) => Return,
  _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
): (this: This, ...args: Args) => Return {
  return function (this: This): Return {
    throw new Error('cache decorator is not implemented yet');
  };
}
