import type { ParserFormat, ParserResult } from './parser.js';
import { CsvParser } from './csv-parser.js';
import { JsonParser } from './json-parser.js';
import { XmlParser } from './xml-parser.js';

// TODO: replace the inline switch with ParserFactory.create(format).parse(text).
// After the refactor, accepting a new format must be a matter of registering
// it in the factory — DocumentLoader stays untouched.
export class DocumentLoader {
  public load(format: ParserFormat, text: string): ParserResult {
    switch (format) {
      case 'csv': {
        return new CsvParser().parse(text);
      }
      case 'json': {
        return new JsonParser().parse(text);
      }
      case 'xml': {
        return new XmlParser().parse(text);
      }
      default: {
        throw new Error(`Unknown format: ${String(format)}`);
      }
    }
  }
}
