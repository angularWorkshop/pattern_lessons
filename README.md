# Topic 20 · Exercise 20.1 — State: светофор

Реализуй классический State pattern: три состояния (Red, Green, Yellow) и контекст TrafficLight, делегирующий поведение текущему состоянию.

## Что нужно сделать

В `src/traffic-light.ts`:

- `RedState.next()` → `new GreenState()`
- `GreenState.next()` → `new YellowState()`
- `YellowState.next()` → `new RedState()`
- `TrafficLight.tick()` → `this.state = this.state.next(this)`

## Главное

`TrafficLight` ничего не знает о порядке переходов — это знание живёт в самих состояниях. Добавить новое состояние или поменять последовательность = править один класс, не контекст.

## Критерии сдачи

- 6 тестов в `tests/unit/traffic-light.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
