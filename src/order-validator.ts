import type { Order } from './order-types.js';

export class OrderValidator {
  // TODO: implement validation. Move the checks out of OrderService.placeOrder.
  // Throw on: empty items, invalid email (no '@'), non-positive price, non-positive quantity.
  public validate(_order: Order): void {
    throw new Error('OrderValidator.validate is not implemented yet');
  }
}
