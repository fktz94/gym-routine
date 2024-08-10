import { Colors } from "../constants/Colors";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { AcceptButtonProps, CancelButtonProps, ThemedButtonProps } from "../types/Components";
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
      disabled = false,
    }: ThemedButtonProps,
    ref
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

export const AcceptButton = ({ onAccept, isDisabled, children }: AcceptButtonProps) => {
  const { theme } = useThemeContext();
  const styles = themedButtonStyles(false, theme, isDisabled);
  return (
    <ThemedButton
      externalButtonStyles={styles.acceptView}
      externalTextStyles={styles.acceptText}
      onPress={onAccept}
      disabled={isDisabled}
    >
      {children || "Accept"}
    </ThemedButton>
  );
};

export const CancelButton = ({ onCancel, children }: CancelButtonProps) => {
  const { theme } = useThemeContext();
  const styles = themedButtonStyles(false, theme);
  return (
    <ThemedButton
      externalButtonStyles={styles.cancelView}
      externalTextStyles={styles.cancelText}
      onPress={onCancel}
    >
      {children || "Cancel"}
    </ThemedButton>
  );
};

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
      color: isDisabled
        ? Colors.light.secondary
        : (theme === "light" && isSecondary) || (theme === "dark" && !isSecondary)
        ? Colors[theme].background
        : Colors[theme].text,
    },
    acceptView: {
      backgroundColor: isDisabled ? Colors.light.text : Colors.acceptBackground,
    },
    acceptText: {
      color: isDisabled ? Colors.light.secondary : Colors.dark.text,
      fontWeight: "bold",
      letterSpacing: 1,
    },
    cancelView: { backgroundColor: Colors.cancelBackground },
    cancelText: { color: Colors.dark.text, fontWeight: "bold", letterSpacing: 1 },
  });
