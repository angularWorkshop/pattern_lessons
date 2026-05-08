import { expectTypeOf } from 'vitest';
import type { ChannelId, DeliveryChannel } from '../../src/channel.js';
import { EmailChannel, SmsChannel, PushChannel } from '../../src/channels.js';
import {
  AlertNotification,
  MarketingNotification,
  ReminderNotification,
} from '../../src/notifications.js';

describe('Bridge type contracts', () => {
  it('ChannelId is a union of three known channels', () => {
    expectTypeOf<ChannelId>().toEqualTypeOf<'email' | 'sms' | 'push'>();
  });
  it('All three channel classes implement DeliveryChannel', () => {
    expectTypeOf<EmailChannel>().toMatchTypeOf<DeliveryChannel>();
    expectTypeOf<SmsChannel>().toMatchTypeOf<DeliveryChannel>();
    expectTypeOf<PushChannel>().toMatchTypeOf<DeliveryChannel>();
  });
  it('Notification subclasses accept any DeliveryChannel through constructor', () => {
    expectTypeOf(AlertNotification).constructorParameters.toEqualTypeOf<[DeliveryChannel]>();
    expectTypeOf(MarketingNotification).constructorParameters.toEqualTypeOf<[DeliveryChannel]>();
    expectTypeOf(ReminderNotification).constructorParameters.toEqualTypeOf<[DeliveryChannel]>();
  });
});
