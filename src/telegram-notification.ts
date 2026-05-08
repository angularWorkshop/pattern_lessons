import type {
  ChannelType,
  Notification,
  NotificationPayload,
  NotificationResult,
} from './notification.js';

export class TelegramNotification implements Notification {
  public readonly channel: ChannelType = 'telegram';

  public send(payload: NotificationPayload): NotificationResult {
    if (!payload.recipient.startsWith('@')) {
      return {
        channel: 'telegram',
        delivered: false,
        transcript: `telegram: rejected — invalid handle ${payload.recipient}`,
      };
    }
    return {
      channel: 'telegram',
      delivered: true,
      transcript: `telegram to ${payload.recipient}: ${payload.subject} — ${payload.body}`,
    };
  }
}
