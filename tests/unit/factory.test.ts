import { ParserFactory } from '../../src/parser-factory.js';
import { CsvParser } from '../../src/csv-parser.js';
import { JsonParser } from '../../src/json-parser.js';
import { XmlParser } from '../../src/xml-parser.js';

describe('ParserFactory — built-in formats', () => {
  it('returns a CsvParser for "csv"', () => {
    expect(new ParserFactory().create('csv')).toBeInstanceOf(CsvParser);
  });

  it('returns a JsonParser for "json"', () => {
    expect(new ParserFactory().create('json')).toBeInstanceOf(JsonParser);
  });

  it('returns an XmlParser for "xml"', () => {
    expect(new ParserFactory().create('xml')).toBeInstanceOf(XmlParser);
  });

  it('throws a clear error for an unregistered format', () => {
    expect(() => new ParserFactory().create('yaml')).toThrow(/yaml/);
  });
});

describe('ParserFactory — runtime registration', () => {
  it('lets external code register a new format', async () => {
    const factory = new ParserFactory();
    const { YamlParser } = await import('../../src/yaml-parser.js');
    factory.register('yaml', () => new YamlParser());

    const parser = factory.create('yaml');
    expect(parser).toBeInstanceOf(YamlParser);
  });

  it('produces a fresh parser instance per call', () => {
    const factory = new ParserFactory();
    expect(factory.create('csv')).not.toBe(factory.create('csv'));
  });

  it('lets re-registration override a built-in format', () => {
    const factory = new ParserFactory();
    factory.register('csv', () => new XmlParser());
    expect(factory.create('csv')).toBeInstanceOf(XmlParser);
  });
});
