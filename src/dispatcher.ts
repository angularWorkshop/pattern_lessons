import type {
  ChannelType,
  NotificationPayload,
  NotificationResult,
} from './notification.js';
import { NotificationFactory } from './notification-factory.js';

export class Dispatcher {
  private readonly factory: NotificationFactory;

  public constructor(factory: NotificationFactory = new NotificationFactory()) {
    this.factory = factory;
  }

  public dispatch(channel: ChannelType, payload: NotificationPayload): NotificationResult {
    const notification = this.factory.create(channel);
    return notification.send(payload);
  }
}
