export type ParserFormat = 'csv' | 'json' | 'xml' | 'yaml';

export interface XmlNode {
  tag: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text: string;
}

export interface ParserResult {
  format: ParserFormat;
  data: unknown;
  warnings: readonly string[];
}

export interface Parser {
  readonly format: ParserFormat;
  parse(text: string): ParserResult;
}
