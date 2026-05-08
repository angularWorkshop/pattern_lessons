import { expectTypeOf } from 'vitest';
import { HttpBuilder, type HttpMethod, type HttpRequest } from '../../src/http-builder.js';

describe('HttpBuilder type contracts', () => {
  it('HttpMethod union has the four methods', () => {
    expectTypeOf<HttpMethod>().toEqualTypeOf<'GET' | 'POST' | 'PUT' | 'DELETE'>();
  });
  it('HttpBuilder.get returns the builder for chaining', () => {
    expectTypeOf(HttpBuilder.prototype.get).returns.toEqualTypeOf<HttpBuilder>();
    expectTypeOf(HttpBuilder.prototype.path).returns.toEqualTypeOf<HttpBuilder>();
    expectTypeOf(HttpBuilder.prototype.header).returns.toEqualTypeOf<HttpBuilder>();
  });
  it('build returns an HttpRequest with required shape', () => {
    expectTypeOf(HttpBuilder.prototype.build).returns.toEqualTypeOf<HttpRequest>();
    expectTypeOf<HttpRequest>().toEqualTypeOf<{
      method: HttpMethod;
      path: string;
      headers: Record<string, string>;
      query: Record<string, string>;
      body: unknown;
    }>();
  });
});
