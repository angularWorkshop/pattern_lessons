import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Оптимизировать список marker-объектов, отделив shared type data от координат.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Flyweight: экономить память на повторяющихся объектах");
    expect(exerciseContract.exercise).toBe("Оптимизировать список marker-объектов, отделив shared type data от координат.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["intrinsic state","extrinsic state","shared pool"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Flyweight: экономить память на повторяющихся объектах",
      exercise: "Оптимизировать список marker-объектов, отделив shared type data от координат.",
      pattern: "flyweight",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["intrinsic state","extrinsic state","shared pool"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("flyweight");
  });
});
