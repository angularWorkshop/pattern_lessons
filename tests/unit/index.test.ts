import { describe, expect, it } from 'vitest';
import { completePatternExercise, createPatternExercisePlan, exerciseContract } from '../../src/index';

describe("Реализовать access proxy для premium report generator.", () => {
  it('keeps the design pattern exercise contract explicit', () => {
    expect(exerciseContract.course).toBe('DESIGN_PATTERNS');
    expect(exerciseContract.topic).toBe("Proxy: контроль доступа, lazy loading и защита дорогих операций");
    expect(exerciseContract.exercise).toBe("Реализовать access proxy для premium report generator.");
    expect([...exerciseContract.requiredArtifacts]).toEqual(["access boundary","lazy call","protected target"]);
  });

  it('starts from a draft plan before implementation', () => {
    expect(createPatternExercisePlan()).toEqual({
      course: 'DESIGN_PATTERNS',
      topic: "Proxy: контроль доступа, lazy loading и защита дорогих операций",
      exercise: "Реализовать access proxy для premium report generator.",
      pattern: "proxy",
      status: 'draft',
      implementedArtifacts: [],
      notes: 'План готов: осталось реализовать контракт упражнения.',
    });
  });

  it('returns a completed implementation summary', () => {
    const result = completePatternExercise();

    expect(result.status).toBe('completed');
    expect(result.implementedArtifacts).toEqual(["access boundary","lazy call","protected target"]);
    expect(result.notes.toLowerCase()).toContain('pattern');
    expect(result.notes.toLowerCase()).toContain("proxy");
  });
});
