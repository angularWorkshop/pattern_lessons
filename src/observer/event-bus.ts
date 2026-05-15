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

export class EventBus {
  private readonly listeners = new Map<TrackerEvent['type'], Set<(event: TrackerEvent) => void>>();

  public on<E extends TrackerEvent['type']>(type: E, listener: Listener<E>): () => void {
    let bucket = this.listeners.get(type);
    if (!bucket) {
      bucket = new Set();
      this.listeners.set(type, bucket);
    }
    bucket.add(listener as (event: TrackerEvent) => void);
    return () => this.off(type, listener);
  }

  public off<E extends TrackerEvent['type']>(type: E, listener: Listener<E>): void {
    this.listeners.get(type)?.delete(listener as (event: TrackerEvent) => void);
  }

  public emit(event: TrackerEvent): void {
    const bucket = this.listeners.get(event.type);
    if (!bucket) return;
    for (const listener of bucket) {
      listener(event);
    }
  }

  public listenerCount(type: TrackerEvent['type']): number {
    return this.listeners.get(type)?.size ?? 0;
  }
}
