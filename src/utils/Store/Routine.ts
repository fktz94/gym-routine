import { ModifyOneExerciseUtilsProps } from "@/src/types/Utils";
import { produce } from "immer";

export const modifyOneExercise = ({
  routines,
  routineId,
  selectedDay,
  exerciseName,
  selectedSerie,
  newWeightValue,
  makeItCurrent,
}: ModifyOneExerciseUtilsProps) => {
  const nextState = produce(routines, (draft) => {
    draft
      .find((el) => el.id === routineId)!
      .data[selectedDay].find((el) => el.name === exerciseName)!.weightsAndRepetitions[
      selectedSerie
    ].weight = newWeightValue;

    if (makeItCurrent) {
      draft
        .find((el) => el.id === routineId)!
        .data[selectedDay].find((el) => el.name === exerciseName)!.current = selectedSerie;
    }
  });

  return nextState;
};
