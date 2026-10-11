import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать builder для настройки dashboard widgets.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Builder для сложной конфигурации");
    expect(exerciseContract.exercise).toBe("Реализовать builder для настройки dashboard widgets.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["step builder","valid config","final build method"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Builder для сложной конфигурации",
      exercise: "Реализовать builder для настройки dashboard widgets.",
      pattern: "builder",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["step builder","valid config","final build method"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("builder");
  });
});
