import type { SentEmail } from './order-types.js';

export class EmailNotifier {
  private readonly sent: SentEmail[] = [];

  public send(to: string, body: string): void {
    this.sent.push({ to, body });
  }

  public getSent(): readonly SentEmail[] {
    return this.sent;
  }
}
