// Реализация deepClone — клонирование без structuredClone, с поддержкой
// массивов, Date, Map, Set, простых объектов и циклических ссылок.
//
// TODO: реализовать. Подсказки:
// - примитивы и null/undefined возвращать как есть
// - Date — `new Date(value.getTime())`
// - Map / Set — пройти по записям, рекурсивно клонировать
// - массивы и объекты — обойти ключи рекурсивно
// - циклы — через `WeakMap<object, unknown>`, чтобы запоминать уже склонированное
export function deepClone<T>(_value: T): T {
  throw new Error('deepClone is not implemented yet');
}
