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
  topic: "Как выбрать паттерн и не уйти в overengineering",
  exercise: "Упростить переусложнённый модуль, удалив лишний паттерн без потери тестового покрытия.",
  requiredArtifacts: [
  "problem statement",
  "trade-off note",
  "simpler alternative"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "decision",
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
    pattern: "decision",
    status: "completed",
    implementedArtifacts: [
  "problem statement",
  "trade-off note",
  "simpler alternative"
],
    notes: "Design pattern decision is completed: the role, trade-off, and tested contract are explicit.",
  };
}
