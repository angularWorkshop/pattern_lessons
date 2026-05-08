export interface EmailMessage {
  to: string;
  subject: string;
  cc: readonly string[];
  attachments: readonly { name: string; content: string }[];
}

export type EmailComplete = { to: true; subject: true };

export class EmailBuilder<S extends Partial<EmailComplete> = Record<string, never>> {
  protected _to: string | null = null;
  protected _subject: string | null = null;
  protected _cc: string[] = [];
  protected _attachments: { name: string; content: string }[] = [];
  protected readonly __state!: S;

  public to(address: string): EmailBuilder<S & { to: true }> {
    this._to = address;
    return this as unknown as EmailBuilder<S & { to: true }>;
  }

  public subject(text: string): EmailBuilder<S & { subject: true }> {
    this._subject = text;
    return this as unknown as EmailBuilder<S & { subject: true }>;
  }

  public cc(address: string): this {
    this._cc.push(address);
    return this;
  }

  public attachment(name: string, content: string): this {
    this._attachments.push({ name, content });
    return this;
  }

  public build(this: EmailBuilder<EmailComplete>): EmailMessage {
    return {
      to: this._to as string,
      subject: this._subject as string,
      cc: [...this._cc],
      attachments: [...this._attachments],
    };
  }
}
