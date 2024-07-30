import { getTheme } from "@/utils/AsyncStorage/Theme";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function useInitializeApp() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialTheme, setInitialTheme] = useState<Theme>("light");

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

  return { loaded, initialTheme };
}
