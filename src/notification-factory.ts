import type { ChannelType, Notification } from './notification.js';
import { EmailNotification } from './email-notification.js';
import { SmsNotification } from './sms-notification.js';
import { PushNotification } from './push-notification.js';
import { TelegramNotification } from './telegram-notification.js';

type NotificationConstructor = () => Notification;

export class NotificationFactory {
  private readonly registry = new Map<ChannelType, NotificationConstructor>([
    ['email', () => new EmailNotification()],
    ['sms', () => new SmsNotification()],
    ['push', () => new PushNotification()],
    ['telegram', () => new TelegramNotification()],
  ]);

  public create(channel: ChannelType): Notification {
    const factory = this.registry.get(channel);
    if (!factory) {
      throw new Error(`No notification registered for channel: ${String(channel)}`);
    }
    return factory();
  }
}
