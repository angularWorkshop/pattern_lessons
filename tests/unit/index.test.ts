import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Заменить прямой singleton-import на registry, передаваемый через composition root.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Singleton, Registry и общий ресурс без глобального хаоса");
    expect(exerciseContract.exercise).toBe("Заменить прямой singleton-import на registry, передаваемый через composition root.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["single resource boundary","reset path","test isolation"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Singleton, Registry и общий ресурс без глобального хаоса",
      exercise: "Заменить прямой singleton-import на registry, передаваемый через composition root.",
      pattern: "singleton",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["single resource boundary","reset path","test isolation"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("singleton");
  });
});
