import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import App from "@/src/components/App";
import HeaderProvider from "@/src/contexts/Header/HeaderProvider";
import ThemeProvider from "@/src/contexts/Theme/ThemeProvider";
import { getTheme } from "@/src/utils/AsyncStorage/Theme";
import { store } from "@/src/store/store";
import { Theme } from "@/src/types/Contexts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [initialTheme, setInitialTheme] = useState<Theme>("dark");
  const colorScheme = useColorScheme();
  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme | undefined | null;
    setInitialTheme(storedTheme ?? colorScheme ?? "dark");
  };

  useEffect(() => {
    (async () => void setStoredTheme())();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider storedTheme={initialTheme}>
        <Provider store={store}>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
