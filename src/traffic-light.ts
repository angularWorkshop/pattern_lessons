// Классический State pattern на классах.
// Каждое состояние — отдельный класс с общим интерфейсом TrafficLightState.
// Контекст (TrafficLight) делегирует "next" текущему состоянию.

export type LightColor = 'red' | 'green' | 'yellow';

export interface TrafficLightState {
  readonly color: LightColor;
  next(context: TrafficLight): TrafficLightState;
}

// TODO: реализовать три состояния и контекст.
// Cycle: Red → Green → Yellow → Red.
// next() возвращает новый объект состояния (классы-синглтоны можно, но
// просто инстанциировать тоже норм).

export class RedState implements TrafficLightState {
  public readonly color: LightColor = 'red';
  public next(_context: TrafficLight): TrafficLightState {
    throw new Error('RedState.next is not implemented yet');
  }
}

export class GreenState implements TrafficLightState {
  public readonly color: LightColor = 'green';
  public next(_context: TrafficLight): TrafficLightState {
    throw new Error('GreenState.next is not implemented yet');
  }
}

export class YellowState implements TrafficLightState {
  public readonly color: LightColor = 'yellow';
  public next(_context: TrafficLight): TrafficLightState {
    throw new Error('YellowState.next is not implemented yet');
  }
}

// TODO: TrafficLight (контекст).
// - конструктор: state = new RedState()
// - getColor(): возвращает this.state.color
// - tick(): this.state = this.state.next(this)
export class TrafficLight {
  private state: TrafficLightState = new RedState();

  public getColor(): LightColor {
    return this.state.color;
  }

  public tick(): void {
    throw new Error('TrafficLight.tick is not implemented yet');
  }
}
