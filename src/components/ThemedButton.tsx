import { Colors } from "../constants/Colors";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { ThemedButtonProps } from "../types/Components";
import { forwardRef } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const ThemedButton = forwardRef(
  (
    {
      children,
      isSecondary = false,
      externalButtonStyles,
      externalTextStyles,
      onPress,
    }: ThemedButtonProps,
    ref
  ) => {
    const { theme } = useThemeContext();
    const styles = themedButtonStyles(isSecondary, theme);

    return (
      <TouchableOpacity style={[styles.buttonContainer, externalButtonStyles]} onPress={onPress}>
        <Text style={[styles.text, externalTextStyles]}>{children}</Text>
      </TouchableOpacity>
    );
  }
);

export default ThemedButton;

const themedButtonStyles = (isSecondary: boolean, theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: isSecondary ? Colors[theme].primary : Colors[theme].secondary,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: `${isSecondary ? Colors[theme].secondary : Colors[theme].primary}99`,
      shadowColor: Colors[theme].text,

      // Shadow for Android
      elevation: 1,

      // Shadow for iOS
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    text: {
      color:
        (theme === "light" && isSecondary) || (theme === "dark" && !isSecondary)
          ? Colors[theme].background
          : Colors[theme].text,
    },
  });
