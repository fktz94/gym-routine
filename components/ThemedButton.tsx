import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { ThemedButtonProps } from "@/types/Components";
import { Text, Pressable, StyleSheet } from "react-native";

const ThemedButton = ({ children, onPress }: ThemedButtonProps) => {
  const { theme } = useThemeContext();
  const styles = themedButtonStyles(theme);
  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default ThemedButton;

const themedButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonContainer: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      backgroundColor: Colors[theme].primary,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: `${Colors[theme].secondary}99`,
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
      color: Colors[theme].text,
    },
  });
