import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "./reactReduxHook";
import useRoutineContext from "../contexts/Routine/useRoutineContext";
import { UseEditWeightModal } from "../types/Hooks";
import { ResponseStatus } from "../types/Store";
import { modifyExercise } from "../store/Routines/RoutinesAsyncThunk";
import { validateWeightInputNumber } from "@/src/utils/Validations/Validations";
import { Strings } from "../constants/Strings";
import { Weight } from "../types/Routines";

const useEditWeightModal = ({
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

  const newInitialWeight = !exerciseData.weight?.isCustom
    ? exerciseData.weight?.value?.split(" ")[0]
    : exerciseData.weight?.value;

  const initialCL =
    exerciseData.weight?.value &&
    exerciseData.weight?.value?.split(" ")?.findIndex((item) => item === Strings.EachSide) !== -1;

  const [newWeightValue, setNewValue] = useState(newInitialWeight);
  const [customValue, setCustomValue] = useState(exerciseData.weight?.isCustom);
  const [settedToCurrent, setSettedToCurrent] = useState(isCurrent);
  const [hasCL, setHasCL] = useState(initialCL);

  const handleCustomCheckbox = (val: boolean) => {
    setNewValue("");
    setHasCL(false);
    setCustomValue(val);
  };

  const handleCurrentCheckbox = (val: boolean) => setSettedToCurrent(val);

  const handleNoWeightCheckbox = (val: boolean) => setNewValue(val ? Strings.NoWeight : "");

  const hasNoWeight = newWeightValue === Strings.NoWeight;

  const handleNewValue = (input: string) => {
    if (!customValue && validateWeightInputNumber(input)) return;
    setNewValue(input);
  };

  const toggleCL = () => setHasCL(!hasCL);

  const isSameValue = () => {
    if (!exerciseData.weight) return;
    const { value } = exerciseData.weight;
    if (value === newWeightValue) return true;
    if (!customValue && initialCL === hasCL && newWeightValue === newInitialWeight) return true;
    return false;
  };

  const isValueInvalid = isSameValue() || !newWeightValue;
  const isButtonDisabled = isValueInvalid && settedToCurrent === isCurrent;
  const isLoading = isGettingAllRoutines || isModifyingRoutines;

  const handleAccept = () => {
    if (!newWeightValue) return;
    const completedValue = !customValue
      ? `${newWeightValue} kg${hasCL ? ` ${Strings.EachSide}` : ""}`
      : newWeightValue;
    const newValue: Weight = {
      isCustom: !!customValue || newWeightValue === Strings.NoWeight,
      value: completedValue,
    };
    const payload = {
      routineId,
      selectedDay,
      exerciseName,
      selectedSerie,
      newWeightValue: newValue,
      makeItCurrent: settedToCurrent && !isCurrent,
    };

    dispatch(modifyExercise(payload));
  };

  useEffect(() => {
    if (isLoading || modifyExerciseStatus === ResponseStatus.IDLE) return;

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
    hasCL,
    hasNoWeight,
    isButtonDisabled,
    isLoading,
    newWeightValue,
    settedToCurrent,
    toggleCL,
  };
};

export default useEditWeightModal;
