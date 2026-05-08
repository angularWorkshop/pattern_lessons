import {
  FakeAudioContext,
  type FakeAudioBuffer,
  type FakeAudioBufferSourceNode,
  type FakeGainNode,
} from './audio-internals.js';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

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

  public async load(url: string): Promise<void> {
    this.currentBuffer = await this.context.decodeAudioData(url);
  }

  public async play(): Promise<void> {
    if (!this.currentBuffer) {
      throw new Error('AudioPlayer.play: no buffer loaded — call load() first');
    }
    if (this.context.state === 'suspended') {
      await this.context.resume();
    }
    const source = this.context.createBufferSource();
    source.buffer = this.currentBuffer;
    source.connect(this.gain);
    source.start();
    this.currentSource = source;
    this.state = 'playing';
  }

  public async pause(): Promise<void> {
    await this.context.suspend();
    this.state = 'paused';
  }

  public setVolume(value: number): void {
    this.gain.gain = clamp(value, 0, 1);
  }

  public getState(): 'idle' | 'playing' | 'paused' {
    return this.state;
  }

  public getVolume(): number {
    return this.gain.gain;
  }
}
