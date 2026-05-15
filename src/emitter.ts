// Типизированный EventEmitter.
// Events — карта "имя события → массив аргументов".
// on / off / once / emit с автодополнением имени события и проверкой аргументов.

export type EventMap = Record<string, unknown[]>;

export type Listener<Args extends unknown[]> = (...args: Args) => void;

// TODO: реализовать EventEmitter<Events>.
// Внутри: Map<keyof Events, Set<Listener>>.
// - on(name, listener): добавить listener в Set для name
// - off(name, listener): убрать из Set
// - once(name, listener): обернуть listener так, чтобы после первого вызова сам себя отписал
// - emit(name, ...args): пройтись по копии Set и вызвать каждый listener (копия — чтобы новые
//   подписки внутри listener'а не попадали в текущий emit)
export class EventEmitter<Events extends EventMap> {
  private readonly listeners = new Map<keyof Events, Set<Listener<unknown[]>>>();

  public on<K extends keyof Events>(_name: K, _listener: Listener<Events[K]>): void {
    throw new Error('EventEmitter.on is not implemented yet');
  }

  public off<K extends keyof Events>(_name: K, _listener: Listener<Events[K]>): void {
    throw new Error('EventEmitter.off is not implemented yet');
  }

  public once<K extends keyof Events>(_name: K, _listener: Listener<Events[K]>): void {
    throw new Error('EventEmitter.once is not implemented yet');
  }

  public emit<K extends keyof Events>(_name: K, ..._args: Events[K]): void {
    throw new Error('EventEmitter.emit is not implemented yet');
  }
}
