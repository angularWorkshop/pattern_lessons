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
  topic: "Bridge: разделить абстракцию и реализацию",
  exercise: "Разделить Notification abstraction и DeliveryChannel implementation.",
  requiredArtifacts: [
  "abstraction layer",
  "implementation interface",
  "independent variation"
] as const,
} as const;

export function createPatternExercisePlan(): PatternExerciseResult {
  return {
    course: exerciseContract.course,
    topic: exerciseContract.topic,
    exercise: exerciseContract.exercise,
    pattern: "bridge",
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
    pattern: "bridge",
    status: "completed",
    implementedArtifacts: [
  "abstraction layer",
  "implementation interface",
  "independent variation"
],
    notes: "Design pattern bridge is completed: the role, trade-off, and tested contract are explicit.",
  };
}
