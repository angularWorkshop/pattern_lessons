import type { Parser, ParserFormat } from './parser.js';

// TODO: implement the factory. Internally use a Map<ParserFormat, () => Parser>
// so that adding a new format never requires editing if/else inside `create`.
//
// The exercise also asks for a runtime-extensible factory: expose a
// `register(format, factory)` method so calling code can plug a new
// parser without editing this file.
export class ParserFactory {
  public create(_format: ParserFormat): Parser {
    throw new Error('ParserFactory.create is not implemented yet');
  }

  // TODO: implement register(format, factory)
}
