export interface ModifyOneExerciseProps {
  id: string;
  index: number;
  routines: Routine;
  selectedDay: number;
  exerciseName: string;
  newValue: string | number;
  makeItCurrent?: boolean;
}
