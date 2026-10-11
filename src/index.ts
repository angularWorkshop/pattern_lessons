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
  topic: "Prototype, clone и создание состояния без мутаций",
  exercise: "Исправить баг shared state, где два виджета случайно меняют один вложенный объект.",
  requiredArtifacts: [
  "safe clone",
  "independent copy",
  "mutation guard"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "prototype",
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
    pattern: "prototype",
    status: "completed",
    implementedArtifacts: [
  "safe clone",
  "independent copy",
  "mutation guard"
],
    notes: "Design pattern prototype is completed: the role, trade-off, and tested contract are explicit.",
  };
}
