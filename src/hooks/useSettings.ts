import { getTheme, storeTheme } from "@/src/utils/AsyncStorage/Theme";
import { useEffect, useState } from "react";
import { Theme } from "../types/Contexts";
import { useTranslation } from "react-i18next";
import { getLanguage, storeLanguage } from "../utils/AsyncStorage/Language";
import { useColorScheme } from "react-native";

const useSettings = () => {
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState<Theme>("dark");
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [languageLoaded, setLanguageLoaded] = useState(false);

  const setStoredTheme = async () => {
    const storedTheme = (await getTheme()) as Theme | undefined | null;
    setTheme(storedTheme ?? colorScheme ?? "dark");
    setThemeLoaded(true);
  };

  const setStoredLanguage = async () => {
    const language = await getLanguage();
    setLanguageLoaded(true);
    if (!language) return;
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    await storeTheme(newTheme);
    setTheme(newTheme);
  };

  const changeLanguage = async (newLang: string) => {
    await storeLanguage(newLang);
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const callAsyncStorage = async () => {
    await setStoredLanguage();
    await setStoredTheme();
  };

  useEffect(() => {
    (async () => void callAsyncStorage())();
  }, []);

  return {
    theme,
    themeLoaded,
    toggleTheme,
    language,
    languageLoaded,
    changeLanguage,
  };
};

export default useSettings;
