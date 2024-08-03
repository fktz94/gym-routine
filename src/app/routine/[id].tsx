import RoutineDetails from "@/src/components/RoutineDetails";
import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { useAppSelector } from "@/src/hooks/reactReduxHook";
import useRoutineDescription from "@/src/hooks/useRoutineDescription";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RoutineScreen() {
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
  const isDayEmpty = !day || day?.length === 0;

  const emptyDayText = () => (
    <Text style={styles.emptyDay}>This day is empty! {"\n"} Fill it!</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.routineName}>{routine?.name}</Text>
      <View style={styles.daysButtonsContainer}>{daysButtons()}</View>
      {isDayEmpty ? (
        emptyDayText()
      ) : (
        <View style={styles.routineContainer}>
          <RoutineDetails routineDay={routine?.data[selectedDay]} />
        </View>
      )}
    </View>
  );
}

const routineDescriptionStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    daysButtonsContainer: {
      paddingVertical: 16,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    emptyDay: {
      fontWeight: "bold",
      fontSize: 26,
      color: Colors[theme].text,
      textAlign: "center",
      paddingTop: 32,
      lineHeight: 64,
    },
    routineContainer: {},
    routineName: {
      fontWeight: "bold",
      fontSize: 32,
      color: Colors[theme].text,
      textAlign: "center",
    },
  });
