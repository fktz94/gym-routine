import { ScrollView, StyleSheet, View } from "react-native";
import { ExerciseItem, ExerciseItemTitle } from "./ExerciseItem";

const RoutineDetails = ({ routineDay }: { routineDay: RoutineDay }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExerciseItemTitle />
      {routineDay.map(({ name, sets, weightsAndRepetitions, current }, i) => (
        <ExerciseItem
          name={name}
          sets={sets}
          weightsAndRepetitions={weightsAndRepetitions}
          current={current}
          key={i}
        />
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