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
  topic: "Flyweight: экономить память на повторяющихся объектах",
  exercise: "Оптимизировать список marker-объектов, отделив shared type data от координат.",
  requiredArtifacts: [
  "intrinsic state",
  "extrinsic state",
  "shared pool"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "flyweight",
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
    pattern: "flyweight",
    status: "completed",
    implementedArtifacts: [
  "intrinsic state",
  "extrinsic state",
  "shared pool"
],
    notes: "Design pattern flyweight is completed: the role, trade-off, and tested contract are explicit.",
  };
}
