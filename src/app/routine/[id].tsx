import RoutineDetails from "@/src/components/RoutineDetails";
import ThemedButton from "@/src/components/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import RoutineProvider from "@/src/contexts/Routine/RoutineProvider";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useRoutineDescription from "@/src/hooks/useRoutineDescription";
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function RoutineScreen() {
  const { theme } = useThemeContext();
  const styles = routineDescriptionStyles(theme);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { routine, selectedDay, handleSelectedDay } = useRoutineDescription({ id });

  const daysButtons = () =>
    routine?.data.map((_, i) => (
      <ThemedButton
        externalButtonStyles={styles.dayButtonView}
        externalTextStyles={{
          ...styles.dayButtonText,
          fontWeight: selectedDay === i ? "bold" : undefined,
        }}
        isSecondary={selectedDay === i}
        key={i}
        onPress={() => handleSelectedDay(i)}
      >
        Day {i + 1}
      </ThemedButton>
    ));

  const day = routine?.data[selectedDay];
  const isDayEmpty = !day || day?.length === 0;

  const emptyDayText = () => (
    <Text style={styles.emptyDay}>This day is empty! {"\n"} Fill it!</Text>
  );

  if (!routine) return null; // Should redirect to 404 page.

  return (
    <RoutineProvider routine={routine} selectedDay={selectedDay}>
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
    </RoutineProvider>
  );
}

const routineDescriptionStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 12,
    },
    daysButtonsContainer: {
      paddingVertical: 16,
      paddingHorizontal: 40,
      flexDirection: "row",
      justifyContent: "space-evenly",
      gap: 6,
      flexWrap: "wrap",
    },
    dayButtonView: { flexGrow: 1, maxWidth: 100 },
    dayButtonText: { textAlign: "center" },
    emptyDay: {
      fontWeight: "bold",
      fontSize: 26,
      color: Colors[theme].text,
      textAlign: "center",
      paddingTop: 32,
      lineHeight: 64,
    },
    routineContainer: { flex: 1 },
    routineName: {
      fontWeight: "bold",
      fontSize: 32,
      color: Colors[theme].text,
      textAlign: "center",
    },
  });
