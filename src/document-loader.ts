import type { ParserFormat, ParserResult } from './parser.js';
import { ParserFactory } from './parser-factory.js';

export class DocumentLoader {
  private readonly factory: ParserFactory;

  public constructor(factory: ParserFactory = new ParserFactory()) {
    this.factory = factory;
  }

  public load(format: ParserFormat, text: string): ParserResult {
    return this.factory.create(format).parse(text);
  }
}
