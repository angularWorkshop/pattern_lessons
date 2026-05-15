export function* fibonacci(): Generator<number, void, unknown> {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export function* naturals(): Generator<number, void, unknown> {
  let n = 0;
  while (true) {
    yield n++;
  }
}

export function take<T>(gen: Iterable<T>, n: number): T[] {
  const result: T[] = [];
  if (n <= 0) return result;
  // Получаем итератор и шагаем next() — это не закрывает генератор по выходу,
  // в отличие от for..of + break, который вызывает iterator.return().
  const iterator = gen[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    const step = iterator.next();
    if (step.done) break;
    result.push(step.value);
  }
  return result;
}

export function map<T, U>(gen: Iterable<T>, fn: (value: T) => U): Iterable<U> {
  return {
    *[Symbol.iterator](): Generator<U, void, unknown> {
      for (const value of gen) {
        yield fn(value);
      }
    },
  };
}
