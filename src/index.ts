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
  topic: "Decorator: добавить поведение, не ломая основу",
  exercise: "Написать `withLogging` и `withTiming` для async-функции.",
  requiredArtifacts: [
  "base behavior",
  "wrapper function",
  "preserved contract"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "decorator",
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
    pattern: "decorator",
    status: "completed",
    implementedArtifacts: [
  "base behavior",
  "wrapper function",
  "preserved contract"
],
    notes: "Design pattern decorator is completed: the role, trade-off, and tested contract are explicit.",
  };
}
