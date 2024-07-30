import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  return (
    <View style={styles.container}>
      <Text>{theme}</Text>
      <ThemedButton onPress={() => {}}>New routine</ThemedButton>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
    },
  });
