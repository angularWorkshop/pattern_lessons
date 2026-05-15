import { EventEmitter } from '../../src/emitter.js';

type Events = {
  click: [x: number, y: number];
  message: [body: string];
  ping: [];
};

describe('EventEmitter — basic on/emit', () => {
  it('listener receives emitted args', () => {
    const e = new EventEmitter<Events>();
    let received: [number, number] | null = null;
    e.on('click', (x, y) => {
      received = [x, y];
    });
    e.emit('click', 10, 20);
    expect(received).toEqual([10, 20]);
  });

  it('multiple listeners on the same event all fire', () => {
    const e = new EventEmitter<Events>();
    const log: string[] = [];
    e.on('message', (body) => log.push(`a:${body}`));
    e.on('message', (body) => log.push(`b:${body}`));
    e.emit('message', 'hi');
    expect(log).toEqual(['a:hi', 'b:hi']);
  });

  it('events with no args still fire', () => {
    const e = new EventEmitter<Events>();
    let calls = 0;
    e.on('ping', () => calls++);
    e.emit('ping');
    e.emit('ping');
    expect(calls).toBe(2);
  });
});

describe('EventEmitter — off', () => {
  it('removes a specific listener', () => {
    const e = new EventEmitter<Events>();
    let aCalls = 0;
    let bCalls = 0;
    const a = (): void => {
      aCalls++;
    };
    const b = (): void => {
      bCalls++;
    };
    e.on('ping', a);
    e.on('ping', b);
    e.off('ping', a);
    e.emit('ping');
    expect(aCalls).toBe(0);
    expect(bCalls).toBe(1);
  });
});

describe('EventEmitter — once', () => {
  it('fires only one time then auto-detaches', () => {
    const e = new EventEmitter<Events>();
    let calls = 0;
    e.once('ping', () => calls++);
    e.emit('ping');
    e.emit('ping');
    e.emit('ping');
    expect(calls).toBe(1);
  });
});

describe('EventEmitter — emit during emit', () => {
  it('does not run listeners added during the current emit', () => {
    const e = new EventEmitter<Events>();
    const fired: string[] = [];
    e.on('ping', () => {
      fired.push('first');
      e.on('ping', () => fired.push('late'));
    });
    e.emit('ping');
    expect(fired).toEqual(['first']);
    e.emit('ping');
    // На втором emit late тоже не выполнится — он был добавлен внутри первого
    // emit и попал в listeners уже после копии. Тут он выполнится точно.
    expect(fired).toEqual(['first', 'first', 'late']);
  });
});
