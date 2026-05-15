import type { Task } from '../models/task.js';

export type TrackerEvent =
  | { type: 'task:added'; task: Task }
  | { type: 'task:removed'; taskId: string }
  | { type: 'task:updated'; task: Task; previous: Task }
  | { type: 'task:moved'; task: Task; from: Task['status']; to: Task['status'] };

export type EventMap = {
  [E in TrackerEvent as E['type']]: E;
};

export type Listener<E extends TrackerEvent['type']> = (event: EventMap[E]) => void;

// TODO: реализуй типобезопасный EventBus:
//   - on<E>(type, listener): возвращает unsubscribe-функцию
//   - emit<E>(event): вызывает всех слушателей этого type
//   - off<E>(type, listener): убирает конкретного слушателя
//   - listenerCount(type)
// Гарантии: listener вызывается только для своего типа события.

export class EventBus {
  public on<E extends TrackerEvent['type']>(_type: E, _listener: Listener<E>): () => void {
    throw new Error('Not implemented');
  }

  public off<E extends TrackerEvent['type']>(_type: E, _listener: Listener<E>): void {
    throw new Error('Not implemented');
  }

  public emit(_event: TrackerEvent): void {
    throw new Error('Not implemented');
  }

  public listenerCount(_type: TrackerEvent['type']): number {
    throw new Error('Not implemented');
  }
}
