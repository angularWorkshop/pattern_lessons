// Адаптер callback-API в Promise.
// Стандартная Node-style callback: первая аргумент — error, второй — результат.
// Promisify оборачивает функцию вида (...args, callback) в обычную async-функцию.

export type NodeCallback<R> = (err: Error | null, result?: R) => void;

// Обобщённый адаптер. На вход — функция с произвольными аргументами + callback.
// На выход — функция с теми же аргументами, возвращающая Promise<R>.
export type CallbackFn<Args extends unknown[], R> = (
  ...args: [...Args, NodeCallback<R>]
) => void;

// TODO: реализовать promisify.
// Возвращаемая функция:
// - принимает те же args
// - создаёт Promise, передаёт в fn callback (err, result) => err ? reject(err) : resolve(result)
export function promisify<Args extends unknown[], R>(
  _fn: CallbackFn<Args, R>,
): (...args: Args) => Promise<R> {
  throw new Error('promisify is not implemented yet');
}
