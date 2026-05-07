export type Brand<T, Name extends string> = T & { readonly __brand: Name };

export type UserId = Brand<string, 'UserId'>;

export interface LessonUser {
  id: UserId;
  name: string;
  email?: string;
}

export function createUserId(value: string): UserId {
  return value as UserId;
}

export function createLessonUser(name: string, email?: string): LessonUser {
  return {
    id: createUserId(`user:${name.toLowerCase()}`),
    name,
    ...(email ? { email } : {}),
  };
}

export function sum(values: readonly number[]): number {
  return values.reduce((total: number, value: number) => total + value, 0);
}

