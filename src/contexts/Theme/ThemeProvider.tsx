import useTheme from "@/src/hooks/useTheme";
import ThemeContext from "./ThemeContext";

type Props = {
  storedTheme: Theme;
  children: React.ReactNode;
};

export default function ThemeProvider({ children, storedTheme }: Props) {
  const { theme, toggleTheme, showBackArrowButton, toggleShowBackArrowButton } =
    useTheme(storedTheme);
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, showBackArrowButton, toggleShowBackArrowButton }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
