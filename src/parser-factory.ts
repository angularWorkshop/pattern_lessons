import type { Parser, ParserFormat } from './parser.js';
import { CsvParser } from './csv-parser.js';
import { JsonParser } from './json-parser.js';
import { XmlParser } from './xml-parser.js';

type ParserFactoryFn = () => Parser;

export class ParserFactory {
  private readonly registry = new Map<ParserFormat, ParserFactoryFn>([
    ['csv', () => new CsvParser()],
    ['json', () => new JsonParser()],
    ['xml', () => new XmlParser()],
  ]);

  public create(format: ParserFormat): Parser {
    const factory = this.registry.get(format);
    if (!factory) {
      throw new Error(`No parser registered for format: ${String(format)}`);
    }
    return factory();
  }

  public register(format: ParserFormat, factory: ParserFactoryFn): void {
    this.registry.set(format, factory);
  }
}
