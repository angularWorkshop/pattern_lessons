import { expectTypeOf } from 'vitest';
import { EmailBuilder } from '../../src/email-builder.js';
import type { EmailMessage, EmailComplete } from '../../src/email-builder.js';

describe('Step-builder type contracts', () => {
  it('build is only callable when both required steps were taken', () => {
    // build() с обоими шагами — должен компилиться и возвращать EmailMessage
    expectTypeOf(
      new EmailBuilder().to('a@b.com').subject('Hi').build(),
    ).toEqualTypeOf<EmailMessage>();
  });

  it('the order of required steps does not matter', () => {
    expectTypeOf(
      new EmailBuilder().subject('Hi').to('a@b.com').build(),
    ).toEqualTypeOf<EmailMessage>();
  });

  it('build is unavailable without subject', () => {
    // @ts-expect-error build вызван без subject — должно падать на этапе компиляции
    new EmailBuilder().to('a@b.com').build();
  });

  it('build is unavailable without to', () => {
    // @ts-expect-error build вызван без to
    new EmailBuilder().subject('Hi').build();
  });

  it('build is unavailable on a fresh builder', () => {
    // @ts-expect-error build на пустом билдере — нет ни to ни subject
    new EmailBuilder().build();
  });

  it('cc and attachment do not unlock build', () => {
    // @ts-expect-error cc/attachment не дают права на build
    new EmailBuilder().cc('c@b.com').attachment('x', 'y').build();
  });

  it('EmailComplete type is recognized', () => {
    expectTypeOf<EmailComplete>().toEqualTypeOf<{ to: true; subject: true }>();
  });
});
