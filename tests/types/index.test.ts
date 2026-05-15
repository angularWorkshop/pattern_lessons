import { expectTypeOf } from 'vitest';
import {
  DocumentProcessor,
  PdfProcessor,
  type ProcessLog,
} from '../../src/document-processor.js';

describe('Template Method type contracts', () => {
  it('process returns ProcessLog', () => {
    expectTypeOf(DocumentProcessor.prototype.process).returns.toEqualTypeOf<ProcessLog>();
  });
  it('PdfProcessor is a DocumentProcessor', () => {
    expectTypeOf<PdfProcessor>().toMatchTypeOf<DocumentProcessor>();
  });
});
