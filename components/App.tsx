import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import { Stack } from "expo-router";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

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
