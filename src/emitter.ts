export type EventMap = Record<string, unknown[]>;

export type Listener<Args extends unknown[]> = (...args: Args) => void;

export class EventEmitter<Events extends EventMap> {
  private readonly listeners = new Map<keyof Events, Set<Listener<unknown[]>>>();

  public on<K extends keyof Events>(name: K, listener: Listener<Events[K]>): void {
    let set = this.listeners.get(name);
    if (!set) {
      set = new Set();
      this.listeners.set(name, set);
    }
    set.add(listener as Listener<unknown[]>);
  }

  public off<K extends keyof Events>(name: K, listener: Listener<Events[K]>): void {
    this.listeners.get(name)?.delete(listener as Listener<unknown[]>);
  }

  public once<K extends keyof Events>(name: K, listener: Listener<Events[K]>): void {
    const wrapper = ((...args: Events[K]): void => {
      this.off(name, wrapper);
      listener(...args);
    }) as Listener<Events[K]>;
    this.on(name, wrapper);
  }

  public emit<K extends keyof Events>(name: K, ...args: Events[K]): void {
    const set = this.listeners.get(name);
    if (!set) return;
    for (const listener of [...set]) {
      (listener as Listener<Events[K]>)(...args);
    }
  }
}
