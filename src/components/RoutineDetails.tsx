import { View, Text } from "react-native";
import ExerciseItem from "./ExerciseItem";

const RoutineDetails = ({ routineDay }: { routineDay: RoutineDay }) => {
  console.log(routineDay);

  return (
    <View>
      {routineDay.map(({ name, sets, weightsAndRepetitions }, i) => (
        <ExerciseItem
          name={name}
          sets={sets}
          weightsAndRepetitions={weightsAndRepetitions}
          key={i}
        />
      ))}
    </View>
  );
};

export default RoutineDetails;
