import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import { AcceptButton, CancelButton } from "../ThemedButton";
import CreateExerciseModal from "./CreateExerciseModal";

const NewDayItem = ({ dayIndex }: { dayIndex: number }) => {
  const { theme } = useThemeContext();
  const styles = secondStepStyles(theme);
  const [isShown, setIsShown] = useState(false);

  const [isCreating, setIsCreating] = useState(false);

  const { newRoutineState } = useNewRoutineContext();
  const { data } = newRoutineState;

  const showDayDetails = () => setIsShown(!isShown);

  const startCreatingNewExercise = () => setIsCreating(true);
  const cancelCreatingNewExercise = () => {
    setIsCreating(false);
  };

  const currentExercises = () =>
    data[dayIndex].map((el) => (
      <View style={styles.exerciseItem}>
        <TextInput style={styles.exercisesTextInput} />
        <View style={styles.exercisesDetailsContainer}></View>
      </View>
    ));

  return (
    <View style={styles.dayContainer}>
      <Pressable style={styles.dayButton} onPress={showDayDetails}>
        <Text style={styles.dayButtonText}>DAY {dayIndex + 1}</Text>
        <Ionicons name={isShown ? "chevron-up" : "chevron-down"} />
      </Pressable>
      {isShown && (
        <>
          {isCreating && <CreateExerciseModal closeModal={cancelCreatingNewExercise} />}
          {/* {true && <CreateExerciseModal closeModal={cancelCreatingNewExercise} />} */}
          <View style={styles.exercises}>
            <TouchableOpacity onPress={startCreatingNewExercise}>
              <Ionicons name="add-circle-outline" size={40} style={styles.addExerciseIcon} />
            </TouchableOpacity>
            {currentExercises()}
          </View>
        </>
      )}
    </View>
  );
};

export default NewDayItem;

const secondStepStyles = (theme: Theme) =>
  StyleSheet.create({
    dayContainer: { flex: 1, width: "75%", margin: "auto" },
    dayButton: {
      backgroundColor: Colors[theme].secondary,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dayButtonText: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      fontSize: 16,
    },
    exercises: { backgroundColor: Colors[theme].text, gap: 15, padding: 20 },
    addExerciseIcon: { margin: "auto" },
    exercisesTextInput: {
      color: Colors[theme].text,
      fontSize: 18,
      backgroundColor: Colors[theme].background,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    exercisesDetailsContainer: { borderWidth: 1 },
    exerciseItem: { borderWidth: 1 },
    acceptCancelButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      margin: "auto",
      gap: 60,
    },
  });
