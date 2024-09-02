import { Alert } from "react-native";
import { useEffect } from "react";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "./reactReduxHook";
import useHeaderContext from "../contexts/Header/useHeaderContext";
import useNewRoutineContext from "../contexts/NewRoutine/useNewRoutineContext";
import { createNewRoutine } from "../store/Routines/RoutinesAsyncThunk";
import { resetCreateRoutineState } from "../store/Routines/RoutinesSlice";
import { ResponseStatus } from "../types/Store";

const useConfirmNewRoutine = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useAppDispatch();

  const { isCreatingRoutine, createRoutineErrorMessage, createRoutineStatus } = useAppSelector(
    ({ routines }) => routines
  );

  const { toggleShowBackArrowButton } = useHeaderContext();
  const { newRoutineState } = useNewRoutineContext();
  const { name, data, warmUp } = newRoutineState;

  const handleCreateRoutine = () => {
    dispatch(createNewRoutine({ routineData: data, routineName: name, routineWarmUp: warmUp }));
  };

  const isLoading = createRoutineStatus !== ResponseStatus.IDLE && isCreatingRoutine;

  const finishCreating = () => {
    dispatch(resetCreateRoutineState());
    closeModal();
    toggleShowBackArrowButton(true);
    router.navigate("/");
  };

  useEffect(() => {
    if (isLoading) return;
    if (createRoutineStatus === ResponseStatus.FULFILLED) {
      finishCreating();
    } else if (createRoutineStatus === ResponseStatus.REJECTED) {
      finishCreating();
      Alert.alert("Error!", createRoutineErrorMessage);
    }
  }, [createRoutineStatus, isLoading]);

  return { handleCreateRoutine, isCreatingRoutine };
};

export default useConfirmNewRoutine;
