import useSettings from "@/src/hooks/useSettings";
import SettingsContext from "./SettingsContext";
import { Theme } from "@/src/types/Contexts";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  storedTheme: Theme;
  storedLanguage: string | undefined;
}

export default function SettingsProvider({
  children,
  storedTheme,
  storedLanguage,
}: Props) {
  const { theme, toggleTheme, language, changeLanguage } = useSettings(
    storedTheme,
    storedLanguage
  );
  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, language, changeLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
