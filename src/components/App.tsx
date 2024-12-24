import React, { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Theme } from "../types/Contexts";
import Header from "@/src/components/Header";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Path } from "../types/Utils";

export default function App() {
  const { theme, isChangingLanguage } = useSettingsContext();
  const styles = appStyles(theme);
  const path = usePathname();

  const statusBarStyle = theme === "light" ? "dark" : "light";

  const showHeader = path !== Path.SELECTLANGUAGE;

  return (
    <>
      {isChangingLanguage && <View style={styles.blockingScreen} />}
      <SafeAreaView style={styles.container}>
        <StatusBar style={statusBarStyle} />
        {showHeader && <Header />}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="select-language" />
          <Stack.Screen name="new-routine" />
          <Stack.Screen name="routine/[id]" />
          <Stack.Screen name="edit-routine/[id]" />
          <Stack.Screen name="congratulations" />
          <Stack.Screen name="settings" />
        </Stack>
      </SafeAreaView>
    </>
  );
}

const appStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    blockingScreen: {
      height: "100%",
      width: "100%",
      position: "absolute",
      zIndex: 999,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
  });
