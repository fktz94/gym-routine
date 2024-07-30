import App from "@/components/App";
import ThemeProvider from "@/contexts/Theme/ThemeProvider";
import useInitializeApp from "@/hooks/useInitializeApp";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initialTheme, loaded } = useInitializeApp();
  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider storedTheme={initialTheme}>
      <App />
    </ThemeProvider>
  );
}
