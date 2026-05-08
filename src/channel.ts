export type ChannelId = 'email' | 'sms' | 'push';

export interface DeliveryReport {
  channel: ChannelId;
  to: string;
  body: string;
  delivered: boolean;
}

export interface DeliveryChannel {
  readonly id: ChannelId;
  send(to: string, body: string): DeliveryReport;
}
