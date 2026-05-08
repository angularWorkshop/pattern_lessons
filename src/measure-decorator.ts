// Stage 3 method decorator factory @measure(reporter).
// Меряет время выполнения метода и зовёт reporter.
// Работает на sync и async методах. На ошибке всё равно отчитывается, но пробрасывает.

export interface MeasureReport {
  method: string;
  durationMs: number;
  ok: boolean;
}

export type Reporter = (report: MeasureReport) => void;

// TODO: реализовать. measure — это decorator factory: принимает reporter,
// возвращает декоратор. Декоратор оборачивает метод так, чтобы:
// 1. Засечь Date.now() до вызова
// 2. Позвать original
// 3. Если вернулась Promise — дождаться, потом отчитаться
// 4. Если вернулось обычное значение — отчитаться сразу
// 5. На любой ошибке отчитаться (ok: false) и пробросить
// Имя метода взять из context.name (приведением к string).
export function measure(_reporter: Reporter): <This extends object, Args extends unknown[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) => (this: This, ...args: Args) => Return {
  return function decorator() {
    throw new Error('measure decorator is not implemented yet');
  } as never;
}
