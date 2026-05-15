import { PdfProcessor, HtmlProcessor } from '../../src/document-processor.js';

describe('PdfProcessor — overrides beforeSave hook', () => {
  it('runs the full pipeline', () => {
    const p = new PdfProcessor();
    const log = p.process('hello');
    expect(log.parsed).toBe('[PDF] hello');
    expect(log.validated).toBe(true);
    expect(log.transformed).toBe('[PDF] HELLO');
    expect(log.saved).toBe(true);
    expect(log.beforeSaveCalled).toBe(true);
  });

  it('side effects persisted', () => {
    const p = new PdfProcessor();
    p.process('test');
    expect(p.savedPayload).toBe('[PDF] TEST');
    expect(p.audit).toBe(true);
  });
});

describe('HtmlProcessor — uses default beforeSave hook', () => {
  it('strips tags', () => {
    const h = new HtmlProcessor();
    const log = h.process('<p>hello <b>world</b></p>');
    expect(log.transformed).toBe('[HTML] hello world');
  });

  it('beforeSave default returns false', () => {
    const h = new HtmlProcessor();
    const log = h.process('plain text');
    expect(log.beforeSaveCalled).toBe(false);
  });

  it('rejects scripts via validate', () => {
    const h = new HtmlProcessor();
    expect(() => h.process('<script>alert(1)</script>')).toThrow();
  });
});

describe('Template Method skeleton is fixed', () => {
  it('process runs parse → validate → transform → save in order', () => {
    // Косвенно подтверждается тем, что transformed = uppercase(parsed),
    // т.е. transform получил результат parse, а не raw.
    const p = new PdfProcessor();
    const log = p.process('abc');
    expect(log.transformed.startsWith('[PDF] ')).toBe(true);
    expect(log.transformed).toBe(log.parsed.toUpperCase());
  });
});
