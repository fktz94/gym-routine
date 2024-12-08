import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ThemedModal from "../ThemedModal";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { deleteRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetDeleteRoutineState } from "@/src/store/Routines/RoutinesSlice";
import { ConfirmDeleteRoutineModalProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { ResponseStatus } from "@/src/types/Store";

const ConfirmDeleteRoutineModal = ({
  closeModal,
  id,
  name,
}: ConfirmDeleteRoutineModalProps) => {
  const { theme } = useSettingsContext();
  const styles = confirmDeletingModalStyles(theme);
  const { isDeletingRoutine, deleteRoutineErrorMessage, deleteRoutineStatus } =
    useAppSelector(({ routines }) => routines);
  const dispatch = useAppDispatch();

  const handleDeleteRoutine = () => {
    dispatch(deleteRoutine({ routineId: id }));
  };

  const finishDeleting = () => {
    dispatch(resetDeleteRoutineState());
    closeModal();
  };

  useEffect(() => {
    if (isDeletingRoutine) return;
    if (deleteRoutineStatus === ResponseStatus.FULFILLED) {
      finishDeleting();
    } else if (deleteRoutineStatus === ResponseStatus.REJECTED) {
      finishDeleting();
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
        <Text style={[styles.baseText, { fontSize: 14 }]}>
          (This change cannot be undone)
        </Text>
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
