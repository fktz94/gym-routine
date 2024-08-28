import { forwardRef } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ThemedButtonProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";

const ThemedButton = forwardRef(
  (
    {
      children,
      isSecondary = false,
      externalButtonStyles,
      externalTextStyles,
      onPress,
      disabled = false,
    }: ThemedButtonProps,
    _
  ) => {
    const { theme } = useThemeContext();
    const styles = themedButtonStyles(isSecondary, theme, disabled);

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.buttonContainer, externalButtonStyles]}
        onPress={onPress}
      >
        <Text style={[styles.text, externalTextStyles]}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

export default ThemedButton;

const themedButtonStyles = (isSecondary: boolean, theme: Theme, isDisabled = false) =>
  StyleSheet.create({
    buttonContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: isDisabled
        ? Colors.light.text
        : isSecondary
        ? Colors[theme].primary
        : Colors[theme].secondary,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: `${isSecondary ? Colors[theme].secondary : Colors[theme].primary}99`,
      shadowColor: Colors[theme].text,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    text: {
      color: isDisabled
        ? Colors.light.secondary
        : (theme === "light" && isSecondary) || (theme === "dark" && !isSecondary)
        ? Colors[theme].background
        : Colors[theme].text,
    },
  });
