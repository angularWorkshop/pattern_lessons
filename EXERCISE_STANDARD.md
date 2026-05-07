# Design Patterns Exercise Standard

This repository is the baseline for EduTec Design Patterns exercises.

## Branch naming

For every exercise create 2 branches from `main`:

- `lesson-topic-XX-exercise-YY-slug`
- `answer-topic-XX-exercise-YY-slug`

Examples:

- `lesson-topic-01-exercise-01-first-types`
- `answer-topic-01-exercise-01-first-types`

Do not use `/` in branch names.

## What belongs in `lesson` branch

- working project setup
- clear task description in `README.md`
- starter implementation with `TODO` markers
- tests already written
- part of the tests failing

The student should only implement the missing logic. Infrastructure, config, and unrelated helpers must already work.

## What belongs in `answer` branch

- all `TODO`s resolved
- all tests green
- final implementation still simple enough for learning

## Required quality bar

- no `any` unless the exercise explicitly teaches `any`
- strict typing must stay enabled
- all runtime tests pass
- all type tests pass
- `npm run build` succeeds
- `npm run pack:check` succeeds for exercises that touch package output

## Standard structure

```text
README.md
src/
  index.ts
tests/
  unit/
    index.test.ts
  types/
    index.test.ts
```

## Test split

Use `tests/unit` for runtime behavior:

- function outputs
- error cases
- edge cases

Use `tests/types` for compile-time guarantees:

- inference
- branded / literal / mapped / conditional types
- invalid API surface prevented by TypeScript

## Starter code rules

- `TODO:` comments must describe exactly what the student needs to finish
- keep starter code small
- avoid hidden setup work in the task
- avoid exercises that depend on interactive CLI input
- prefer deterministic pure functions, small classes, config files, schemas, or package exports

## Task design rules

Good exercises:

- can be solved in one file or a small cluster of files
- have a clear success condition
- can be validated by tests
- teach one main idea and one secondary edge case

Avoid as default:

- real publishing to npm
- mandatory git hooks as acceptance criteria
- fragile performance measurements
- tasks that depend on manual terminal observation only

For those topics, simulate locally and verify through files, config, or testable outcomes instead.

