// Функциональный аналог Template Method — pipe.
// Скелет "вызвать шаги по порядку" универсальный, конкретные шаги передаются массивом.
// TypeScript должен проверить, что тип выхода каждого шага = тип входа следующего.

// TODO: реализовать pipeline с overloads для типобезопасной композиции.
// Подсказка: declare два overload (для 1 и 2 шагов чтобы было видно), потом дженерик-fallback.
// Простой вариант: pipeline(...steps) с типом, в котором первый шаг (A → B), затем шаги
// собираются через rest и возвращается функция (A) => Last.

// Простейшая реализация — рантайм одинаковый, типы покрываются через перегрузки.

export function pipeline<A, B>(s1: (a: A) => B): (a: A) => B;
export function pipeline<A, B, C>(s1: (a: A) => B, s2: (b: B) => C): (a: A) => C;
export function pipeline<A, B, C, D>(
  s1: (a: A) => B,
  s2: (b: B) => C,
  s3: (c: C) => D,
): (a: A) => D;
export function pipeline<A, B, C, D, E>(
  s1: (a: A) => B,
  s2: (b: B) => C,
  s3: (c: C) => D,
  s4: (d: D) => E,
): (a: A) => E;
export function pipeline(..._steps: ((value: unknown) => unknown)[]): (value: unknown) => unknown {
  throw new Error('pipeline is not implemented yet');
}
