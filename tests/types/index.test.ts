import { expectTypeOf } from 'vitest';
import {
  TrafficLight,
  type LightColor,
  type TrafficLightState,
} from '../../src/traffic-light.js';

describe('State type contracts', () => {
  it('LightColor is the union of three colors', () => {
    expectTypeOf<LightColor>().toEqualTypeOf<'red' | 'green' | 'yellow'>();
  });

  it('TrafficLight.getColor returns LightColor', () => {
    expectTypeOf(TrafficLight.prototype.getColor).returns.toEqualTypeOf<LightColor>();
  });

  it('TrafficLightState.next returns TrafficLightState', () => {
    expectTypeOf<TrafficLightState['next']>().returns.toEqualTypeOf<TrafficLightState>();
  });
});
