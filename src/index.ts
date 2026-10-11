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
  topic: "Template Method: общий алгоритм с изменяемыми шагами",
  exercise: "Реализовать import pipeline через Template Method.",
  requiredArtifacts: [
  "algorithm skeleton",
  "custom step",
  "invariant order"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "template method",
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
    pattern: "template method",
    status: "completed",
    implementedArtifacts: [
  "algorithm skeleton",
  "custom step",
  "invariant order"
],
    notes: "Design pattern template method is completed: the role, trade-off, and tested contract are explicit.",
  };
}
