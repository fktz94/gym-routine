import useTheme from "@/src/hooks/useTheme";
import ThemeContext from "./ThemeContext";
import { Theme } from "@/src/types/Contexts";

type Props = {
  storedTheme: Theme;
  children: React.ReactNode;
};

export default function ThemeProvider({ children, storedTheme }: Props) {
  const { theme, toggleTheme } = useTheme(storedTheme);
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
