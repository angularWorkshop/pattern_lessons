import type { Order } from './order-types.js';

export class InvoiceGenerator {
  // TODO: extract invoice building out of OrderService.
  // Format must match the existing one (see OrderService.placeOrder):
  //   INVOICE
  //   Order: <id>
  //   Customer: <email>
  //     - <sku> x<qty> @ $<price.toFixed(2)>
  //   Total: $<total.toFixed(2)>
  public generate(_order: Order, _total: number): string {
    throw new Error('InvoiceGenerator.generate is not implemented yet');
  }
}
