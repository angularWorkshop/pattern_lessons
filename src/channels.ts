import type { ChannelId, DeliveryChannel, DeliveryReport } from './channel.js';

export class EmailChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'email';
  public send(to: string, body: string): DeliveryReport {
    return { channel: 'email', to, body, delivered: true };
  }
}

export class SmsChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'sms';
  public send(to: string, body: string): DeliveryReport {
    return { channel: 'sms', to, body: body.slice(0, 160), delivered: true };
  }
}

export class PushChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'push';
  public send(to: string, body: string): DeliveryReport {
    return { channel: 'push', to, body: `PUSH: ${body}`, delivered: true };
  }
}
