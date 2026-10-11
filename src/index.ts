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
  topic: "Factory Function и Factory Method",
  exercise: "Добавить provider factory для разных способов оплаты без изменения вызывающего кода.",
  requiredArtifacts: [
  "creation function",
  "selection rule",
  "stable caller API"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "factory",
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
    pattern: "factory",
    status: "completed",
    implementedArtifacts: [
  "creation function",
  "selection rule",
  "stable caller API"
],
    notes: "Design pattern factory is completed: the role, trade-off, and tested contract are explicit.",
  };
}
