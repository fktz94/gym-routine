import useTheme from "@/src/hooks/useTheme";
import ThemeContext from "./ThemeContext";
import { Theme } from "@/src/types/Contexts";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  storedTheme: Theme;
}

export default function ThemeProvider({ children, storedTheme }: Props) {
  const { theme, toggleTheme } = useTheme(storedTheme);
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
