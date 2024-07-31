import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type DefaultStyle = "primary" | "secondary";

export interface ThemedButtonProps {
  children: ReactNode;
  defaultStyle?: DefaultStyle;
  externalStyles?: ViewStyle;
  onPress: () => void;
}
