export type LightColor = 'red' | 'green' | 'yellow';

export interface TrafficLightState {
  readonly color: LightColor;
  next(context: TrafficLight): TrafficLightState;
}

export class RedState implements TrafficLightState {
  public readonly color: LightColor = 'red';
  public next(_context: TrafficLight): TrafficLightState {
    return new GreenState();
  }
}

export class GreenState implements TrafficLightState {
  public readonly color: LightColor = 'green';
  public next(_context: TrafficLight): TrafficLightState {
    return new YellowState();
  }
}

export class YellowState implements TrafficLightState {
  public readonly color: LightColor = 'yellow';
  public next(_context: TrafficLight): TrafficLightState {
    return new RedState();
  }
}

export class TrafficLight {
  private state: TrafficLightState = new RedState();

  public getColor(): LightColor {
    return this.state.color;
  }

  public tick(): void {
    this.state = this.state.next(this);
  }
}
