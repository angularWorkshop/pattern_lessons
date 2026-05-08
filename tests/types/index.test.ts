import { expectTypeOf } from 'vitest';
import { AudioPlayer } from '../../src/audio-player.js';

describe('AudioPlayer facade type contracts', () => {
  it('public API surface is exactly load/play/pause/setVolume/getState/getVolume', () => {
    expectTypeOf(AudioPlayer.prototype.load).parameters.toEqualTypeOf<[string]>();
    expectTypeOf(AudioPlayer.prototype.load).returns.toEqualTypeOf<Promise<void>>();
    expectTypeOf(AudioPlayer.prototype.play).returns.toEqualTypeOf<Promise<void>>();
    expectTypeOf(AudioPlayer.prototype.pause).returns.toEqualTypeOf<Promise<void>>();
    expectTypeOf(AudioPlayer.prototype.setVolume).parameters.toEqualTypeOf<[number]>();
    expectTypeOf(AudioPlayer.prototype.getState).returns.toEqualTypeOf<'idle' | 'playing' | 'paused'>();
    expectTypeOf(AudioPlayer.prototype.getVolume).returns.toEqualTypeOf<number>();
  });
});
