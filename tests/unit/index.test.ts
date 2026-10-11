import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать error handling chain для API-ответов.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Chain of Responsibility: цепочка обработчиков");
    expect(exerciseContract.exercise).toBe("Реализовать error handling chain для API-ответов.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["handler contract","next handler","fallback result"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Chain of Responsibility: цепочка обработчиков",
      exercise: "Реализовать error handling chain для API-ответов.",
      pattern: "chain",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["handler contract","next handler","fallback result"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("chain");
  });
});
