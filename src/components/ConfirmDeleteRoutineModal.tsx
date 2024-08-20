import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { AcceptButton, CancelButton } from "./ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import {
  ConfirmCreateNewExerciseModalProps,
  ConfirmDeleteRoutineModalProps,
} from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { createNewRoutine, deleteRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import {
  resetCreateRoutineState,
  resetDeleteRoutineState,
} from "@/src/store/Routines/RoutinesSlice";
import { ResponseStatus } from "@/src/types/Store";
import { router } from "expo-router";

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
    }

    if (deleteRoutineErrorMessage) {
      Alert.alert("Error!", deleteRoutineErrorMessage);
      dispatch(resetDeleteRoutineState());
    }
  }, [deleteRoutineStatus]);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        {isDeletingRoutine ? (
          <ActivityIndicator size={80} color={Colors[theme].secondary} />
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
                  <Text style={styles.baseText}>
                    Are you sure you want to delete this routine:{" "}
                    <Text style={styles.routineName}>
                      {"\n"}
                      {name}
                    </Text>
                    ?
                  </Text>
                  <Text style={[styles.baseText, { fontSize: 14 }]}>
                    (This change cannot be undone)
                  </Text>
                </View>
                <View style={styles.buttonsContainer}>
                  <CancelButton onCancel={closeModal} />
                  <AcceptButton onAccept={handleDeleteRoutine} />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default ConfirmDeleteRoutineModal;

const confirmDeletingModalStyles = (theme: Theme) =>
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
    routineName: { fontWeight: "bold", fontSize: 24 },
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
