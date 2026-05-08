import { expectTypeOf } from 'vitest';
import { ParserFactory } from '../../src/parser-factory.js';
import { DocumentLoader } from '../../src/document-loader.js';
import type { Parser, ParserFormat, ParserResult, XmlNode } from '../../src/parser.js';

describe('Parser factory type contracts', () => {
  it('Parser.parse returns a ParserResult', () => {
    expectTypeOf<Parser['parse']>().parameters.toEqualTypeOf<[string]>();
    expectTypeOf<Parser['parse']>().returns.toEqualTypeOf<ParserResult>();
  });

  it('ParserFormat union covers the four expected formats', () => {
    expectTypeOf<ParserFormat>().toEqualTypeOf<'csv' | 'json' | 'xml' | 'yaml'>();
  });

  it('ParserFactory.create accepts a ParserFormat and returns a Parser', () => {
    expectTypeOf(ParserFactory.prototype.create).parameters.toEqualTypeOf<[ParserFormat]>();
    expectTypeOf(ParserFactory.prototype.create).returns.toEqualTypeOf<Parser>();
  });

  it('ParserFactory.register accepts a format and a no-arg factory function', () => {
    expectTypeOf(ParserFactory.prototype).toHaveProperty('register');
    expectTypeOf(ParserFactory.prototype.register).parameters.toEqualTypeOf<
      [ParserFormat, () => Parser]
    >();
  });

  it('DocumentLoader can be constructed with or without an explicit factory', () => {
    expectTypeOf(() => new DocumentLoader()).returns.toEqualTypeOf<DocumentLoader>();
    expectTypeOf(() => new DocumentLoader(new ParserFactory())).returns.toEqualTypeOf<DocumentLoader>();
  });

  it('XmlNode shape is preserved', () => {
    expectTypeOf<XmlNode>().toEqualTypeOf<{
      tag: string;
      attributes: Record<string, string>;
      children: XmlNode[];
      text: string;
    }>();
  });
});
