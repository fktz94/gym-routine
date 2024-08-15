import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { StatusBar } from "expo-status-bar";
import Header from "@/src/components/Header";

export default function App() {
  const { theme } = useThemeContext();
  const styles = appStyles(theme);

  const statusBarStyle = theme === "light" ? "dark" : "light";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={statusBarStyle} />
      <Header />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="new-routine" />
        <Stack.Screen name="routine/[id]" />
        <Stack.Screen name="edit-routine/[id]" />
      </Stack>
    </SafeAreaView>
  );
}

const appStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
  });
