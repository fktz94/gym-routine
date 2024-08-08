import { useContext } from "react";
import ThemeContext from "./ThemeContext";

export default function useThemeContext() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("Failed to load ThemeContext");
  const { theme, toggleTheme, showBackArrowButton, toggleShowBackArrowButton } = themeContext;
  return { theme, toggleTheme, showBackArrowButton, toggleShowBackArrowButton };
}
