import {
  FakeAudioContext,
  type FakeAudioBuffer,
  type FakeAudioBufferSourceNode,
  type FakeGainNode,
} from './audio-internals.js';

// Facade: AudioPlayer прячет за собой 4 класса Web Audio API.
// Снаружи — четыре простых метода: load, play, pause, setVolume.
//
// TODO: реализовать. State держим внутри:
// - context: FakeAudioContext (создаём в конструкторе)
// - gain: FakeGainNode (создаём один раз, connect к 'destination')
// - currentBuffer: FakeAudioBuffer | null
// - currentSource: FakeAudioBufferSourceNode | null
// - state: 'idle' | 'playing' | 'paused'
//
// load(url) — async: decodeAudioData → сохраняем currentBuffer.
// play() — async: если context.suspended → resume; создаём source, buffer, connect к gain, start.
// pause() — context.suspend.
// setVolume(v) — gain.gain = v (clamp 0..1).
export class AudioPlayer {
  private readonly context: FakeAudioContext;
  private readonly gain: FakeGainNode;
  private currentBuffer: FakeAudioBuffer | null = null;
  private currentSource: FakeAudioBufferSourceNode | null = null;
  private state: 'idle' | 'playing' | 'paused' = 'idle';

  public constructor() {
    this.context = new FakeAudioContext();
    this.gain = this.context.createGain();
    this.gain.connect('destination');
  }

  public async load(_url: string): Promise<void> {
    throw new Error('AudioPlayer.load is not implemented yet');
  }

  public async play(): Promise<void> {
    throw new Error('AudioPlayer.play is not implemented yet');
  }

  public async pause(): Promise<void> {
    throw new Error('AudioPlayer.pause is not implemented yet');
  }

  public setVolume(_value: number): void {
    throw new Error('AudioPlayer.setVolume is not implemented yet');
  }

  public getState(): 'idle' | 'playing' | 'paused' {
    return this.state;
  }

  public getVolume(): number {
    return this.gain.gain;
  }
}
