import { expectTypeOf } from 'vitest';
import { compose, type Middleware, type RequestContext } from '../../src/middleware.js';

describe('compose type contracts', () => {
  it('compose takes a readonly Middleware[] and returns (ctx) => Promise<void>', () => {
    expectTypeOf(compose).parameters.toEqualTypeOf<[readonly Middleware[]]>();
    expectTypeOf(compose([])).parameters.toEqualTypeOf<[RequestContext]>();
    expectTypeOf(compose([])).returns.toEqualTypeOf<Promise<void>>();
  });
});
