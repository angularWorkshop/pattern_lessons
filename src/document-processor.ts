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

// TODO: реализовать PdfProcessor.
// - parse: "[PDF] " + raw
// - validate: parsed.length > 0
// - transform: uppercase
// - save: this.savedPayload = transformed
// - beforeSave: вернуть true и записать this.audit = true
export class PdfProcessor extends DocumentProcessor {
  public savedPayload = '';
  public audit = false;

  protected override parse(_raw: string): string {
    throw new Error('PdfProcessor.parse is not implemented yet');
  }
  protected override validate(_parsed: string): boolean {
    throw new Error('PdfProcessor.validate is not implemented yet');
  }
  protected override transform(_parsed: string): string {
    throw new Error('PdfProcessor.transform is not implemented yet');
  }
  protected override save(_transformed: string): void {
    throw new Error('PdfProcessor.save is not implemented yet');
  }
  protected override beforeSave(_transformed: string): boolean {
    throw new Error('PdfProcessor.beforeSave is not implemented yet');
  }
}

// TODO: HtmlProcessor — без override beforeSave (используется дефолтный).
// - parse: "[HTML] " + raw
// - validate: !parsed.includes('<script>')
// - transform: parsed.replace(/<[^>]+>/g, '')   // strip tags
// - save: this.savedPayload = transformed
export class HtmlProcessor extends DocumentProcessor {
  public savedPayload = '';

  protected override parse(_raw: string): string {
    throw new Error('HtmlProcessor.parse is not implemented yet');
  }
  protected override validate(_parsed: string): boolean {
    throw new Error('HtmlProcessor.validate is not implemented yet');
  }
  protected override transform(_parsed: string): string {
    throw new Error('HtmlProcessor.transform is not implemented yet');
  }
  protected override save(_transformed: string): void {
    throw new Error('HtmlProcessor.save is not implemented yet');
  }
}
