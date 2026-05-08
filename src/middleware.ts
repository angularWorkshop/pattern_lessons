// Минимальный middleware-движок в стиле Express/Koa.
// Запрос проходит через цепочку, каждый middleware решает: пропустить дальше
// (вызвав next()), прервать (не вызвав), или кинуть ошибку.

export interface RequestContext {
  url: string;
  user?: string;
  trace: string[];
}

export type Middleware = (
  ctx: RequestContext,
  next: () => Promise<void>,
) => Promise<void> | void;

// TODO: реализовать compose(middlewares).
// Возвращает функцию (ctx) => Promise<void>, которая прогоняет middlewares
// в порядке регистрации. Каждый middleware получает next, который запускает
// следующий в цепочке.
//
// Подсказка — рекурсивный диспетчер:
//   function dispatch(i) {
//     const mw = middlewares[i];
//     if (!mw) return Promise.resolve();
//     return Promise.resolve(mw(ctx, () => dispatch(i + 1)));
//   }
//   return dispatch(0);
export function compose(_middlewares: readonly Middleware[]): (ctx: RequestContext) => Promise<void> {
  throw new Error('compose is not implemented yet');
}
