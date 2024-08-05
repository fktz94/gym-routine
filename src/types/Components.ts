import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

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
  data: WeightsAndRepetitions;
  isCurrent: boolean;
  index: number;
}

export interface AcceptButtonProps {
  isDisabled: boolean;
  onAccept: () => void;
}

export interface CancelButtonProps {
  onCancel: () => void;
}
