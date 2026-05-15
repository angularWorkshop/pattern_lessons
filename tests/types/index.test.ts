import { expectTypeOf } from 'vitest';
import { EventEmitter } from '../../src/emitter.js';

type Events = {
  click: [x: number, y: number];
  message: [body: string];
};

describe('EventEmitter type contracts', () => {
  it('on takes correctly typed args for the event', () => {
    const e = new EventEmitter<Events>();
    expectTypeOf(e.on<'click'>).parameters.toEqualTypeOf<['click', (x: number, y: number) => void]>();
    expectTypeOf(e.on<'message'>).parameters.toEqualTypeOf<['message', (body: string) => void]>();
  });

  it('emit takes correctly typed args for the event', () => {
    const e = new EventEmitter<Events>();
    expectTypeOf(e.emit<'click'>).parameters.toEqualTypeOf<['click', number, number]>();
  });
});
