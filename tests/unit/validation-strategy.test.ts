import {
  required,
  minLength,
  pattern,
  combine,
} from '../../src/validation-strategy.js';

describe('Individual strategies', () => {
  it('required fails on empty string', () => {
    expect(required('')).toEqual(['required']);
    expect(required('x')).toEqual([]);
  });

  it('minLength(N) fails when shorter', () => {
    const min3 = minLength(3);
    expect(min3('ab')).toEqual(['min-length-3']);
    expect(min3('abc')).toEqual([]);
  });

  it('pattern fails when regex does not match', () => {
    const email = pattern(/^.+@.+\..+$/, 'email');
    expect(email('not-an-email')).toEqual(['pattern-email']);
    expect(email('a@b.com')).toEqual([]);
  });
});

describe('combine — multiple strategies', () => {
  it('returns no errors when all pass', () => {
    const validate = combine(required, minLength(3));
    expect(validate('hello')).toEqual([]);
  });

  it('aggregates errors from all failing strategies (no short-circuit)', () => {
    const validate = combine(required, minLength(3), pattern(/^[a-z]+$/, 'lowercase'));
    expect(validate('')).toEqual(['required', 'min-length-3', 'pattern-lowercase']);
  });

  it('keeps order of strategies', () => {
    const validate = combine(minLength(5), required);
    const errors = validate('');
    expect(errors).toEqual(['min-length-5', 'required']);
  });

  it('empty combine returns no errors', () => {
    expect(combine<string>()('whatever')).toEqual([]);
  });
});
