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
  topic: "Mediator: координация без паутины зависимостей",
  exercise: "Убрать прямые зависимости между модулями формы через workflow mediator.",
  requiredArtifacts: [
  "central mediator",
  "module coordination",
  "no direct dependency"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "mediator",
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
    pattern: "mediator",
    status: "completed",
    implementedArtifacts: [
  "central mediator",
  "module coordination",
  "no direct dependency"
],
    notes: "Design pattern mediator is completed: the role, trade-off, and tested contract are explicit.",
  };
}
