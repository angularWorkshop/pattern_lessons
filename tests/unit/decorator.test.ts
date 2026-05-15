import { vi } from 'vitest';
import {
  withLogging,
  withRetry,
  withCache,
  type HttpClient,
} from '../../src/decorator/http-client.js';

function fakeOk<R>(value: R): HttpClient {
  return { get: <T>(): Promise<T> => Promise.resolve(value as unknown as T) };
}

function fakeThrow(err: Error): HttpClient {
  return {
    get: <T>(): Promise<T> => Promise.reject<T>(err),
  };
}

describe('Decorator — HTTP client wrappers', () => {
  it('withLogging logs before, after, on error', async () => {
    const log = vi.fn();
    const client = withLogging(fakeOk(42), log);
    await client.get('/x');
    expect(log.mock.calls[0]?.[0]).toMatch(/GET \/x/);
    expect(log.mock.calls[1]?.[0]).toMatch(/OK \/x/);

    const fclient = withLogging(fakeThrow(new Error('boom')), log);
    await expect(fclient.get('/y')).rejects.toThrow('boom');
    expect(log.mock.calls.at(-1)?.[0]).toMatch(/ERR \/y/);
  });

  it('withRetry retries until success', async () => {
    let calls = 0;
    const flaky: HttpClient = {
      get: <T>(): Promise<T> => {
        calls += 1;
        if (calls < 3) return Promise.reject<T>(new Error('flap'));
        return Promise.resolve('ok' as unknown as T);
      },
    };
    const client = withRetry(flaky, 3);
    await expect(client.get('/x')).resolves.toBe('ok');
    expect(calls).toBe(3);
  });

  it('withRetry throws after attempts exhausted', async () => {
    let calls = 0;
    const bad: HttpClient = {
      get: <T>(): Promise<T> => {
        calls += 1;
        return Promise.reject<T>(new Error('always'));
      },
    };
    const client = withRetry(bad, 2);
    await expect(client.get('/x')).rejects.toThrow('always');
    expect(calls).toBe(2);
  });

  it('withCache returns cached value within ttl', async () => {
    let calls = 0;
    const base: HttpClient = {
      get: <T>(): Promise<T> => {
        calls += 1;
        return Promise.resolve(calls as unknown as T);
      },
    };
    let time = 1000;
    const client = withCache(base, 100, () => time);
    expect(await client.get('/x')).toBe(1);
    time = 1050;
    expect(await client.get('/x')).toBe(1);
    expect(calls).toBe(1);
  });

  it('withCache refetches after ttl expires', async () => {
    let calls = 0;
    const base: HttpClient = {
      get: <T>(): Promise<T> => {
        calls += 1;
        return Promise.resolve(calls as unknown as T);
      },
    };
    let time = 1000;
    const client = withCache(base, 100, () => time);
    await client.get('/x');
    time = 2000;
    expect(await client.get('/x')).toBe(2);
    expect(calls).toBe(2);
  });

  it('stack: withLogging(withRetry(withCache))', async () => {
    let calls = 0;
    const base: HttpClient = {
      get: <T>(): Promise<T> => {
        calls += 1;
        return Promise.resolve(calls as unknown as T);
      },
    };
    const log = vi.fn();
    const client = withLogging(withRetry(withCache(base, 1_000_000, () => 0), 3), log);
    await client.get('/a');
    await client.get('/a');
    expect(calls).toBe(1);
    expect(log).toHaveBeenCalledTimes(4); // GET+OK twice
  });
});
