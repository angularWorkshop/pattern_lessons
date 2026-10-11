import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Разделить checkout-функцию на отдельные ответственности и сохранить прежний результат тестов.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Single Responsibility и Open/Closed без фанатизма");
    expect(exerciseContract.exercise).toBe("Разделить checkout-функцию на отдельные ответственности и сохранить прежний результат тестов.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem context","pattern role","tested contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Single Responsibility и Open/Closed без фанатизма",
      exercise: "Разделить checkout-функцию на отдельные ответственности и сохранить прежний результат тестов.",
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
