export type ValidationResult =
  | { ok: true }
  | { ok: false; field: string; reason: string };

export type Validator<T> = (
  value: T,
  next: () => Promise<ValidationResult>,
) => Promise<ValidationResult> | ValidationResult;

export function chain<T>(validators: readonly Validator<T>[]): (value: T) => Promise<ValidationResult> {
  return (value) => {
    const dispatch = (i: number): Promise<ValidationResult> => {
      const v = validators[i];
      if (!v) return Promise.resolve({ ok: true });
      try {
        return Promise.resolve(v(value, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    };
    return dispatch(0);
  };
}

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
  await new Promise((resolve) => setTimeout(resolve, 5));
  if (existing.has(value)) {
    return { ok: false, field: 'email', reason: 'already-taken' };
  }
  return next();
};
