// Бесконечные lazy-последовательности через generators.
// Сами по себе они никогда не заканчиваются — но утилиты take/map
// берут конечный префикс, не вычисляя лишнего.

// TODO: реализовать fibonacci() — бесконечный генератор.
// Первые значения: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// Внутри цикл while (true) с yield на каждой итерации.
export function* fibonacci(): Generator<number, void, unknown> {
  throw new Error('fibonacci is not implemented yet');
}

// TODO: реализовать naturals() — бесконечный 0, 1, 2, 3, ...
export function* naturals(): Generator<number, void, unknown> {
  throw new Error('naturals is not implemented yet');
}

// TODO: take(gen, n) — забрать первые n значений из (возможно бесконечного) генератора.
// Возвращает обычный массив.
export function take<T>(_gen: Iterable<T>, _n: number): T[] {
  throw new Error('take is not implemented yet');
}

// TODO: map(gen, fn) — ленивый map. Возвращает новый Iterable<U>.
// Реализовать через generator-обёртку: function* () { for (const x of gen) yield fn(x); }
export function map<T, U>(_gen: Iterable<T>, _fn: (value: T) => U): Iterable<U> {
  throw new Error('map is not implemented yet');
}
