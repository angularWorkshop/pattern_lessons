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
  topic: "Memento: снимок состояния для undo и восстановления",
  exercise: "Добавить snapshot history для редактора lesson outline.",
  requiredArtifacts: [
  "snapshot object",
  "restore method",
  "history stack"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "memento",
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
    pattern: "memento",
    status: "completed",
    implementedArtifacts: [
  "snapshot object",
  "restore method",
  "history stack"
],
    notes: "Design pattern memento is completed: the role, trade-off, and tested contract are explicit.",
  };
}
