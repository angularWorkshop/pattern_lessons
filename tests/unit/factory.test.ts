import { NotificationFactory } from '../../src/notification-factory.js';
import { EmailNotification } from '../../src/email-notification.js';
import { SmsNotification } from '../../src/sms-notification.js';
import { PushNotification } from '../../src/push-notification.js';

describe('NotificationFactory — produces channel-specific notifications', () => {
  it('returns an EmailNotification for "email"', () => {
    const factory = new NotificationFactory();
    expect(factory.create('email')).toBeInstanceOf(EmailNotification);
  });

  it('returns an SmsNotification for "sms"', () => {
    const factory = new NotificationFactory();
    expect(factory.create('sms')).toBeInstanceOf(SmsNotification);
  });

  it('returns a PushNotification for "push"', () => {
    const factory = new NotificationFactory();
    expect(factory.create('push')).toBeInstanceOf(PushNotification);
  });

  it('returns a Notification with channel === "telegram" for "telegram"', () => {
    // The TelegramNotification class is part of the exercise — student must add it.
    const factory = new NotificationFactory();
    const notification = factory.create('telegram');
    expect(notification.channel).toBe('telegram');
  });

  it('the factory products carry the right channel marker', () => {
    const factory = new NotificationFactory();
    expect(factory.create('email').channel).toBe('email');
    expect(factory.create('sms').channel).toBe('sms');
    expect(factory.create('push').channel).toBe('push');
    expect(factory.create('telegram').channel).toBe('telegram');
  });
});
