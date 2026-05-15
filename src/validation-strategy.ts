// Strategy в самом естественном для TS виде: алгоритм = функция.
// Валидаторы — это просто функции (value) => string[] (массив ошибок).
// Комбинатор combine собирает несколько в одну стратегию.

export type ValidationStrategy<T> = (value: T) => readonly string[];

// Готовые валидаторы для строк.
export const required: ValidationStrategy<string> = (value) =>
  value.length === 0 ? ['required'] : [];

export const minLength = (n: number): ValidationStrategy<string> => (value) =>
  value.length < n ? [`min-length-${n}`] : [];

export const pattern = (re: RegExp, label: string): ValidationStrategy<string> => (value) =>
  re.test(value) ? [] : [`pattern-${label}`];

// TODO: реализовать combine(...strategies).
// Возвращает стратегию, которая прогоняет все validators и склеивает ошибки.
// Все запускаются — не short-circuit. Это часто хочется, чтобы вернуть пользователю
// все проблемы сразу, а не показывать по одной за раз.
export function combine<T>(..._strategies: readonly ValidationStrategy<T>[]): ValidationStrategy<T> {
  throw new Error('combine is not implemented yet');
}
