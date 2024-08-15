import { RoutinesData } from "@/src/types/Routines";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeRoutines = async (value: RoutinesData) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("routines", jsonValue);
  } catch (error) {
    throw new Error("Error storing routines on AsyncStorage");
  }
};

export const getRoutines = async (): Promise<RoutinesData | null> => {
  try {
    const storedValue = await AsyncStorage.getItem("routines");
    const storedRoutines = storedValue ? JSON.parse(storedValue) : null;
    return storedRoutines;
  } catch (error) {
    throw new Error("Error retrieving routines from AsyncStorage");
  }
};
