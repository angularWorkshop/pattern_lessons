import type { SentEmail } from './order-types.js';

export class EmailNotifier {
  // TODO: extract email sending out of OrderService.
  // Real production code would call SMTP — here just record into a list,
  // so tests can inspect what was sent.
  public send(_to: string, _body: string): void {
    throw new Error('EmailNotifier.send is not implemented yet');
  }

  public getSent(): readonly SentEmail[] {
    throw new Error('EmailNotifier.getSent is not implemented yet');
  }
}
