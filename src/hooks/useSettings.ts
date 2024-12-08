import { storeTheme } from "@/src/utils/AsyncStorage/Theme";
import { useState } from "react";
import { Theme } from "../types/Contexts";
import { useTranslation } from "react-i18next";

const useSettings = (
  storedTheme: Theme,
  storedLanguage: string | undefined
) => {
  const [theme, setTheme] = useState(storedTheme);
  const [language, setLanguage] = useState(storedLanguage);
  const { i18n } = useTranslation();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    (async () => storeTheme(newTheme))();
    setTheme(newTheme);
  };

  const changeLanguage = async (newLang: string) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return { theme, toggleTheme, language, changeLanguage };
};

export default useSettings;
