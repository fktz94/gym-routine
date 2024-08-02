import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { useAppSelector } from "@/src/hooks/reactReduxHook";
import useRoutineDescription from "@/src/hooks/useRoutineDescription";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RoutineDescription() {
  const { theme } = useThemeContext();
  const styles = routineDescriptionStyles(theme);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { currentRoutineData, routines } = useAppSelector(({ routines }) => routines);

  const { routine, selectedDay, handleSelectedDay } = useRoutineDescription({
    currentRoutineData,
    id,
    routines,
  });

  const daysButtons = () =>
    routine?.data.map((_, i) => (
      <ThemedButton isSecondary={selectedDay === i} key={i} onPress={() => handleSelectedDay(i)}>
        Day {i + 1}
      </ThemedButton>
    ));

  const day = routine?.data[selectedDay];

  return (
    <View style={styles.container}>
      <Text style={styles.routineName}>{routine?.name}</Text>
      <View style={styles.daysButtonsContainer}>{daysButtons()}</View>
      <View style={styles.routineContainer}></View>
    </View>
  );
}

const routineDescriptionStyles = (theme: Theme) =>
  StyleSheet.create({
    container: { borderWidth: 1 },
    daysButtonsContainer: {
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    routineContainer: {},
    routineName: {
      fontWeight: "bold",
      fontSize: 32,
      color: Colors[theme].text,
      textAlign: "center",
    },
  });
