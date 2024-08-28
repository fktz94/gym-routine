import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ConfirmDeleteRoutineModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { deleteRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetDeleteRoutineState } from "@/src/store/Routines/RoutinesSlice";
import { ResponseStatus } from "@/src/types/Store";
import ThemedModal from "./ThemedModal";
import { Theme } from "../types/Contexts";

const ConfirmDeleteRoutineModal = ({ closeModal, id, name }: ConfirmDeleteRoutineModalProps) => {
  const { theme } = useThemeContext();
  const styles = confirmDeletingModalStyles(theme);
  const { isDeletingRoutine, deleteRoutineErrorMessage, deleteRoutineStatus } = useAppSelector(
    ({ routines }) => routines
  );
  const dispatch = useAppDispatch();

  const handleDeleteRoutine = () => {
    dispatch(deleteRoutine({ routineId: id }));
  };

  useEffect(() => {
    if (isDeletingRoutine) return;
    if (deleteRoutineStatus === ResponseStatus.FULFILLED) {
      dispatch(resetDeleteRoutineState());
      closeModal();
    } else if (deleteRoutineStatus === ResponseStatus.REJECTED) {
      dispatch(resetDeleteRoutineState());
      Alert.alert("Error!", deleteRoutineErrorMessage);
    }
  }, [deleteRoutineStatus]);

  return (
    <ThemedModal
      isLoading={isDeletingRoutine}
      closeModal={closeModal}
      handleAccept={handleDeleteRoutine}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.baseText}>
          Are you sure you want to delete this routine: {"\n"}
          <Text style={styles.routineName}>{name}</Text>?
        </Text>
        <Text style={[styles.baseText, { fontSize: 14 }]}>(This change cannot be undone)</Text>
      </View>
    </ThemedModal>
  );
};

export default ConfirmDeleteRoutineModal;

const confirmDeletingModalStyles = (theme: Theme) =>
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
    routineName: { fontWeight: "bold", fontSize: 24 },
  });
