import useTheme from "@/hooks/useTheme";
import ThemeContext from "./ThemeContext";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
