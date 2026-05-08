import { cache } from './cache-decorator.js';

// Тестовый класс с методом, помеченным @cache.
// `calls` — счётчик вызовов original-метода для проверки в тестах.
export class Calculator {
  public calls = 0;

  @cache
  public compute(a: number, b: number): number {
    this.calls++;
    return a + b;
  }

  @cache
  public greet(name: string): string {
    this.calls++;
    return `Hello, ${name}!`;
  }
}
