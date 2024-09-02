import { PropsWithChildren, ReactNode } from "react";
import { Animated, PanResponderInstance, TextStyle, ViewProps, ViewStyle } from "react-native";
import { Exercise, Routine, RoutineDay, WeightsAndRepetitions } from "./Routines";
import {
  AddExercisePayloadType,
  DeleteExercisePayloadType,
  EditExercisePayloadType,
} from "./Reducers";

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

export interface RoutinesListItemProps {
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
  dayIndex?: number;
  exerciseToEdit?: Exercise;
  handleOnAccept: ({
    dayIndex,
    exerciseData,
    prevName,
  }: {
    dayIndex: number;
    exerciseData: Exercise;
    prevName: string;
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

export interface ExerciseListItemProps {
  dayIndex?: number;
  exerciseData: Exercise;
  exerciseIndex?: number;
  handleDeleteExercise: ({ dayIndex, exerciseIndex }: DeleteExercisePayloadType) => void;
  handleEditExercise: ({ dayIndex, exerciseData, prevName }: EditExercisePayloadType) => void;
  isLastElement: boolean;
  style?: ViewStyle;
}

export interface ExerciseListDayProps {
  dataToMap: RoutineDay;
  dayHasToBeShown?: boolean;
  dayIndex?: number;
  handleAddExercise: ({ dayIndex, exerciseData }: AddExercisePayloadType) => void;
  handleDeleteExercise: ({ dayIndex, exerciseIndex }: DeleteExercisePayloadType) => void;
  handleEditExercise: ({ dayIndex, exerciseData, prevName }: EditExercisePayloadType) => void;
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

export interface DeleteButtonProps {
  onDelete: () => void;
  isRoutine?: boolean;
  isCurrent?: boolean;
}

export interface DeleteAnimationProps extends PropsWithChildren, DeleteButtonProps {
  containerViewStyles?: ViewStyle;
  animatedViewStyles?: ViewStyle;
  panResponder: PanResponderInstance;
  translateX: Animated.Value;
}

export interface CheckboxContainerProps {
  isChecked: boolean;
  onPress: (val: boolean) => void;
  text: string;
}
