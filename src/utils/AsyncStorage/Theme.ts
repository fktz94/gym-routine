import { Theme } from "@/src/types/Contexts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeTheme = async (value: Theme) => {
  try {
    await AsyncStorage.setItem("theme", value);
  } catch (error) {
    console.error("Error storing theme on AsyncStorage");
  }
};

export const getTheme = async () => {
  try {
    const storedTheme = await AsyncStorage.getItem("theme");
    return storedTheme as Theme;
  } catch (error) {
    console.error("Error storing theme on AsyncStorage");
  }
};
