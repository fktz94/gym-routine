import ThemeProvider from "@/contexts/Theme/ThemeProvider";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { getTheme } from "@/utils/AsyncStorage/Theme";
import { useColorScheme } from "react-native";
import App from "@/components/App";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialTheme, setInitialTheme] = useState<Theme>("light");

  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme | undefined | null;
    setInitialTheme(storedTheme ?? useColorScheme() ?? "light");
  };

  useEffect(() => {
    (async () => setStoredTheme())();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider storedTheme={initialTheme}>
      <App />
    </ThemeProvider>
  );
}
