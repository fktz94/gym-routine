import { ActivityIndicator, Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { AcceptButton, CancelButton } from "../ThemedButton";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { ConfirmCreateNewExerciseModalProps } from "@/src/types/Components";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { createNewRoutine } from "@/src/store/Routines/RoutinesAsyncThunk";
import { resetCreateRoutineState } from "@/src/store/Routines/RoutinesSlice";
import { ResponseStatus } from "@/src/types/Store";
import { router } from "expo-router";

const ConfirmCreateNewExerciseModal = ({ closeModal }: ConfirmCreateNewExerciseModalProps) => {
  const { theme, toggleShowBackArrowButton } = useThemeContext();
  const styles = quitCreatingModalStyles(theme);
  const dispatch = useAppDispatch();
  const { isCreatingRoutine, createRoutineErrorMessage, createRoutineStatus } = useAppSelector(
    (state) => state.routines
  );
  const { newRoutineState } = useNewRoutineContext();
  const { name, data } = newRoutineState;

  const handleCreateRoutine = () => {
    dispatch(createNewRoutine({ routineData: data, routineName: name }));
  };

  const isLoading = createRoutineStatus !== ResponseStatus.IDLE && isCreatingRoutine;

  useEffect(() => {
    if (isLoading) return;

    if (createRoutineStatus === ResponseStatus.FULFILLED) {
      dispatch(resetCreateRoutineState());
      closeModal();
      toggleShowBackArrowButton(true);
      router.navigate("/");
    }

    if (createRoutineErrorMessage) {
      Alert.alert("Error!", createRoutineErrorMessage);
    }
  }, [createRoutineStatus, isLoading]);

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        {isCreatingRoutine ? (
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
                  <Text style={styles.baseText}>Great! You're almost done!</Text>
                  <Text style={styles.baseText}>Procceed?</Text>
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

export default ConfirmCreateNewExerciseModal;

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
