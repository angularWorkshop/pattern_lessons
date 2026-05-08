export interface RequestContext {
  url: string;
  user?: string;
  trace: string[];
}

export type Middleware = (
  ctx: RequestContext,
  next: () => Promise<void>,
) => Promise<void> | void;

export function compose(middlewares: readonly Middleware[]): (ctx: RequestContext) => Promise<void> {
  return (ctx) => {
    const dispatch = (i: number): Promise<void> => {
      const mw = middlewares[i];
      if (!mw) return Promise.resolve();
      try {
        return Promise.resolve(mw(ctx, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    };
    return dispatch(0);
  };
}
