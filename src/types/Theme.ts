type Theme = "light" | "dark";

type ThemeValueType = {
  theme: Theme;
  toggleTheme: () => void;
} | null;
