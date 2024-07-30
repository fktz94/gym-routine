type Theme = "light" | "dark" | null;

type ThemeValueType = {
  theme: Theme;
  toggleTheme: () => void;
} | null;
