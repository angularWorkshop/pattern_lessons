import { Dispatcher } from '../../src/dispatcher.js';
import type { NotificationPayload } from '../../src/notification.js';

const samplePayload: NotificationPayload = {
  recipient: 'jane@example.com',
  subject: 'Hi',
  body: 'Welcome',
};

describe('Dispatcher — end-to-end behavior', () => {
  it('dispatches an email', () => {
    const result = new Dispatcher().dispatch('email', samplePayload);
    expect(result.channel).toBe('email');
    expect(result.delivered).toBe(true);
    expect(result.transcript).toContain('email to jane@example.com');
  });

  it('dispatches an sms', () => {
    const result = new Dispatcher().dispatch('sms', {
      recipient: '+15551234567',
      subject: 'Hi',
      body: 'Welcome',
    });
    expect(result.channel).toBe('sms');
    expect(result.delivered).toBe(true);
  });

  it('dispatches a push notification', () => {
    const result = new Dispatcher().dispatch('push', {
      recipient: 'device:abc123',
      subject: 'Ping',
      body: 'tap here',
    });
    expect(result.channel).toBe('push');
    expect(result.delivered).toBe(true);
  });

  it('marks an email as not delivered for a malformed address', () => {
    const result = new Dispatcher().dispatch('email', {
      ...samplePayload,
      recipient: 'no-at-sign',
    });
    expect(result.delivered).toBe(false);
  });

  it('dispatches a telegram message — proves new channels do not require Dispatcher edits', () => {
    // After refactoring through the factory, adding a Telegram channel must not
    // require editing Dispatcher. This test starts red on the lesson branch
    // (Dispatcher's switch has no `telegram` branch) and turns green once
    // Dispatcher delegates to NotificationFactory.
    const result = new Dispatcher().dispatch('telegram', {
      recipient: '@username',
      subject: 'Update',
      body: 'You have a new message',
    });
    expect(result.channel).toBe('telegram');
    expect(result.delivered).toBe(true);
    expect(result.transcript).toContain('@username');
  });
});
