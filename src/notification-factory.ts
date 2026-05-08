import type { ChannelType, Notification } from './notification.js';

// TODO: implement the factory. Map a ChannelType to the right Notification class.
// Use a Map<ChannelType, () => Notification> internally so that adding a new
// channel never requires editing if/else inside `create`.
export class NotificationFactory {
  public create(_channel: ChannelType): Notification {
    throw new Error('NotificationFactory.create is not implemented yet');
  }
}
