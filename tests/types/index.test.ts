import { expectTypeOf } from 'vitest';
import { OrderValidator } from '../../src/order-validator.js';
import { DiscountCalculator, type PriceBreakdown } from '../../src/discount-calculator.js';
import { OrderRepository } from '../../src/order-repository.js';
import { EmailNotifier } from '../../src/email-notifier.js';
import { InvoiceGenerator } from '../../src/invoice-generator.js';
import { OrderService } from '../../src/order-service.js';
import type { Order, OrderResult, SentEmail } from '../../src/order-types.js';

describe('type contracts', () => {
  it('OrderValidator.validate returns void', () => {
    expectTypeOf(OrderValidator.prototype.validate).returns.toEqualTypeOf<void>();
    expectTypeOf(OrderValidator.prototype.validate).parameters.toEqualTypeOf<[Order]>();
  });

  it('DiscountCalculator.calculate returns PriceBreakdown', () => {
    expectTypeOf(DiscountCalculator.prototype.calculate).returns.toEqualTypeOf<PriceBreakdown>();
  });

  it('OrderRepository.find returns Order | undefined', () => {
    expectTypeOf(OrderRepository.prototype.find).returns.toEqualTypeOf<Order | undefined>();
  });

  it('EmailNotifier.getSent returns a readonly list of SentEmail', () => {
    expectTypeOf(EmailNotifier.prototype.getSent).returns.toEqualTypeOf<readonly SentEmail[]>();
  });

  it('InvoiceGenerator.generate returns a string', () => {
    expectTypeOf(InvoiceGenerator.prototype.generate).returns.toEqualTypeOf<string>();
    expectTypeOf(InvoiceGenerator.prototype.generate).parameters.toEqualTypeOf<[Order, number]>();
  });

  it('OrderService.placeOrder returns OrderResult', () => {
    expectTypeOf(OrderService.prototype.placeOrder).returns.toEqualTypeOf<OrderResult>();
  });
});
