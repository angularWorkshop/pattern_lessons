import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Разобрать модуль с тремя похожими ветками и описать, какой smell повторяется: дублирование условий, смешение ролей или жёсткая зависимость.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Паттерн как повторяемое решение, а не магическое слово");
    expect(exerciseContract.exercise).toBe("Разобрать модуль с тремя похожими ветками и описать, какой smell повторяется: дублирование условий, смешение ролей или жёсткая зависимость.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem context","pattern role","tested contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Паттерн как повторяемое решение, а не магическое слово",
      exercise: "Разобрать модуль с тремя похожими ветками и описать, какой smell повторяется: дублирование условий, смешение ролей или жёсткая зависимость.",
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
