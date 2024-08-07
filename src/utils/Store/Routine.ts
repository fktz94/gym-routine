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
    const selectedExercise = draft
      .find((el) => el.id === routineId)
      ?.data[selectedDay].find((el) => el.name === exerciseName);

    if (!selectedExercise) return;

    selectedExercise.weightsAndRepetitions[selectedSerie].weight = newWeightValue;

    if (makeItCurrent) {
      selectedExercise.current = selectedSerie;
    }
  });

  return nextState;
};
