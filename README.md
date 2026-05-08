# Topic 9 · Exercise 9.2 — Composite через discriminated union · Solution

То же дерево, но без классов: discriminated union + рекурсивные функции. В TypeScript это самый частый способ моделировать AST.

## Что нужно сделать

В `src/evaluate.ts`:
- exhaustive `switch (node.kind)` по всем трём вариантам
- `num` → `value`; `var` → лук из `env`, иначе ошибка с упоминанием name; `binop` → рекурсивно вычислить левую/правую части и применить операцию
- деление на ноль → ошибка `/division/i`
- в `default` поставить `const _exhaustive: never = node` и `throw` — TS ругнётся, если когда-нибудь добавишь четвёртый kind и забудешь обработать

В `src/pretty-print.ts`:
- `num` → строковая запись числа; `var` → имя; `binop` → `"(left op right)"` со скобками вокруг каждого binop

## Главное

В отличие от классической Composite, здесь нет методов на объектах. Логика живёт в функциях, узлы — pure data. Главный плюс — exhaustive switch и compile-time проверка полноты.

## Критерии сдачи

- 11 runtime-тестов в `tests/unit/ast.test.ts` зелёные
- Тип-контракты в `tests/types/index.test.ts` зелёные
- `npm run check` зелёный
