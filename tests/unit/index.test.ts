import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Собрать facade SDK, подключить decorator и покрыть публичный API тестами.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Проект: Course Widget SDK");
    expect(exerciseContract.exercise).toBe("Собрать facade SDK, подключить decorator и покрыть публичный API тестами.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["public facade API","hidden subsystem","orchestration method"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Проект: Course Widget SDK",
      exercise: "Собрать facade SDK, подключить decorator и покрыть публичный API тестами.",
      pattern: "facade",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["public facade API","hidden subsystem","orchestration method"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("facade");
  });
});
