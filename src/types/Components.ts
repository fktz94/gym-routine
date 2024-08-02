import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

export type DefaultStyle = "primary" | "secondary";

export interface ThemedButtonProps {
  children: ReactNode;
  defaultStyle?: DefaultStyle;
  externalButtonStyles?: ViewStyle;
  externalTextStyles?: TextStyle;
  onPress?: () => void;
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
  id: number;
  isCurrent?: boolean;
}
