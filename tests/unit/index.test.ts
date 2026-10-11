import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Исправить утечку listener-ов после удаления виджета.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Observer и Pub/Sub: событие без жёсткой связи");
    expect(exerciseContract.exercise).toBe("Исправить утечку listener-ов после удаления виджета.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["subscribe API","emit flow","unsubscribe cleanup"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Observer и Pub/Sub: событие без жёсткой связи",
      exercise: "Исправить утечку listener-ов после удаления виджета.",
      pattern: "observer",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["subscribe API","emit flow","unsubscribe cleanup"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("observer");
  });
});
