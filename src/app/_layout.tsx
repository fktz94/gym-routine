import ThemeProvider from "@/src/contexts/Theme/ThemeProvider";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { getTheme } from "@/src/utils/AsyncStorage/Theme";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";
import App from "@/src/components/App";
import data from "@/data.json";
import { storeRoutines } from "../utils/AsyncStorage/Routines";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialTheme, setInitialTheme] = useState<Theme>("light");
  const colorScheme = useColorScheme();

  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme | undefined | null;
    setInitialTheme(storedTheme ?? colorScheme ?? "light");
  };

  const setRoutines = async () => void (await storeRoutines(data)); // Provisory until I create a routine from scratch. Now it's still made of a hardcoded json.

  useEffect(() => {
    (async () => {
      setStoredTheme();
      setRoutines(); // Provisory...
    })();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider storedTheme={initialTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}
