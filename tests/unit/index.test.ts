import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать PaymentIntegrationFactory, которая создаёт provider, validator и formatter одной платёжной системы.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Abstract Factory: семейства связанных объектов");
    expect(exerciseContract.exercise).toBe("Реализовать PaymentIntegrationFactory, которая создаёт provider, validator и formatter одной платёжной системы.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["creation function","selection rule","stable caller API"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Abstract Factory: семейства связанных объектов",
      exercise: "Реализовать PaymentIntegrationFactory, которая создаёт provider, validator и formatter одной платёжной системы.",
      pattern: "factory",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["creation function","selection rule","stable caller API"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("factory");
  });
});
