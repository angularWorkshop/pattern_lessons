import {
  chain,
  required,
  emailFormat,
  uniqueInDb,
  type Validator,
} from '../../src/validators.js';

describe('chain — core CoR behavior', () => {
  it('empty chain accepts any value', async () => {
    const result = await chain<string>([])('whatever');
    expect(result).toEqual({ ok: true });
  });

  it('all validators pass → ok', async () => {
    const validate = chain<string>([required, emailFormat]);
    const result = await validate('alice@example.com');
    expect(result).toEqual({ ok: true });
  });

  it('first failing validator stops the chain and returns its error', async () => {
    const validate = chain<string>([required, emailFormat]);
    const result = await validate('');
    expect(result).toEqual({ ok: false, field: 'email', reason: 'required' });
  });

  it('later async validator can fail', async () => {
    const validate = chain<string>([
      required,
      emailFormat,
      uniqueInDb(new Set(['taken@example.com'])),
    ]);
    const result = await validate('taken@example.com');
    expect(result).toEqual({ ok: false, field: 'email', reason: 'already-taken' });
  });

  it('async validator does not run if a sync one already failed', async () => {
    let asyncCalls = 0;
    const tracker: Validator<string> = async (_v, next) => {
      asyncCalls++;
      return next();
    };
    const validate = chain<string>([required, tracker]);
    await validate('');
    expect(asyncCalls).toBe(0);
  });

  it('preserves the order of validators', async () => {
    const calls: string[] = [];
    const a: Validator<string> = (_v, next) => {
      calls.push('a');
      return next();
    };
    const b: Validator<string> = (_v, next) => {
      calls.push('b');
      return next();
    };
    const c: Validator<string> = (_v, next) => {
      calls.push('c');
      return next();
    };
    await chain<string>([a, b, c])('x');
    expect(calls).toEqual(['a', 'b', 'c']);
  });
});

describe('chain — full email-validator pipeline', () => {
  const directory = new Set(['admin@example.com']);
  const validate = chain<string>([required, emailFormat, uniqueInDb(directory)]);

  it('rejects empty value with reason "required"', async () => {
    expect(await validate('')).toEqual({
      ok: false,
      field: 'email',
      reason: 'required',
    });
  });

  it('rejects malformed value with reason "invalid-format"', async () => {
    expect(await validate('not-an-email')).toEqual({
      ok: false,
      field: 'email',
      reason: 'invalid-format',
    });
  });

  it('rejects taken value with reason "already-taken"', async () => {
    expect(await validate('admin@example.com')).toEqual({
      ok: false,
      field: 'email',
      reason: 'already-taken',
    });
  });

  it('accepts a fresh, valid email', async () => {
    expect(await validate('new.user@example.com')).toEqual({ ok: true });
  });
});
