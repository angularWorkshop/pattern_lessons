# Topic 2 · Exercise 2.2 — Factory Method для парсеров с runtime-регистрацией · Solution

`DocumentLoader` сейчас содержит switch по mime-формату. Парсеров три (CSV, JSON, XML),
все работают. Тесты требуют четвёртый — YAML — но не как ещё одну hardcoded ветку.
Цель упражнения — построить фабрику, в которую новый формат можно «подключить»
снаружи, без правки самой фабрики или DocumentLoader.

## Что нужно сделать

1. **Реализовать `ParserFactory`** в `src/parser-factory.ts`:
   - внутри — `Map<ParserFormat, () =&gt; Parser>` с дефолтной регистрацией `csv`, `json`, `xml`
   - метод `create(format)` возвращает свежий парсер из `Map`, на отсутствующий формат — `throw` с упоминанием формата в сообщении
   - метод `register(format, factory)` добавляет/перезаписывает запись в реестре
   - обе сигнатуры строго типизированы под `ParserFormat`

2. **Создать `YamlParser`** в `src/yaml-parser.ts` — реализует интерфейс `Parser`,
   формат `'yaml'`. Минимальная реализация: разбирает строки вида `key: value`
   в простой объект `Record<string, string>`. Непарсимые строки идут в `warnings`.

3. **Перевести `DocumentLoader` на фабрику.** Конструктор принимает
   `factory: ParserFactory = new ParserFactory()`. `load(format, text)` —
   делегирует в `this.factory.create(format).parse(text)`. Никакого switch.

4. Не забыть пробросить экспорт `YamlParser` через `src/index.ts`.

## Контракт после рефакторинга

```ts
// document-loader.ts
export class DocumentLoader {
  private readonly factory: ParserFactory;

  public constructor(factory: ParserFactory = new ParserFactory()) {
    this.factory = factory;
  }

  public load(format: ParserFormat, text: string): ParserResult {
    return this.factory.create(format).parse(text);
  }
}
```

И регистрация YAML живёт в тестовом коде:

```ts
const factory = new ParserFactory();
factory.register('yaml', () => new YamlParser());
const loader = new DocumentLoader(factory);
loader.load('yaml', 'name: Max');
```

## Критерии сдачи

- В `DocumentLoader` нет switch/if по формату
- Дефолтный `ParserFactory` знает про csv/json/xml сразу — это всё ещё Factory Method, не голый `Map`
- YamlParser существует, но не зарегистрирован по умолчанию — его регистрирует внешний код
- Все тесты в `tests/unit/factory.test.ts` зелёные
- Все тесты в `tests/unit/document-loader.test.ts` зелёные (включая yaml-кейс)
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` проходит без ошибок
