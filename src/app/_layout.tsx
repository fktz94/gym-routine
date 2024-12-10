import { useEffect } from "react";
import { Provider } from "react-redux";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import App from "@/src/components/App";
import HeaderProvider from "@/src/contexts/Header/HeaderProvider";
import SettingsProvider from "@/src/contexts/Settings/SettingsProvider";
import { store } from "@/src/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/src/i18n/index";
import useSettings from "../hooks/useSettings";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const {
    languageLoaded,
    themeLoaded,
    changeLanguage,
    language,
    theme,
    toggleTheme,
  } = useSettings();

  const appIsReady = loaded && languageLoaded && themeLoaded;

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SettingsProvider
        changeLanguage={changeLanguage}
        language={language}
        theme={theme}
        toggleTheme={toggleTheme}
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
