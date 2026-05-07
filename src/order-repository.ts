import type { Order } from './order-types.js';

export class OrderRepository {
  // TODO: extract storage out of OrderService. Use a Map<string, Order> internally.
  public save(_order: Order): void {
    throw new Error('OrderRepository.save is not implemented yet');
  }

  public find(_id: string): Order | undefined {
    throw new Error('OrderRepository.find is not implemented yet');
  }
}
