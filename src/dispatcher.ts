import type {
  ChannelType,
  NotificationPayload,
  NotificationResult,
} from './notification.js';
import { EmailNotification } from './email-notification.js';
import { SmsNotification } from './sms-notification.js';
import { PushNotification } from './push-notification.js';

// TODO: replace the inline switch with NotificationFactory.create(channel).send(payload).
// The point of Factory Method here is to remove this if/else chain so that adding
// a new channel never requires editing this file.
export class Dispatcher {
  public dispatch(channel: ChannelType, payload: NotificationPayload): NotificationResult {
    switch (channel) {
      case 'email': {
        const notification = new EmailNotification();
        return notification.send(payload);
      }
      case 'sms': {
        const notification = new SmsNotification();
        return notification.send(payload);
      }
      case 'push': {
        const notification = new PushNotification();
        return notification.send(payload);
      }
      default: {
        throw new Error(`Unknown channel: ${String(channel)}`);
      }
    }
  }
}
