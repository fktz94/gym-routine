import App from "@/components/App";
import ThemeProvider from "@/contexts/Theme/ThemeProvider";
import { getTheme } from "@/utils/AsyncStorage/Theme";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialTheme, setInitialTheme] = useState<Theme | null>(null);

  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme;
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
