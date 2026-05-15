import {
  TrafficLight,
  RedState,
  GreenState,
  YellowState,
} from '../../src/traffic-light.js';

describe('TrafficLight — cycles Red → Green → Yellow → Red', () => {
  it('starts at red', () => {
    expect(new TrafficLight().getColor()).toBe('red');
  });

  it('one tick moves red → green', () => {
    const light = new TrafficLight();
    light.tick();
    expect(light.getColor()).toBe('green');
  });

  it('two ticks: green → yellow', () => {
    const light = new TrafficLight();
    light.tick();
    light.tick();
    expect(light.getColor()).toBe('yellow');
  });

  it('three ticks return to red', () => {
    const light = new TrafficLight();
    light.tick();
    light.tick();
    light.tick();
    expect(light.getColor()).toBe('red');
  });

  it('keeps cycling indefinitely', () => {
    const light = new TrafficLight();
    const colors: string[] = [];
    for (let i = 0; i < 7; i++) {
      colors.push(light.getColor());
      light.tick();
    }
    expect(colors).toEqual(['red', 'green', 'yellow', 'red', 'green', 'yellow', 'red']);
  });
});

describe('State classes report their colors', () => {
  it('color attribute matches the state', () => {
    expect(new RedState().color).toBe('red');
    expect(new GreenState().color).toBe('green');
    expect(new YellowState().color).toBe('yellow');
  });
});
