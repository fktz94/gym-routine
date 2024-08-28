import ThemeProvider from "@/src/contexts/Theme/ThemeProvider";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { getTheme } from "@/src/utils/AsyncStorage/Theme";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/src/store/store";
import App from "@/src/components/App";
import HeaderProvider from "../contexts/Header/HeaderProvider";
import { Theme } from "../types/Contexts";

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

  useEffect(() => {
    (async () => void setStoredTheme())();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider storedTheme={initialTheme}>
      <HeaderProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HeaderProvider>
    </ThemeProvider>
  );
}
