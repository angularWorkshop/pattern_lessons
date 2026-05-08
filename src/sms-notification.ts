import type {
  ChannelType,
  Notification,
  NotificationPayload,
  NotificationResult,
} from './notification.js';

export class SmsNotification implements Notification {
  public readonly channel: ChannelType = 'sms';

  public send(payload: NotificationPayload): NotificationResult {
    if (!/^\+?\d{6,}$/.test(payload.recipient)) {
      return {
        channel: 'sms',
        delivered: false,
        transcript: `sms: rejected — invalid phone ${payload.recipient}`,
      };
    }
    const text = `${payload.subject}: ${payload.body}`.slice(0, 160);
    return {
      channel: 'sms',
      delivered: true,
      transcript: `sms to ${payload.recipient}: ${text}`,
    };
  }
}
