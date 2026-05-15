# Topic 22 · Exercise 22.1 — Template Method: классовый процессор документов

Скелет процесса (parse → validate → transform → save) фиксируется в абстрактном классе. Конкретные шаги — в наследниках. Опциональный hook `beforeSave` — пустой по умолчанию, переопределяется по желанию.

## Что нужно сделать

В `src/document-processor.ts`:

**PdfProcessor** (переопределяет `beforeSave`):
- `parse(raw)` → `"[PDF] " + raw`
- `validate(parsed)` → `parsed.length > 0`
- `transform(parsed)` → `parsed.toUpperCase()`
- `save(transformed)` → `this.savedPayload = transformed`
- `beforeSave(transformed)` → `this.audit = true; return true;`

**HtmlProcessor** (НЕ переопределяет `beforeSave` — использует дефолт):
- `parse(raw)` → `"[HTML] " + raw`
- `validate(parsed)` → `!parsed.includes('<script>')`
- `transform(parsed)` → `parsed.replace(/<[^>]+>/g, '')`
- `save(transformed)` → `this.savedPayload = transformed`

## Главное

Базовый `process()` уже реализован и не меняется. Это и есть «template method»: скелет зафиксирован, точки расширения — отдельные методы.

## Критерии сдачи

- 8 тестов в `tests/unit/document-processor.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
