import { expectTypeOf } from 'vitest';
import { CommandQueue, type CommandId, type QueueCommand } from '../../src/queue.js';

describe('CommandQueue type contracts', () => {
  it('schedule takes a QueueCommand and a number, returns CommandId', () => {
    expectTypeOf(CommandQueue.prototype.schedule).parameters.toEqualTypeOf<[QueueCommand, number]>();
    expectTypeOf(CommandQueue.prototype.schedule).returns.toEqualTypeOf<CommandId>();
  });
  it('cancel takes a CommandId, returns void', () => {
    expectTypeOf(CommandQueue.prototype.cancel).parameters.toEqualTypeOf<[CommandId]>();
    expectTypeOf(CommandQueue.prototype.cancel).returns.toEqualTypeOf<void>();
  });
  it('runAll returns readonly CommandId[]', () => {
    expectTypeOf(CommandQueue.prototype.runAll).returns.toEqualTypeOf<readonly CommandId[]>();
  });
});
