import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { AcceptButton, CancelButton } from "../ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { ResponseStatus } from "@/src/types/Store";
import { router } from "expo-router";
import { editRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetEditRoutineState } from "@/src/store/Routines/RoutinesSlice";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import CustomLoader from "../CustomLoader";

const ConfirmEditRoutineModal = ({ closeModal }: ConfirmCreateNewExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = quitCreatingModalStyles(theme);
  const dispatch = useAppDispatch();
  const { isEditingRoutine, editRoutineErrorMessage, editRoutineStatus } = useAppSelector(
    ({ routines }) => routines
  );
  const { selectedRoutine, toCurrent } = useEditRoutineContext();

  const handleCreateRoutine = () => {
    dispatch(editRoutine({ routineData: selectedRoutine, setToCurrentRoutine: toCurrent }));
  };

  const isLoading = editRoutineStatus !== ResponseStatus.IDLE && isEditingRoutine;

  useEffect(() => {
    if (isLoading) return;

    if (editRoutineStatus === ResponseStatus.FULFILLED) {
      dispatch(resetEditRoutineState());
      closeModal();
      router.navigate(`/routine/${selectedRoutine.id}`);
    }

    if (editRoutineErrorMessage) {
      Alert.alert("Error!", editRoutineErrorMessage);
      dispatch(resetEditRoutineState());
    }
  }, [editRoutineStatus, isLoading]);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        {isEditingRoutine ? (
          <CustomLoader />
        ) : (
          <>
            <Ionicons
              style={styles.closeIconBtn}
              name="close"
              color={Colors[theme].text}
              size={30}
              onPress={closeModal}
            />
            <View style={styles.exerciseContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.baseText}>Great! You're almost done!</Text>
                  <Text style={styles.baseText}>Confirm modifications?</Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <CancelButton onCancel={closeModal} />
                  <AcceptButton onAccept={handleCreateRoutine} />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ConfirmEditRoutineModal;

const quitCreatingModalStyles = (theme: Theme) =>
  StyleSheet.create({
    closeIconBtn: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 10,
      color: Colors[theme].background,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].modalBackground,
    },
    exerciseContainer: {
      width: "80%",
      padding: 30,
      backgroundColor: Colors[theme].background,
      borderRadius: 10,
      gap: 40,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    innerContainer: {
      gap: 40,
      paddingVertical: 20,
    },
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
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
