import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SplashScreen, Stack } from "expo-router";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../hooks/reactReduxHook";
import { getAllRoutines } from "../store/Routines/RoutinesAsyncThunk";
import { ResponseStatus } from "../types/Store";
import { setIsInitialLoadToFalse } from "../store/Routines/RoutinesSlice";
import { useEffect } from "react";

export default function App() {
  const { theme } = useThemeContext();
  const styles = appStyles(theme);
  const { isGettingAllRoutines, getAllRoutinesStatus, isInitialLoad } = useAppSelector(
    (state) => state.routines
  );

  const statusBarStyle = theme === "light" ? "dark" : "light";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={statusBarStyle} />
      <Header />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="routine/[id]" />
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
