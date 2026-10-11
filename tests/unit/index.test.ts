import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Добавить table-driven tests для всех переходов reducer.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Reducer: предсказуемое изменение состояния");
    expect(exerciseContract.exercise).toBe("Добавить table-driven tests для всех переходов reducer.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["action contract","pure reducer","table-driven cases"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Reducer: предсказуемое изменение состояния",
      exercise: "Добавить table-driven tests для всех переходов reducer.",
      pattern: "reducer",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["action contract","pure reducer","table-driven cases"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("reducer");
  });
});
