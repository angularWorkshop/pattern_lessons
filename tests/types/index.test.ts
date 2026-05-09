import { expectTypeOf } from 'vitest';
import {
  CommandStack,
  IncrementCommand,
  Counter,
  type Command,
} from '../../src/command.js';

describe('Command type contracts', () => {
  it('Command interface has execute and undo', () => {
    expectTypeOf<Command>().toEqualTypeOf<{ execute(): void; undo(): void }>();
  });

  it('IncrementCommand implements Command', () => {
    expectTypeOf<IncrementCommand>().toMatchTypeOf<Command>();
  });

  it('CommandStack.run takes a Command', () => {
    expectTypeOf(CommandStack.prototype.run).parameters.toEqualTypeOf<[Command]>();
    expectTypeOf(CommandStack.prototype.run).returns.toEqualTypeOf<void>();
  });

  it('IncrementCommand constructor takes a Counter', () => {
    expectTypeOf(IncrementCommand).constructorParameters.toEqualTypeOf<[Counter]>();
  });
});
