// Chain of Responsibility для валидаторов поля формы.
// Валидатор получает значение и next; либо возвращает ошибку и обрывает цепочку,
// либо вызывает next() и пропускает запрос дальше.

export type ValidationResult =
  | { ok: true }
  | { ok: false; field: string; reason: string };

export type Validator<T> = (
  value: T,
  next: () => Promise<ValidationResult>,
) => Promise<ValidationResult> | ValidationResult;

// TODO: реализовать chain(validators).
// Возвращает функцию (value) => Promise<ValidationResult>.
// Внутри — рекурсивный диспетчер, как в middleware из 14.1.
// Если все валидаторы вызовут next и никто не вернёт ошибку — { ok: true }.
// Первый валидатор, вернувший ok:false (без вызова next), обрывает цепочку.
export function chain<T>(_validators: readonly Validator<T>[]): (value: T) => Promise<ValidationResult> {
  throw new Error('chain is not implemented yet');
}

// Конкретные валидаторы поля email — для тестов.

export const required: Validator<string> = (value, next) => {
  if (value.length === 0) {
    return { ok: false, field: 'email', reason: 'required' };
  }
  return next();
};

export const emailFormat: Validator<string> = (value, next) => {
  if (!value.includes('@') || !value.includes('.')) {
    return { ok: false, field: 'email', reason: 'invalid-format' };
  }
  return next();
};

export const uniqueInDb = (existing: ReadonlySet<string>): Validator<string> => async (value, next) => {
  // Симуляция async-проверки в БД
  await new Promise((resolve) => setTimeout(resolve, 5));
  if (existing.has(value)) {
    return { ok: false, field: 'email', reason: 'already-taken' };
  }
  return next();
};
