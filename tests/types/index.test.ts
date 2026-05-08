import { expectTypeOf } from 'vitest';
import { NotificationFactory } from '../../src/notification-factory.js';
import { Dispatcher } from '../../src/dispatcher.js';
import { EmailNotification } from '../../src/email-notification.js';
import type {
  ChannelType,
  Notification,
  NotificationPayload,
  NotificationResult,
} from '../../src/notification.js';

describe('Factory Method type contracts', () => {
  it('NotificationFactory.create takes a ChannelType and returns a Notification', () => {
    expectTypeOf(NotificationFactory.prototype.create).parameters.toEqualTypeOf<[ChannelType]>();
    expectTypeOf(NotificationFactory.prototype.create).returns.toEqualTypeOf<Notification>();
  });

  it('ChannelType union contains exactly the expected channels', () => {
    expectTypeOf<ChannelType>().toEqualTypeOf<'email' | 'sms' | 'push' | 'telegram'>();
  });

  it('Notification.send returns a NotificationResult', () => {
    expectTypeOf<Notification['send']>().parameters.toEqualTypeOf<[NotificationPayload]>();
    expectTypeOf<Notification['send']>().returns.toEqualTypeOf<NotificationResult>();
  });

  it('EmailNotification is assignable to Notification', () => {
    expectTypeOf<EmailNotification>().toMatchTypeOf<Notification>();
  });

  it('Dispatcher.dispatch returns a NotificationResult', () => {
    expectTypeOf(Dispatcher.prototype.dispatch).returns.toEqualTypeOf<NotificationResult>();
  });
});
