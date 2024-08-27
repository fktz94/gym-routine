import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { createNewRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetCreateRoutineState } from "@/src/store/Routines/RoutinesSlice";
import { ResponseStatus } from "@/src/types/Store";
import { router } from "expo-router";
import ThemedModal from "../ThemedModal";

const ConfirmCreateNewRoutineModal = ({ closeModal }: ConfirmCreateNewExerciseModalProps) => {
  const { theme, toggleShowBackArrowButton } = useThemeContext();
  const styles = confirmCreateNewRoutineModalStyle(theme);

  const dispatch = useAppDispatch();
  const { isCreatingRoutine, createRoutineErrorMessage, createRoutineStatus } = useAppSelector(
    ({ routines }) => routines
  );

  const { newRoutineState } = useNewRoutineContext();
  const { name, data } = newRoutineState;

  const handleCreateRoutine = () => {
    dispatch(createNewRoutine({ routineData: data, routineName: name }));
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

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleCreateRoutine}
      isLoading={isCreatingRoutine}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>Great! You're almost done!</Text>
        <Text style={styles.baseText}>Confirm?</Text>
        <Text style={[styles.baseText, { fontSize: 14 }]}>(You can modify it later anyway)</Text>
      </View>
    </ThemedModal>
  );
};

export default ConfirmCreateNewRoutineModal;

const confirmCreateNewRoutineModalStyle = (theme: Theme) =>
  StyleSheet.create({
    innerContainer: {
      margin: "auto",
      gap: 16,
    },
    baseText: {
      color: Colors[theme].text,
      fontSize: 20,
      textAlign: "center",
      letterSpacing: 1,
    },
  });
