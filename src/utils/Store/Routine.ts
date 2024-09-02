import { Routine, RoutinesData, RoutineStructure } from "@/src/types/Routines";
import {
  AddNewRoutineUtilsProps,
  ConcludeDayRoutineUtilsProps,
  DeleteRoutineUtilsProps,
  EditRoutineUtilsProps,
  ModifyOneExerciseUtilsProps,
} from "@/src/types/Utils";
import { produce } from "immer";
import * as Crypto from "expo-crypto";

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

export const addNewRoutine = ({
  prevRoutinesData,
  routineData,
  routineName,
  routineWarmUp,
}: AddNewRoutineUtilsProps) => {
  const madeOn = new Date().toDateString().split(" ").slice(1).join(" ");
  const routineId = Crypto.randomUUID();
  const payload: RoutineStructure = {
    currentDay: 0,
    data: routineData,
    id: routineId,
    madeOn,
    name: routineName,
    warmUp: routineWarmUp,
  };

  const nextState = produce(prevRoutinesData, (draft: RoutinesData) => {
    draft.currentRoutineId = routineId;
    draft.routines.reverse().push(payload);
    draft.routines.reverse();
  });

  return nextState;
};

export const editOldRoutine = ({ routineData, prevRoutinesData }: EditRoutineUtilsProps) => {
  const nextState = produce(prevRoutinesData, (draft: Routine) => {
    const routineIndex = draft.findIndex((el) => el.id === routineData.id);
    draft[routineIndex] = routineData;
  });
  return nextState;
};

export const deleteSelectedRoutine = ({ routineId, prevRoutinesData }: DeleteRoutineUtilsProps) => {
  const nextState = produce(prevRoutinesData, (draft: Routine) =>
    draft.filter((el) => el.id !== routineId)
  );
  return nextState;
};

export const concludeDaySelectedRoutine = ({
  routineId,
  dayIndex,
  prevRoutinesData,
}: ConcludeDayRoutineUtilsProps) => {
  const nextState = produce(prevRoutinesData, (draft: Routine) =>
    draft.map((el) => {
      if (el.id === routineId) {
        const lastDay = el.data.length - 1;
        const nextDay = dayIndex === lastDay ? 0 : dayIndex + 1;
        const updatedExercisesDays = el.data.map((el) => {
          return el.map((el) => {
            if (el.weightsAndRepetitions.length === 1) return el;
            const lastDay = el.weightsAndRepetitions.length - 1;
            const nextDay = el.current === lastDay ? 0 : el.current + 1;
            return { ...el, current: nextDay };
          });
        });
        return { ...el, data: updatedExercisesDays, currentDay: nextDay };
      } else {
        return el;
      }
    })
  );

  return nextState;
};
