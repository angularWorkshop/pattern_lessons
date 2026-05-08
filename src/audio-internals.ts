// Имитация Web Audio API. В реальности это десяток классов с разными методами,
// неочевидными зависимостями и порядком инициализации. Здесь — упрощённо,
// но с теми же паттернами: контекст, источник, gain-узел и явный routing.

export class FakeAudioContext {
  public state: 'suspended' | 'running' | 'closed' = 'suspended';
  private readonly buffers = new Map<string, FakeAudioBuffer>();

  public async resume(): Promise<void> {
    if (this.state === 'closed') {
      throw new Error('AudioContext is closed');
    }
    this.state = 'running';
  }

  public async suspend(): Promise<void> {
    if (this.state === 'closed') return;
    this.state = 'suspended';
  }

  public async decodeAudioData(url: string): Promise<FakeAudioBuffer> {
    const buffer = new FakeAudioBuffer(url);
    this.buffers.set(url, buffer);
    return buffer;
  }

  public createBufferSource(): FakeAudioBufferSourceNode {
    return new FakeAudioBufferSourceNode();
  }

  public createGain(): FakeGainNode {
    return new FakeGainNode();
  }
}

export class FakeAudioBuffer {
  public constructor(public readonly url: string) {}
}

export class FakeAudioBufferSourceNode {
  public buffer: FakeAudioBuffer | null = null;
  public connected: FakeGainNode | null = null;
  public started = false;
  public stopped = false;

  public connect(node: FakeGainNode): void {
    this.connected = node;
  }

  public start(): void {
    if (!this.buffer) {
      throw new Error('Source has no buffer');
    }
    if (!this.connected) {
      throw new Error('Source is not connected to a destination');
    }
    this.started = true;
  }

  public stop(): void {
    this.stopped = true;
  }
}

export class FakeGainNode {
  public gain = 1;
  public connectedTo: 'destination' | null = null;

  public connect(destination: 'destination'): void {
    this.connectedTo = destination;
  }
}
