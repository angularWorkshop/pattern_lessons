import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Перенести бизнес-правило completion из component в application use-case.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Clean Architecture слои без религиозности");
    expect(exerciseContract.exercise).toBe("Перенести бизнес-правило completion из component в application use-case.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["domain layer","application use case","dependency rule"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Clean Architecture слои без религиозности",
      exercise: "Перенести бизнес-правило completion из component в application use-case.",
      pattern: "clean",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["domain layer","application use case","dependency rule"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("clean");
  });
});
