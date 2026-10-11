import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Зафиксировать golden master для legacy formatter.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Golden Master и Strangler Fig для безопасного переписывания");
    expect(exerciseContract.exercise).toBe("Зафиксировать golden master для legacy formatter.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["golden master","routing seam","migration step"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Golden Master и Strangler Fig для безопасного переписывания",
      exercise: "Зафиксировать golden master для legacy formatter.",
      pattern: "migration",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["golden master","routing seam","migration step"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("migration");
  });
});
