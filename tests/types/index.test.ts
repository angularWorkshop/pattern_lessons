import { expectTypeOf } from 'vitest';
import { withLogging, withRetry, withCache } from '../../src/decorators.js';
import type { HttpClient } from '../../src/http-client.js';
import type { LogEntry } from '../../src/decorators.js';

describe('Decorator type contracts', () => {
  it('withLogging takes HttpClient + log array, returns HttpClient', () => {
    expectTypeOf(withLogging).parameters.toEqualTypeOf<[HttpClient, LogEntry[]]>();
    expectTypeOf(withLogging).returns.toEqualTypeOf<HttpClient>();
  });
  it('withRetry takes HttpClient + attempts, returns HttpClient', () => {
    expectTypeOf(withRetry).parameters.toEqualTypeOf<[HttpClient, number]>();
    expectTypeOf(withRetry).returns.toEqualTypeOf<HttpClient>();
  });
  it('withCache takes HttpClient, returns HttpClient', () => {
    expectTypeOf(withCache).parameters.toEqualTypeOf<[HttpClient]>();
    expectTypeOf(withCache).returns.toEqualTypeOf<HttpClient>();
  });
});
