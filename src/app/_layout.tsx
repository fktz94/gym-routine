import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import App from "@/src/components/App";
import HeaderProvider from "@/src/contexts/Header/HeaderProvider";
import SettingsProvider from "@/src/contexts/Settings/SettingsProvider";
import { getTheme } from "@/src/utils/AsyncStorage/Theme";
import { store } from "@/src/store/store";
import { Theme } from "@/src/types/Contexts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getLanguage } from "../utils/AsyncStorage/Language";
import { useTranslation } from "react-i18next";
import "@/src/i18n/index";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [langLoaded, setLangLoaded] = useState(false);
  const { i18n } = useTranslation();

  const [initialTheme, setInitialTheme] = useState<Theme>("dark");
  const colorScheme = useColorScheme();
  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme | undefined | null;
    setInitialTheme(storedTheme ?? colorScheme ?? "dark");
  };

  const [initialLanguage, setInitialLanguage] = useState<string | undefined>(
    undefined
  );
  const setStoredLanguage = async () => {
    const language = await getLanguage();
    setLangLoaded(true);
    if (!language) return;
    setInitialLanguage(language);
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    (async () => void setStoredLanguage())();
    (async () => void setStoredTheme())();
  }, []);

  useEffect(() => {
    if (loaded && langLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, langLoaded]);

  if (!loaded && !langLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider
        storedTheme={initialTheme}
        storedLanguage={initialLanguage}
      >
        <Provider store={store}>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </Provider>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
