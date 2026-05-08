import type { DeliveryChannel, DeliveryReport } from './channel.js';

// Bridge: тип уведомления (абстракция) держит ссылку на канал доставки (реализация).
// Любой тип может уйти любым каналом — типы и каналы расширяются независимо.

export abstract class Notification {
  protected readonly channel: DeliveryChannel;
  public constructor(channel: DeliveryChannel) {
    this.channel = channel;
  }
  public abstract notify(recipient: string, content: string): DeliveryReport;
}

export class AlertNotification extends Notification {
  // TODO: формат — "[ALERT] <content>". Передать в this.channel.send.
  public override notify(_recipient: string, _content: string): DeliveryReport {
    throw new Error('AlertNotification.notify is not implemented yet');
  }
}

export class MarketingNotification extends Notification {
  // TODO: формат — "<content> — unsubscribe at example.com/unsubscribe"
  public override notify(_recipient: string, _content: string): DeliveryReport {
    throw new Error('MarketingNotification.notify is not implemented yet');
  }
}

export class ReminderNotification extends Notification {
  // TODO: формат — "Reminder: <content>"
  public override notify(_recipient: string, _content: string): DeliveryReport {
    throw new Error('ReminderNotification.notify is not implemented yet');
  }
}
