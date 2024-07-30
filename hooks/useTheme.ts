import { useState } from "react";
import { useColorScheme } from "react-native";

export { useColorScheme } from "react-native";

const useTheme = () => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = useState(defaultTheme ?? "light");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
