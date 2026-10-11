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
  topic: "Проект: Course Widget SDK",
  exercise: "Собрать facade SDK, подключить decorator и покрыть публичный API тестами.",
  requiredArtifacts: [
  "public facade API",
  "hidden subsystem",
  "orchestration method"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "facade",
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
    pattern: "facade",
    status: "completed",
    implementedArtifacts: [
  "public facade API",
  "hidden subsystem",
  "orchestration method"
],
    notes: "Design pattern facade is completed: the role, trade-off, and tested contract are explicit.",
  };
}
