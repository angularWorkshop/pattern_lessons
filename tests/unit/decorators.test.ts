import {
  withLogging,
  withRetry,
  withCache,
  type LogEntry,
} from '../../src/decorators.js';
import { makeMockClient } from '../../src/http-client.js';
import type { HttpClient, HttpRequest, HttpResponse } from '../../src/http-client.js';

describe('withLogging', () => {
  it('records every successful call', async () => {
    const { client } = makeMockClient({
      '/users': { status: 200, body: { ok: true } },
    });
    const log: LogEntry[] = [];
    const wrapped = withLogging(client, log);
    await wrapped({ url: '/users' });
    await wrapped({ url: '/users' });
    expect(log).toHaveLength(2);
    expect(log[0]).toMatchObject({ url: '/users', ok: true });
  });

  it('records failed calls and re-throws', async () => {
    const failing: HttpClient = async () => {
      throw new Error('network');
    };
    const log: LogEntry[] = [];
    const wrapped = withLogging(failing, log);
    await expect(wrapped({ url: '/x' })).rejects.toThrow('network');
    expect(log).toEqual([expect.objectContaining({ url: '/x', ok: false })]);
  });
});

describe('withRetry', () => {
  it('retries failing client up to N attempts then succeeds', async () => {
    let calls = 0;
    const flaky: HttpClient = async () => {
      calls++;
      if (calls < 3) {
        throw new Error('transient');
      }
      return { status: 200, body: 'ok' };
    };
    const wrapped = withRetry(flaky, 3);
    const response = await wrapped({ url: '/x' });
    expect(response.body).toBe('ok');
    expect(calls).toBe(3);
  });

  it('throws after N failed attempts', async () => {
    let calls = 0;
    const broken: HttpClient = async () => {
      calls++;
      throw new Error('still bad');
    };
    const wrapped = withRetry(broken, 2);
    await expect(wrapped({ url: '/x' })).rejects.toThrow('still bad');
    expect(calls).toBe(2);
  });

  it('does not retry on success', async () => {
    let calls = 0;
    const fine: HttpClient = async () => {
      calls++;
      return { status: 200, body: 'ok' };
    };
    const wrapped = withRetry(fine, 5);
    await wrapped({ url: '/x' });
    expect(calls).toBe(1);
  });
});

describe('withCache', () => {
  it('returns cached response without calling inner on repeat URL', async () => {
    const { client, callCount } = makeMockClient({
      '/posts': { status: 200, body: [1, 2] },
    });
    const wrapped = withCache(client);
    const first = await wrapped({ url: '/posts' });
    const second = await wrapped({ url: '/posts' });
    expect(first).toEqual(second);
    expect(callCount()).toBe(1);
  });

  it('does NOT cache different URLs together', async () => {
    const { client, callCount } = makeMockClient({
      '/a': { status: 200, body: 'a' },
      '/b': { status: 200, body: 'b' },
    });
    const wrapped = withCache(client);
    await wrapped({ url: '/a' });
    await wrapped({ url: '/b' });
    expect(callCount()).toBe(2);
  });
});

describe('Composed decorators — logging + retry + cache', () => {
  it('all three layers cooperate', async () => {
    let attempts = 0;
    const flaky: HttpClient = async (req: HttpRequest): Promise<HttpResponse> => {
      attempts++;
      if (attempts < 2) {
        throw new Error('first call fails');
      }
      return { status: 200, body: req.url };
    };
    const log: LogEntry[] = [];
    const stack = withCache(withRetry(withLogging(flaky, log), 3));

    const a = await stack({ url: '/x' });
    const b = await stack({ url: '/x' });
    expect(a.body).toBe('/x');
    expect(b.body).toBe('/x');
    expect(attempts).toBe(2); // retry consumed one extra; second call hit cache
    expect(log.length).toBeGreaterThanOrEqual(2);
  });
});
