// Template Method через абстрактный класс.
// process() — фиксированный скелет: parse → validate → transform → save.
// Hook beforeSave() — опциональный шаг с пустой реализацией по умолчанию.

export interface ProcessLog {
  parsed: string;
  validated: boolean;
  transformed: string;
  saved: boolean;
  beforeSaveCalled: boolean;
}

export abstract class DocumentProcessor {
  // Шаги фиксированы.
  public process(raw: string): ProcessLog {
    const parsed = this.parse(raw);
    const validated = this.validate(parsed);
    if (!validated) {
      throw new Error('DocumentProcessor.process: validation failed');
    }
    const transformed = this.transform(parsed);
    const beforeSaveCalled = this.beforeSave(transformed);
    this.save(transformed);
    return { parsed, validated, transformed, saved: true, beforeSaveCalled };
  }

  protected abstract parse(raw: string): string;
  protected abstract validate(parsed: string): boolean;
  protected abstract transform(parsed: string): string;
  protected abstract save(transformed: string): void;

  // Hook с пустой реализацией. Возвращает признак "был вызван".
  protected beforeSave(_transformed: string): boolean {
    return false;
  }
}

export class PdfProcessor extends DocumentProcessor {
  public savedPayload = '';
  public audit = false;

  protected override parse(raw: string): string {
    return `[PDF] ${raw}`;
  }
  protected override validate(parsed: string): boolean {
    return parsed.length > 0;
  }
  protected override transform(parsed: string): string {
    return parsed.toUpperCase();
  }
  protected override save(transformed: string): void {
    this.savedPayload = transformed;
  }
  protected override beforeSave(_transformed: string): boolean {
    this.audit = true;
    return true;
  }
}

export class HtmlProcessor extends DocumentProcessor {
  public savedPayload = '';

  protected override parse(raw: string): string {
    return `[HTML] ${raw}`;
  }
  protected override validate(parsed: string): boolean {
    return !parsed.includes('<script>');
  }
  protected override transform(parsed: string): string {
    return parsed.replace(/<[^>]+>/g, '');
  }
  protected override save(transformed: string): void {
    this.savedPayload = transformed;
  }
}
