import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeLanguage = async (value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("language", jsonValue);
  } catch (error) {
    throw new Error("Error storing language on AsyncStorage");
  }
};

export const getLanguage = async (): Promise<string | null> => {
  try {
    const storedValue = await AsyncStorage.getItem("language");
    const storedRoutines = storedValue ? JSON.parse(storedValue) : null;
    return storedRoutines;
  } catch (error) {
    throw new Error("Error retrieving language from AsyncStorage");
  }
};
