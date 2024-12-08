import { useContext } from "react";
import SettingsContext from "./SettingsContext";

export default function useSettingsContext() {
  const settingsContext = useContext(SettingsContext);
  if (!settingsContext) throw new Error("Failed to load SettingsContext");
  const { theme, toggleTheme, changeLanguage, language } = settingsContext;
  return { theme, toggleTheme, changeLanguage, language };
}
