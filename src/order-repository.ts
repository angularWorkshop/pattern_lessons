import type { Order } from './order-types.js';

export class OrderRepository {
  private readonly orders = new Map<string, Order>();

  public save(order: Order): void {
    this.orders.set(order.id, order);
  }

  public find(id: string): Order | undefined {
    return this.orders.get(id);
  }
}
