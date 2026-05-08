import type { ChannelId, DeliveryChannel, DeliveryReport } from './channel.js';

// TODO: реализовать три канала. Каждый возвращает DeliveryReport
// с правильным channel id и forматом тела:
// EmailChannel — body как есть.
// SmsChannel — body обрезается до 160 символов.
// PushChannel — body оборачивается в "PUSH: <body>".

export class EmailChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'email';
  public send(_to: string, _body: string): DeliveryReport {
    throw new Error('EmailChannel.send is not implemented yet');
  }
}

export class SmsChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'sms';
  public send(_to: string, _body: string): DeliveryReport {
    throw new Error('SmsChannel.send is not implemented yet');
  }
}

export class PushChannel implements DeliveryChannel {
  public readonly id: ChannelId = 'push';
  public send(_to: string, _body: string): DeliveryReport {
    throw new Error('PushChannel.send is not implemented yet');
  }
}
