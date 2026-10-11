import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать restore draft-формы после отмены изменений.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Memento: снимок состояния для undo и восстановления");
    expect(exerciseContract.exercise).toBe("Реализовать restore draft-формы после отмены изменений.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["snapshot object","restore method","history stack"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Memento: снимок состояния для undo и восстановления",
      exercise: "Реализовать restore draft-формы после отмены изменений.",
      pattern: "memento",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["snapshot object","restore method","history stack"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("memento");
  });
});
