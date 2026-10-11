import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Написать contract-тесты для двух реализаций одного reader-интерфейса.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Liskov и Interface Segregation на простых API");
    expect(exerciseContract.exercise).toBe("Написать contract-тесты для двух реализаций одного reader-интерфейса.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["problem context","pattern role","tested contract"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Liskov и Interface Segregation на простых API",
      exercise: "Написать contract-тесты для двух реализаций одного reader-интерфейса.",
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
