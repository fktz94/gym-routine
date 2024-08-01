import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import useThemeContext from "@/contexts/Theme/useThemeContext";
import { StyleSheet, Text, View } from "react-native";
import data from "../data.json";
import { useState } from "react";
import RoutinesList from "@/components/RoutinesList";

export default function Index() {
  const [{ routines, currentRoutine }] = useState<RoutinesData>(data);

  const current = routines.filter((el) => el.name === currentRoutine);
  const pastRoutines = routines.filter((el) => el.name !== currentRoutine);

  const { theme } = useThemeContext();
  const styles = indexStyles(theme);

  return (
    <View style={styles.mainContainer}>
      <ThemedButton defaultStyle="secondary" onPress={() => {}}>
        New routine
      </ThemedButton>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Current routine</Text>
        <RoutinesList selectedRoutines={current} isCurrent />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Past routines</Text>
        <RoutinesList selectedRoutines={pastRoutines} />
      </View>
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 32,
    },
    listContainer: {
      gap: 15,
      width: "100%",
    },
    title: { fontWeight: "bold", fontSize: 24, color: Colors[theme].text, textAlign: "center" },
  });
