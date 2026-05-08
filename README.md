# Topic 11 · Exercise 11.1 — Facade: AudioPlayer над Web Audio API

Web Audio API из коробки — пять разных классов с непростыми зависимостями. `AudioPlayer` прячет всё это за четыре простых метода.

## Что нужно сделать

В `src/audio-player.ts` реализуй:

- `load(url)` — `await context.decodeAudioData(url)`, сохранить в `currentBuffer`
- `play()`:
  - если `context.state === 'suspended'` → `await context.resume()`
  - если `currentBuffer` пуст — кинуть с понятным сообщением
  - создать source через `context.createBufferSource()`, выставить `source.buffer = currentBuffer`
  - `source.connect(this.gain)` и `source.start()`
  - сохранить в `currentSource`, состояние = `'playing'`
- `pause()` — `await context.suspend()`, состояние = `'paused'`
- `setVolume(v)` — `this.gain.gain = clamp(v, 0, 1)`

## Критерии сдачи

- 8 тестов в `tests/unit/audio-player.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный

## Главное

Снаружи AudioPlayer — это только load/play/pause/setVolume + два геттера. Внутри — четыре класса Web Audio API, и весь оркестр между ними прячется. Это и есть Facade.
