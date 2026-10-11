import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Создать visitor для подсчёта статистики content tree урока.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Visitor: новые операции над стабильной структурой");
    expect(exerciseContract.exercise).toBe("Создать visitor для подсчёта статистики content tree урока.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["stable node shape","visitor operation","exhaustive traversal"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Visitor: новые операции над стабильной структурой",
      exercise: "Создать visitor для подсчёта статистики content tree урока.",
      pattern: "visitor",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["stable node shape","visitor operation","exhaustive traversal"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("visitor");
  });
});
