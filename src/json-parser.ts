import type { Parser, ParserFormat, ParserResult } from './parser.js';

export class JsonParser implements Parser {
  public readonly format: ParserFormat = 'json';

  public parse(text: string): ParserResult {
    try {
      return {
        format: 'json',
        data: JSON.parse(text) as unknown,
        warnings: [],
      };
    } catch (error) {
      return {
        format: 'json',
        data: null,
        warnings: [`json: ${(error as Error).message}`],
      };
    }
  }
}
