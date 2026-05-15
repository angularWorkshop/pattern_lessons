import { vi } from 'vitest';
import { EventBus } from '../../src/observer/event-bus.js';
import type { Task } from '../../src/models/task.js';

const task: Task = {
  id: '1',
  type: 'bug',
  title: 't',
  status: 'todo',
  priority: 'high',
  assignee: null,
  createdAt: 0,
};

describe('Observer — typed EventBus', () => {
  it('delivers events of matching type only', () => {
    const bus = new EventBus();
    const added = vi.fn();
    const removed = vi.fn();
    bus.on('task:added', added);
    bus.on('task:removed', removed);

    bus.emit({ type: 'task:added', task });
    expect(added).toHaveBeenCalledTimes(1);
    expect(removed).toHaveBeenCalledTimes(0);
  });

  it('on returns unsubscribe function', () => {
    const bus = new EventBus();
    const listener = vi.fn();
    const off = bus.on('task:added', listener);
    off();
    bus.emit({ type: 'task:added', task });
    expect(listener).toHaveBeenCalledTimes(0);
  });

  it('off removes a specific listener', () => {
    const bus = new EventBus();
    const a = vi.fn();
    const b = vi.fn();
    bus.on('task:added', a);
    bus.on('task:added', b);
    bus.off('task:added', a);
    bus.emit({ type: 'task:added', task });
    expect(a).toHaveBeenCalledTimes(0);
    expect(b).toHaveBeenCalledTimes(1);
  });

  it('listenerCount reports correctly', () => {
    const bus = new EventBus();
    expect(bus.listenerCount('task:added')).toBe(0);
    bus.on('task:added', vi.fn());
    bus.on('task:added', vi.fn());
    expect(bus.listenerCount('task:added')).toBe(2);
  });

  it('passes typed payload', () => {
    const bus = new EventBus();
    const listener = vi.fn();
    bus.on('task:moved', listener);
    bus.emit({ type: 'task:moved', task, from: 'todo', to: 'in_progress' });
    expect(listener).toHaveBeenCalledWith({ type: 'task:moved', task, from: 'todo', to: 'in_progress' });
  });
});
