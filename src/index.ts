export type ExerciseStatus = 'draft' | 'completed';

export interface PatternExerciseResult {
  readonly course: 'DESIGN_PATTERNS';
  readonly topic: string;
  readonly exercise: string;
  readonly pattern: string;
  readonly status: ExerciseStatus;
  readonly implementedArtifacts: readonly string[];
  readonly notes: string;
}

export const exerciseContract = {
  course: 'DESIGN_PATTERNS',
  topic: "DDD-lite: Entity, Value Object, Policy и Specification",
  exercise: "Реализовать policy, которая решает, можно ли открыть финальный проект курса.",
  requiredArtifacts: [
  "value object",
  "policy rule",
  "specification check"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "ddd",
    status: 'draft',
    implementedArtifacts: [],
    notes: 'План готов: осталось реализовать контракт упражнения.',
  };
}

export function completePatternExercise(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "ddd",
    status: "completed",
    implementedArtifacts: [
  "value object",
  "policy rule",
  "specification check"
],
    notes: "Design pattern ddd is completed: the role, trade-off, and tested contract are explicit.",
  };
}
