import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { ResponseStatus } from "@/src/types/Store";
import { router } from "expo-router";
import { editRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetEditRoutineState } from "@/src/store/Routines/RoutinesSlice";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import ThemedModal from "../ThemedModal";
import { Theme } from "@/src/types/Contexts";

const ConfirmEditRoutineModal = ({
  closeModal,
}: ConfirmCreateNewExerciseModalProps) => {
  const { theme } = useSettingsContext();
  const styles = quitCreatingModalStyles(theme);
  const dispatch = useAppDispatch();
  const { isEditingRoutine, editRoutineErrorMessage, editRoutineStatus } =
    useAppSelector(({ routines }) => routines);
  const { selectedRoutine, toCurrent } = useEditRoutineContext();

  const handleCreateRoutine = () => {
    dispatch(
      editRoutine({
        routineData: selectedRoutine,
        setToCurrentRoutine: toCurrent,
      })
    );
  };

  const isLoading =
    editRoutineStatus !== ResponseStatus.IDLE && isEditingRoutine;

  const finishEdit = () => {
    dispatch(resetEditRoutineState());
    closeModal();
    router.navigate(`/routine/${selectedRoutine.id}`);
  };

  useEffect(() => {
    if (isLoading) return;
    if (editRoutineStatus === ResponseStatus.FULFILLED) {
      finishEdit();
    } else if (editRoutineErrorMessage) {
      Alert.alert("Error!", editRoutineErrorMessage);
      finishEdit();
    }
  }, [editRoutineStatus, isLoading]);

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleCreateRoutine}
      isLoading={isEditingRoutine}
    >
      <View style={styles.innerTextContainer}>
        <Text style={styles.baseText}>Great! You're almost done!</Text>
        <Text style={styles.baseText}>Confirm modifications?</Text>
      </View>
    </ThemedModal>
  );
};

export default ConfirmEditRoutineModal;

const quitCreatingModalStyles = (theme: Theme) =>
  StyleSheet.create({
    innerTextContainer: {
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
