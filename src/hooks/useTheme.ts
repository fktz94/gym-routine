import { storeTheme } from "@/src/utils/AsyncStorage/Theme";
import { useState } from "react";

const useTheme = (storedTheme: Theme) => {
  const [theme, setTheme] = useState(storedTheme);
  const [showBackArrowButton, setShowBackArrowButton] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    (async () => storeTheme(newTheme))();
    setTheme(newTheme);
  };

  const toggleShowBackArrowButton = (val: boolean) => {
    setShowBackArrowButton(val);
  };

  return { theme, toggleTheme, showBackArrowButton, toggleShowBackArrowButton };
};

export default useTheme;
