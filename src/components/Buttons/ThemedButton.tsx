import { forwardRef } from "react";
import { Text, StyleSheet } from "react-native";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { ThemedButtonProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { BaseButton } from "react-native-gesture-handler";

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
    const { theme } = useSettingsContext();
    const styles = themedButtonStyles(isSecondary, theme, disabled);

    return (
      <BaseButton
        enabled={!disabled}
        style={[styles.buttonContainer, externalButtonStyles]}
        onPress={onPress}
      >
        <Text style={[styles.text, externalTextStyles]}>{children}</Text>
      </BaseButton>
    );
  }
);

export default ThemedButton;

const themedButtonStyles = (
  isSecondary: boolean,
  theme: Theme,
  isDisabled = false
) =>
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
        : (theme === "light" && isSecondary) ||
            (theme === "dark" && !isSecondary)
          ? Colors[theme].background
          : Colors[theme].text,
    },
  });
