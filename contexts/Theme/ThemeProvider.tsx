import useTheme from "@/hooks/useTheme";
import ThemeContext from "./ThemeContext";

type Props = {
  storedTheme: Theme | null;
  children: React.ReactNode;
};

export default function ThemeProvider({ children, storedTheme }: Props) {
  const { theme, toggleTheme } = useTheme(storedTheme);
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
