import type {
  ChannelType,
  Notification,
  NotificationPayload,
  NotificationResult,
} from './notification.js';

export class PushNotification implements Notification {
  public readonly channel: ChannelType = 'push';

  public send(payload: NotificationPayload): NotificationResult {
    if (!payload.recipient.startsWith('device:')) {
      return {
        channel: 'push',
        delivered: false,
        transcript: `push: rejected — invalid device token ${payload.recipient}`,
      };
    }
    return {
      channel: 'push',
      delivered: true,
      transcript: `push to ${payload.recipient}: ${payload.subject}`,
    };
  }
}
