import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Убрать explosion классов exporter-ов через Bridge и покрыть комбинации тестами.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Bridge: разделить абстракцию и реализацию");
    expect(exerciseContract.exercise).toBe("Убрать explosion классов exporter-ов через Bridge и покрыть комбинации тестами.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["abstraction layer","implementation interface","independent variation"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Bridge: разделить абстракцию и реализацию",
      exercise: "Убрать explosion классов exporter-ов через Bridge и покрыть комбинации тестами.",
      pattern: "bridge",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["abstraction layer","implementation interface","independent variation"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("bridge");
  });
});
