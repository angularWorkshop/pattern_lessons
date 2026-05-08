export type ChannelType = 'email' | 'sms' | 'push' | 'telegram';

export interface NotificationPayload {
  recipient: string;
  subject: string;
  body: string;
}

export interface NotificationResult {
  channel: ChannelType;
  delivered: boolean;
  transcript: string;
}

export interface Notification {
  readonly channel: ChannelType;
  send(payload: NotificationPayload): NotificationResult;
}
