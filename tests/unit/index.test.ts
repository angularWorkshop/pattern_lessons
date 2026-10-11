import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Выделить seam для внешней зависимости и заменить прямой вызов на передаваемый dependency.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Safe refactoring: тесты, швы и маленькие шаги");
    expect(exerciseContract.exercise).toBe("Выделить seam для внешней зависимости и заменить прямой вызов на передаваемый dependency.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem context","pattern role","tested contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Safe refactoring: тесты, швы и маленькие шаги",
      exercise: "Выделить seam для внешней зависимости и заменить прямой вызов на передаваемый dependency.",
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
