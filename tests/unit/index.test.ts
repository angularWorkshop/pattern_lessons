import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Переименовать части модуля так, чтобы роли кода стали очевидными без комментариев, и закрепить результат unit-тестами.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Паттерн как повторяемое решение, а не магическое слово");
    expect(exerciseContract.exercise).toBe("Переименовать части модуля так, чтобы роли кода стали очевидными без комментариев, и закрепить результат unit-тестами.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem context","pattern role","tested contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Паттерн как повторяемое решение, а не магическое слово",
      exercise: "Переименовать части модуля так, чтобы роли кода стали очевидными без комментариев, и закрепить результат unit-тестами.",
      pattern: "pattern",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["problem context","pattern role","tested contract"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("pattern");
  });
});
