import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
} from "./Reducers";
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
  handleDeleteOneExercise: ({ dayIndex, exerciseIndex }: DeleteExercisePayloadType) => void;
  handleEditOneExercise: ({ dayIndex, exerciseData, prevName }: EditExercisePayloadType) => void;
}

export interface EditRoutineContextProps {
  selectedRoutine: RoutineStructure;
  originalRoutine: RoutineStructure | undefined;
  selectedDay: string;
  handleAddOneExercise: ({ dayIndex, exerciseData }: AddExercisePayloadType) => void;
  handleEditOneExercise: ({ dayIndex, exerciseData, prevName }: EditExercisePayloadType) => void;
  handleDeleteOneExercise: ({ dayIndex, exerciseIndex }: DeleteExercisePayloadType) => void;
  handleSetToCurrent: () => void;
  toCurrent: boolean;
  isCurrent: boolean;
  handleName: (val: string) => void;
}

export type Theme = "light" | "dark";

export type ThemeValueType = {
  theme: Theme;
  toggleTheme: () => void;
} | null;

export type HeaderContextType = {
  showBackArrowButton: boolean;
  toggleShowBackArrowButton: (val: boolean) => void;
} | null;
