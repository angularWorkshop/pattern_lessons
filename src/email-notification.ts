import type {
  ChannelType,
  Notification,
  NotificationPayload,
  NotificationResult,
} from './notification.js';

export class EmailNotification implements Notification {
  public readonly channel: ChannelType = 'email';

  public send(payload: NotificationPayload): NotificationResult {
    if (!payload.recipient.includes('@')) {
      return {
        channel: 'email',
        delivered: false,
        transcript: `email: rejected — invalid address ${payload.recipient}`,
      };
    }
    return {
      channel: 'email',
      delivered: true,
      transcript: `email to ${payload.recipient}: ${payload.subject} — ${payload.body}`,
    };
  }
}
