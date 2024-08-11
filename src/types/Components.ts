import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Routine, WeightsAndRepetitions } from "./Routines";

export interface ThemedButtonProps {
  children: ReactNode;
  isSecondary?: boolean;
  externalButtonStyles?: ViewStyle;
  externalTextStyles?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export interface CurrentThemedButtonProps {
  routineName: string;
  onPress?: () => void;
}

export interface RoutinesListProps {
  selectedRoutines: Routine;
  isCurrent?: boolean;
}

export interface RoutinesItemListProps {
  routineName: string;
  madeOn: string;
  id: string;
  isCurrent?: boolean;
}

export interface RepetitionsButtonProps {
  selectedItem: number | string;
  isUnique?: boolean;
  isOpened?: boolean;
}

export interface EditExerciseModalProps {
  closeModal: () => void;
  exerciseData: WeightsAndRepetitions;
  isCurrent: boolean;
  selectedSerie: number;
  exerciseName: string;
}

export interface CreateExerciseModalProps {
  closeModal: () => void;
}

export interface AcceptButtonProps {
  isDisabled: boolean;
  onAccept: () => void;
  children?: ReactNode | string;
}

export interface CancelButtonProps {
  onCancel: () => void;
  children?: ReactNode | string;
}

// export interface FirstStepProps {
//   data: RoutineDay[];
//   name: string;
//   handleName: (val: string) => void;
//   handleDays: (val: number) => void;
//   hasWarmUpRoutine: boolean;
//   toggleWarmUpRoutine: () => void;
// } // UNUSED...

// export interface SecondStepProps {
//   data: RoutineDay[];
// } // UNUSED...
