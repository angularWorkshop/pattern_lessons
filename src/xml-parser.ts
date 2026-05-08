import type { Parser, ParserFormat, ParserResult, XmlNode } from './parser.js';

// Tiny stand-in XML parser. Recognizes a single self-closing or paired tag
// at the top level, just enough for the exercise — real XML parsing is its
// own rabbit hole.
export class XmlParser implements Parser {
  public readonly format: ParserFormat = 'xml';

  public parse(text: string): ParserResult {
    const trimmed = text.trim();
    const match = /^<(\w+)(?:\s+([^>]*))?\s*\/?>(?:([^<]*)<\/\w+>)?$/.exec(trimmed);
    if (!match) {
      return {
        format: 'xml',
        data: null,
        warnings: [`xml: top-level tag not recognized in ${trimmed.slice(0, 40)}`],
      };
    }
    const tagName = match[1] ?? '';
    const node: XmlNode = {
      tag: tagName,
      attributes: parseAttributes(match[2] ?? ''),
      children: [],
      text: (match[3] ?? '').trim(),
    };
    return {
      format: 'xml',
      data: node,
      warnings: [],
    };
  }
}

function parseAttributes(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!raw) return result;
  const re = /(\w+)="([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    if (match[1]) result[match[1]] = match[2] ?? '';
  }
  return result;
}
