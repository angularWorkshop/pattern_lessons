export interface EmailMessage {
  to: string;
  subject: string;
  cc: readonly string[];
  attachments: readonly { name: string; content: string }[];
}

// Стартовое состояние — пустой объект; финальное — {to: true; subject: true}.
// Каждый вызов to() / subject() добавляет соответствующий флаг через
// type intersection. build() требует наличия обоих флагов.
export type EmailComplete = { to: true; subject: true };

export class EmailBuilder<S extends Partial<EmailComplete> = Record<string, never>> {
  protected _to: string | null = null;
  protected _subject: string | null = null;
  protected _cc: string[] = [];
  protected _attachments: { name: string; content: string }[] = [];
  protected readonly __state!: S;

  // TODO: сохранить адрес и сузить тип через cast.
  public to(_address: string): EmailBuilder<S & { to: true }> {
    throw new Error('EmailBuilder.to is not implemented yet');
  }

  public subject(_text: string): EmailBuilder<S & { subject: true }> {
    throw new Error('EmailBuilder.subject is not implemented yet');
  }

  public cc(_address: string): this {
    throw new Error('EmailBuilder.cc is not implemented yet');
  }

  public attachment(_name: string, _content: string): this {
    throw new Error('EmailBuilder.attachment is not implemented yet');
  }

  // ВАЖНО: this: EmailBuilder<EmailComplete> — TypeScript разрешит build()
  // только когда S расширяет {to: true; subject: true}.
  public build(this: EmailBuilder<EmailComplete>): EmailMessage {
    throw new Error('EmailBuilder.build is not implemented yet');
  }
}
