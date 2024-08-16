type Theme = "light" | "dark";

type ThemeValueType = {
  theme: Theme;
  toggleTheme: () => void;
  showBackArrowButton: boolean;
  toggleShowBackArrowButton: (val: boolean) => void;
  showQuitModal: boolean;
  toggleShowQuitModal: (val: boolean) => void;
} | null;
