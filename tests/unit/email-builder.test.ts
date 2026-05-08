import { EmailBuilder } from '../../src/email-builder.js';

describe('EmailBuilder — builds an EmailMessage when both required steps are done', () => {
  it('builds with required to + subject', () => {
    const msg = new EmailBuilder()
      .to('alice@example.com')
      .subject('Welcome')
      .build();
    expect(msg).toEqual({
      to: 'alice@example.com',
      subject: 'Welcome',
      cc: [],
      attachments: [],
    });
  });

  it('build is order-independent (subject first)', () => {
    const msg = new EmailBuilder()
      .subject('Hi')
      .to('bob@example.com')
      .build();
    expect(msg.to).toBe('bob@example.com');
    expect(msg.subject).toBe('Hi');
  });

  it('accumulates cc addresses', () => {
    const msg = new EmailBuilder()
      .to('a@b.com')
      .subject('Hi')
      .cc('c@b.com')
      .cc('d@b.com')
      .build();
    expect(msg.cc).toEqual(['c@b.com', 'd@b.com']);
  });

  it('accumulates attachments', () => {
    const msg = new EmailBuilder()
      .to('a@b.com')
      .subject('Hi')
      .attachment('a.txt', 'A')
      .attachment('b.txt', 'B')
      .build();
    expect(msg.attachments).toEqual([
      { name: 'a.txt', content: 'A' },
      { name: 'b.txt', content: 'B' },
    ]);
  });

  it('cc and attachments can be called before required steps', () => {
    const msg = new EmailBuilder()
      .cc('c@b.com')
      .to('a@b.com')
      .attachment('x.txt', 'X')
      .subject('Hi')
      .build();
    expect(msg.to).toBe('a@b.com');
    expect(msg.subject).toBe('Hi');
    expect(msg.cc).toEqual(['c@b.com']);
    expect(msg.attachments).toEqual([{ name: 'x.txt', content: 'X' }]);
  });
});
