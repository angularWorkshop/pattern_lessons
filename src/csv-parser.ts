import type { Parser, ParserFormat, ParserResult } from './parser.js';

export class CsvParser implements Parser {
  public readonly format: ParserFormat = 'csv';

  public parse(text: string): ParserResult {
    const lines = text.split('\n').filter((line) => line.length > 0);
    const rows = lines.map((line) => line.split(',').map((cell) => cell.trim()));
    return {
      format: 'csv',
      data: rows,
      warnings: [],
    };
  }
}
