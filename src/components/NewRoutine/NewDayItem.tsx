import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import CreateExerciseModal from "./CreateExerciseModal";
import NewExerciseItem from "./NewExerciseItem";

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
    data[dayIndex].map(({ name, sets, weightsAndRepetitions }, i) => {
      const exerciseRepetitions = weightsAndRepetitions.map((el) => el.qty).join(" / ");
      const isLastElement = i === data[dayIndex].length - 1;
      return (
        <NewExerciseItem
          exerciseRepetitions={exerciseRepetitions}
          name={name}
          sets={sets}
          id={i}
          dayIndex={dayIndex}
          style={isLastElement ? { borderBottomWidth: 1 } : undefined}
        />
      );
    });

  return (
    <View style={styles.dayContainer}>
      <Pressable style={styles.dayButton} onPress={showDayDetails}>
        <Text style={styles.dayButtonText}>DAY {dayIndex + 1}</Text>
        <Ionicons name={isShown ? "chevron-up" : "chevron-down"} />
      </Pressable>
      {isShown && (
        <>
          {isCreating && (
            <CreateExerciseModal closeModal={cancelCreatingNewExercise} dayIndex={dayIndex} />
          )}
          <View style={styles.exercises}>
            {data[dayIndex].length > 0 && (
              <View>
                <NewExerciseItem
                  name="Exercise"
                  sets="Sets"
                  exerciseRepetitions="Repetitions"
                  isTitle
                />
                {currentExercises()}
              </View>
            )}
            <TouchableOpacity onPress={startCreatingNewExercise}>
              <Ionicons name="add-circle-outline" size={40} style={styles.addExerciseIcon} />
            </TouchableOpacity>
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

    acceptCancelButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      margin: "auto",
      gap: 60,
    },
  });
