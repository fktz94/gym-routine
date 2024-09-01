import { ScrollView, StyleSheet } from "react-native";
import { ExerciseItem, ExerciseItemTitle } from "./ExerciseItem";
import { RoutineDay } from "@/src/types/Routines";

const RoutineDetails = ({ routineDay }: { routineDay: RoutineDay }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExerciseItemTitle />
      {routineDay.map((exercise, i) => (
        <ExerciseItem exercise={exercise} key={i} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 2,
  },
});

export default RoutineDetails;
