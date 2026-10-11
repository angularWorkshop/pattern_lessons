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
  topic: "State: поведение зависит от состояния объекта",
  exercise: "Исправить UI-state, где loading/error/success могут быть одновременно true.",
  requiredArtifacts: [
  "finite statuses",
  "allowed transition",
  "illegal action guard"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "state",
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
    pattern: "state",
    status: "completed",
    implementedArtifacts: [
  "finite statuses",
  "allowed transition",
  "illegal action guard"
],
    notes: "Design pattern state is completed: the role, trade-off, and tested contract are explicit.",
  };
}
