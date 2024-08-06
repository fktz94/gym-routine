import { ModifyOneExerciseProps } from "@/src/types/Utils";
import { produce } from "immer";

export const modifyOneExercise = ({
  id,
  index,
  routines,
  selectedDay,
  exerciseName,
  newValue,
  makeItCurrent,
}: ModifyOneExerciseProps) => {
  // const selectedValue = (dat) =>
  //   dat.find((el) => el.id === id)?.data[selectedDay].find((el) => el.name === exerciseName)!
  //     .weightsAndRepetitions[index].weight;
  // console.log(selectedValue(routines));

  const nextState = produce(routines, (draft) => {
    draft
      .find((el) => el.id === id)!
      .data[selectedDay].find((el) => el.name === exerciseName)!.weightsAndRepetitions[
      index
    ].weight = newValue;
  });

  console.log(nextState);

  return nextState;
};
