import { AddExercisePayloadType } from "./Reducers";
import { RoutineStructure } from "./Routines";

export interface NewRoutineContextProps {
  handleName: (val: string) => void;
  handleStep: ({ direction }: { direction: "up" | "down" }) => void;
  step: number;
  handleDays: (val: number) => void;
  hasWarmUpRoutine: boolean;
  toggleWarmUpRoutine: () => void;
  newRoutineState: RoutineStructure;
  handleAddOneExercise: ({ dayIndex, exerciseData }: AddExercisePayloadType) => void;
}
