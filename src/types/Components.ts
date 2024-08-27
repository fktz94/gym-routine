import { PropsWithChildren, ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Exercise, Routine, WeightsAndRepetitions } from "./Routines";

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
  exerciseToEdit?: Exercise;
  handleOnAccept: ({
    dayIndex,
    exerciseData,
    prevName,
  }: {
    dayIndex: number;
    exerciseData: Exercise;
    prevName?: string;
  }) => void;
}

export interface EditCreatedExerciseModalProps extends CreateExerciseModalProps {
  exerciseName: string;
}

export interface AcceptButtonProps {
  isDisabled?: boolean;
  onAccept: () => void;
  isIcon?: boolean;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
}

export interface CancelButtonProps {
  onCancel: () => void;
  isIcon?: boolean;
  text?: string;
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
  dayIndex: number;
}

export interface QuitCreatingNewExerciseModalProps {
  accept: () => void;
  cancel: () => void;
}

export interface ConfirmCreateNewExerciseModalProps {
  closeModal: () => void;
}
export interface ConfirmDeleteRoutineModalProps {
  closeModal: () => void;
  id: string;
  name: string;
}

export interface ThemedModalProps extends PropsWithChildren {
  isLoading?: boolean;
  closeModal: () => void;
  handleAccept: () => void;
  isAcceptBtnDisabled?: boolean;
  buttonsAreIcons?: boolean;
}

export interface RepetitionInputProps {
  index: number;
  el: WeightsAndRepetitions;
  variations: WeightsAndRepetitions[];
  isCustomRepetitions: boolean;
  handleRepetitionValues: (val: string, i: number) => void;
  hasWeeksVariations: boolean;
}
