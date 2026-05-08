import { DocumentLoader } from '../../src/document-loader.js';
import { ParserFactory } from '../../src/parser-factory.js';

describe('DocumentLoader — end-to-end', () => {
  it('parses CSV into rows of cells', () => {
    const result = new DocumentLoader().load('csv', 'a,b,c\n1,2,3');
    expect(result.format).toBe('csv');
    expect(result.data).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('parses JSON into a JavaScript value', () => {
    const result = new DocumentLoader().load('json', '{"a":1}');
    expect(result.format).toBe('json');
    expect(result.data).toEqual({ a: 1 });
  });

  it('parses a top-level XML tag with attributes', () => {
    const result = new DocumentLoader().load('xml', '<book id="42">Hello</book>');
    expect(result.format).toBe('xml');
    expect(result.data).toMatchObject({
      tag: 'book',
      attributes: { id: '42' },
      text: 'Hello',
    });
  });

  it('parses YAML registered into the factory from outside', async () => {
    // After the refactor DocumentLoader delegates to a ParserFactory and
    // the factory exposes register(format, factoryFn). External code can
    // plug in a new format without editing DocumentLoader or the factory.
    const factory = new ParserFactory();
    const { YamlParser } = await import('../../src/yaml-parser.js');
    factory.register('yaml', () => new YamlParser());

    const result = new DocumentLoader(factory).load('yaml', 'name: Max\nrole: editor');
    expect(result.format).toBe('yaml');
    expect(result.data).toMatchObject({ name: 'Max', role: 'editor' });
  });
});
