import SettingsContext from "./SettingsContext";
import { Theme } from "@/src/types/Contexts";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  theme: Theme;
  language: string | undefined;
  toggleTheme: () => void;
  changeLanguage: (val: string) => void;
}

export default function SettingsProvider({
  children,
  theme,
  toggleTheme,
  language,
  changeLanguage,
}: Props) {
  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, language, changeLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
