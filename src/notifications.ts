import type { DeliveryChannel, DeliveryReport } from './channel.js';

export abstract class Notification {
  protected readonly channel: DeliveryChannel;
  public constructor(channel: DeliveryChannel) {
    this.channel = channel;
  }
  public abstract notify(recipient: string, content: string): DeliveryReport;
}

export class AlertNotification extends Notification {
  public override notify(recipient: string, content: string): DeliveryReport {
    return this.channel.send(recipient, `[ALERT] ${content}`);
  }
}

export class MarketingNotification extends Notification {
  public override notify(recipient: string, content: string): DeliveryReport {
    return this.channel.send(
      recipient,
      `${content} — unsubscribe at example.com/unsubscribe`,
    );
  }
}

export class ReminderNotification extends Notification {
  public override notify(recipient: string, content: string): DeliveryReport {
    return this.channel.send(recipient, `Reminder: ${content}`);
  }
}
