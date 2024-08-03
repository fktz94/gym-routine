import { ScrollView, StyleSheet, View } from "react-native";
import { ExerciseItem, ExerciseItemTitle } from "./ExerciseItem";

const RoutineDetails = ({ routineDay }: { routineDay: RoutineDay }) => {
  console.log(routineDay);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ExerciseItemTitle />
      {routineDay.map(({ name, sets, weightsAndRepetitions }, i) => (
        <ExerciseItem
          name={name}
          sets={sets}
          weightsAndRepetitions={weightsAndRepetitions}
          key={i}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 6,
  },
});

export default RoutineDetails;
