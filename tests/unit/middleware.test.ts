import { compose, type Middleware, type RequestContext } from '../../src/middleware.js';

const buildCtx = (): RequestContext => ({ url: '/users', trace: [] });

const mark = (name: string): Middleware => async (ctx, next) => {
  ctx.trace.push(`> ${name}`);
  await next();
  ctx.trace.push(`< ${name}`);
};

describe('compose — chains middleware in order', () => {
  it('runs all middlewares in registration order', async () => {
    const ctx = buildCtx();
    await compose([mark('a'), mark('b'), mark('c')])(ctx);
    expect(ctx.trace).toEqual(['> a', '> b', '> c', '< c', '< b', '< a']);
  });

  it('an empty chain just resolves', async () => {
    await expect(compose([])(buildCtx())).resolves.toBeUndefined();
  });
});

describe('compose — terminates when next() is not called', () => {
  it('a middleware that does not call next() stops the chain', async () => {
    const ctx = buildCtx();
    const mwA: Middleware = (c) => {
      c.trace.push('> a (no next)');
    };
    const mwB: Middleware = (c) => {
      c.trace.push('> b');
    };
    await compose([mwA, mwB])(ctx);
    expect(ctx.trace).toEqual(['> a (no next)']);
  });
});

describe('compose — error propagation', () => {
  it('a sync throw inside a middleware bubbles up', async () => {
    const failing: Middleware = () => {
      throw new Error('explode');
    };
    await expect(compose([failing])(buildCtx())).rejects.toThrow('explode');
  });

  it('an async rejection bubbles up', async () => {
    const failing: Middleware = async () => {
      throw new Error('async explode');
    };
    await expect(compose([failing])(buildCtx())).rejects.toThrow('async explode');
  });

  it('a downstream middleware error bubbles up through outer middlewares', async () => {
    const ctx = buildCtx();
    const outer: Middleware = async (c, next) => {
      c.trace.push('> outer');
      await next();
      c.trace.push('< outer'); // не выполнится — ошибка выше
    };
    const inner: Middleware = async () => {
      throw new Error('inner failed');
    };
    await expect(compose([outer, inner])(ctx)).rejects.toThrow('inner failed');
    expect(ctx.trace).toEqual(['> outer']);
  });
});

describe('compose — async timing', () => {
  it('awaits async work in each middleware', async () => {
    const ctx = buildCtx();
    const slow: Middleware = async (c, next) => {
      await new Promise((r) => setTimeout(r, 5));
      c.trace.push('slow done');
      await next();
    };
    const fast: Middleware = async (c) => {
      c.trace.push('fast done');
    };
    await compose([slow, fast])(ctx);
    expect(ctx.trace).toEqual(['slow done', 'fast done']);
  });
});
