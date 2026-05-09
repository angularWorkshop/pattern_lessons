import { CommandQueue, type QueueCommand } from '../../src/queue.js';

const trackerCommand = (label: string, log: string[]): QueueCommand => ({
  execute: () => log.push(label),
});

describe('CommandQueue — priority order', () => {
  it('higher priority runs first', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.schedule(trackerCommand('low', log), 1);
    q.schedule(trackerCommand('high', log), 10);
    q.schedule(trackerCommand('mid', log), 5);
    q.runAll();
    expect(log).toEqual(['high', 'mid', 'low']);
  });

  it('equal priorities keep insertion order (stable sort)', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.schedule(trackerCommand('a', log), 5);
    q.schedule(trackerCommand('b', log), 5);
    q.schedule(trackerCommand('c', log), 5);
    q.runAll();
    expect(log).toEqual(['a', 'b', 'c']);
  });
});

describe('CommandQueue — cancellation', () => {
  it('cancel skips a queued command', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.schedule(trackerCommand('a', log), 1);
    const id = q.schedule(trackerCommand('b', log), 2);
    q.schedule(trackerCommand('c', log), 3);
    q.cancel(id);
    q.runAll();
    expect(log).toEqual(['c', 'a']);
  });

  it('cancelling an unknown id is a no-op', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    q.schedule(trackerCommand('a', log), 1);
    q.cancel(999);
    q.runAll();
    expect(log).toEqual(['a']);
  });
});

describe('CommandQueue — runAll return value', () => {
  it('returns the executed ids in execution order', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    const a = q.schedule(trackerCommand('a', log), 1);
    const b = q.schedule(trackerCommand('b', log), 5);
    const c = q.schedule(trackerCommand('c', log), 3);
    expect(q.runAll()).toEqual([b, c, a]);
  });

  it('cancelled commands do not appear in the return list', () => {
    const log: string[] = [];
    const q = new CommandQueue();
    const a = q.schedule(trackerCommand('a', log), 1);
    const b = q.schedule(trackerCommand('b', log), 2);
    q.cancel(a);
    expect(q.runAll()).toEqual([b]);
  });
});
