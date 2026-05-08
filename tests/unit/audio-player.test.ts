import { AudioPlayer } from '../../src/audio-player.js';

describe('AudioPlayer facade', () => {
  it('starts in idle state with default volume 1', () => {
    const p = new AudioPlayer();
    expect(p.getState()).toBe('idle');
    expect(p.getVolume()).toBe(1);
  });

  it('load fetches audio data', async () => {
    const p = new AudioPlayer();
    await p.load('song.mp3');
    // After load, state is still idle until play()
    expect(p.getState()).toBe('idle');
  });

  it('play after load moves to playing', async () => {
    const p = new AudioPlayer();
    await p.load('song.mp3');
    await p.play();
    expect(p.getState()).toBe('playing');
  });

  it('play without load throws', async () => {
    const p = new AudioPlayer();
    await expect(p.play()).rejects.toThrow();
  });

  it('pause after play moves to paused', async () => {
    const p = new AudioPlayer();
    await p.load('song.mp3');
    await p.play();
    await p.pause();
    expect(p.getState()).toBe('paused');
  });

  it('setVolume changes the gain', () => {
    const p = new AudioPlayer();
    p.setVolume(0.5);
    expect(p.getVolume()).toBe(0.5);
  });

  it('setVolume clamps to [0, 1]', () => {
    const p = new AudioPlayer();
    p.setVolume(2);
    expect(p.getVolume()).toBe(1);
    p.setVolume(-1);
    expect(p.getVolume()).toBe(0);
  });

  it('volume change persists across play/pause cycle', async () => {
    const p = new AudioPlayer();
    p.setVolume(0.3);
    await p.load('song.mp3');
    await p.play();
    await p.pause();
    expect(p.getVolume()).toBe(0.3);
  });
});
