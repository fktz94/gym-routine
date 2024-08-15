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
  dayIndex: number;
}

export interface AcceptButtonProps {
  isDisabled?: boolean;
  onAccept: () => void;
  children?: ReactNode | string;
}

export interface CancelButtonProps {
  onCancel: () => void;
  children?: ReactNode | string;
}

type CustomSelectDataProps = number | { rep: string | number; i: number };

export interface CustomSelectDropdownProps {
  data: CustomSelectDataProps[];
  defaultValue: CustomSelectDataProps;
  onSelect: (val: number, i: number) => void;
  isExerciseItem?: boolean;
  current?: number;
  btnStyle?: ViewStyle;
  btnTextStyle?: TextStyle;
  btnArrowStyle?: TextStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  menuStyle?: ViewStyle;
}

export interface ExerciseItemProps {
  name: string;
  sets: string | number;
  exerciseRepetitions: string;
  style?: ViewStyle;
  exerciseIndex?: number;
  dayIndex?: number;
}

export interface QuitCreatingNewExerciseModalProps {
  accept: () => void;
  cancel: () => void;
}
