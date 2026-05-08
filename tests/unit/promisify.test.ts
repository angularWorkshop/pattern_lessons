import { promisify } from '../../src/promisify.js';

describe('promisify — converts Node-style callbacks to Promises', () => {
  it('resolves with the result for a successful call', async () => {
    const sum = (a: number, b: number, cb: (err: Error | null, r?: number) => void): void => {
      cb(null, a + b);
    };
    const sumP = promisify(sum);
    await expect(sumP(2, 3)).resolves.toBe(5);
  });

  it('rejects when the callback receives an error', async () => {
    const fail = (cb: (err: Error | null) => void): void => {
      cb(new Error('boom'));
    };
    const failP = promisify(fail);
    await expect(failP()).rejects.toThrow('boom');
  });

  it('handles async callback (setTimeout)', async () => {
    const delayed = (
      n: number,
      cb: (err: Error | null, r?: number) => void,
    ): void => {
      setTimeout(() => cb(null, n * 2), 10);
    };
    const delayedP = promisify(delayed);
    await expect(delayedP(7)).resolves.toBe(14);
  });

  it('passes through multiple arguments', async () => {
    const concat = (
      a: string,
      b: string,
      c: string,
      cb: (err: Error | null, r?: string) => void,
    ): void => {
      cb(null, `${a}-${b}-${c}`);
    };
    const concatP = promisify(concat);
    await expect(concatP('x', 'y', 'z')).resolves.toBe('x-y-z');
  });

  it('returned promise stays cold — fn is not called until awaited', () => {
    let called = false;
    const fn = (cb: (err: Error | null) => void): void => {
      called = true;
      cb(null);
    };
    const wrapped = promisify(fn);
    expect(called).toBe(false);
    wrapped();
    expect(called).toBe(true);
  });

  it('a sync exception thrown inside fn does NOT crash, but ends up in reject', async () => {
    const broken = (cb: (err: Error | null) => void): void => {
      throw new Error('sync explosion');
      cb(null);
    };
    const brokenP = promisify(broken);
    await expect(brokenP()).rejects.toThrow('sync explosion');
  });
});
