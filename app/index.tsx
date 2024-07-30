import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { theme, toggleTheme } = useThemeContext();
  const styles = indexStyles(theme);

  return (
    <View style={styles.container}>
      <Text>{theme}</Text>
      <Button title="change theme" onPress={toggleTheme} />
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
