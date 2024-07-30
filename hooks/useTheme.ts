import { storeTheme } from "@/utils/AsyncStorage/Theme";
import { useState } from "react";

const useTheme = (storedTheme: Theme) => {
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    (async () => storeTheme(newTheme))();
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
