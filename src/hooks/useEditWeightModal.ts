import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "./reactReduxHook";
import useRoutineContext from "../contexts/Routine/useRoutineContext";
import { UseEditWeightModal } from "../types/Hooks";
import { ResponseStatus } from "../types/Store";
import { modifyExercise } from "../store/Routines/RoutinesAsyncThunk";
import { resetModifiyExerciseState } from "../store/Routines/RoutinesSlice";
import { validateWeightInputNumber } from "@/src/utils/Validations/Validations";
import { NoWeight } from "../constants/Strings";

const useEditWeightModal = ({
  closeModal,
  exerciseData,
  exerciseName,
  isCurrent,
  selectedSerie,
}: UseEditWeightModal) => {
  const dispatch = useAppDispatch();

  const {
    isGettingAllRoutines,
    isModifyingRoutines,
    modifyExerciseStatus,
    modifyExerciseErrorMessage,
  } = useAppSelector(({ routines }) => routines);

  const { routineId, selectedDay } = useRoutineContext();

  const [newWeightValue, setNewValue] = useState(exerciseData.weight);
  const [customValue, setCustomValue] = useState(
    Number.isNaN(exerciseData.weight && +exerciseData.weight) && exerciseData.weight !== NoWeight
  );
  const [settedToCurrent, setSettedToCurrent] = useState(isCurrent);

  const handleCustomCheckbox = (val: boolean) => {
    setNewValue("");
    setCustomValue(val);
  };

  const handleCurrentCheckbox = (val: boolean) => setSettedToCurrent(val);

  const handleNoWeightCheckbox = (val: boolean) => setNewValue(val ? NoWeight : "");

  const hasNoWeight = newWeightValue === NoWeight;

  const handleNewValue = (input: number | string) => {
    const isNotNumber = Number.isNaN(+input);
    const newVal = isNotNumber || input === "" ? input : +input;
    if (!customValue && validateWeightInputNumber(newVal)) return;
    setNewValue(newVal.toString());
  };

  const isValueInvalid = exerciseData.weight === newWeightValue || !newWeightValue;
  const isButtonDisabled = isValueInvalid && settedToCurrent === isCurrent;
  const isLoading = isGettingAllRoutines || isModifyingRoutines;
  const hasEndedFetchingModification =
    modifyExerciseStatus === ResponseStatus.REJECTED ||
    modifyExerciseStatus === ResponseStatus.FULFILLED;

  const handleAccept = () => {
    if (!newWeightValue) return;
    const payload = {
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue,
      makeItCurrent: settedToCurrent && !isCurrent,
    };

    dispatch(modifyExercise(payload));
  };

  useEffect(() => {
    if (isLoading || modifyExerciseStatus === ResponseStatus.IDLE) return;

    if (hasEndedFetchingModification) {
      dispatch(resetModifiyExerciseState());
      closeModal();
    }
    if (modifyExerciseErrorMessage) {
      Alert.alert("Error!", modifyExerciseErrorMessage);
    }
  }, [modifyExerciseStatus, isLoading]);

  return {
    customValue,
    handleAccept,
    handleCustomCheckbox,
    handleCurrentCheckbox,
    handleNewValue,
    handleNoWeightCheckbox,
    hasNoWeight,
    isButtonDisabled,
    isLoading,
    newWeightValue,
    settedToCurrent,
  };
};

export default useEditWeightModal;
