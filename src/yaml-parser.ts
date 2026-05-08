import type { Parser, ParserFormat, ParserResult } from './parser.js';

// Tiny key:value YAML parser — enough for the exercise. Real YAML is far
// more complex (lists, anchors, multi-line strings). The point here is to
// have an extra Parser implementation that can be plugged into the factory
// from outside.
export class YamlParser implements Parser {
  public readonly format: ParserFormat = 'yaml';

  public parse(text: string): ParserResult {
    const result: Record<string, string> = {};
    const warnings: string[] = [];
    const lines = text.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);

    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) {
        warnings.push(`yaml: skipped line without colon: ${line}`);
        continue;
      }
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      if (!key) {
        warnings.push(`yaml: skipped line with empty key: ${line}`);
        continue;
      }
      result[key] = value;
    }

    return {
      format: 'yaml',
      data: result,
      warnings,
    };
  }
}
