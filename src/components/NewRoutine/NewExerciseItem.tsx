import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ExerciseItemProps } from "@/src/types/Components";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";

const NewExerciseItem = ({
  name,
  sets,
  exerciseRepetitions,
  isTitle = false,
  style,
  dayIndex,
  id,
}: ExerciseItemProps) => {
  const { theme } = useThemeContext();
  const styles = newExerciseItemStyles(theme);

  const { handleDeleteOneExercise } = useNewRoutineContext();

  const deleteExercise = () => {
    if ((dayIndex !== 0 && !dayIndex) || (id !== 0 && !id)) return;
    handleDeleteOneExercise({ dayIndex, exerciseIndex: id });
  };

  return (
    <View style={[styles.exerciseItem, style]}>
      <Text
        style={{
          ...styles.exerciseItemText,
          ...styles.exerciseName,
          ...(isTitle && { ...styles.exerciseTitle }),
          ...(!isTitle && { ...styles.exerciseElement }),
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          ...styles.exerciseItemText,
          ...styles.exerciseSets,
          ...(isTitle && { ...styles.exerciseTitle }),
          ...(!isTitle && { ...styles.exerciseElement }),
        }}
      >
        {sets}
      </Text>
      <Text
        style={{
          ...styles.exerciseItemText,
          ...styles.exerciseRepetitions,
          ...(isTitle && { ...styles.exerciseTitle }),
          ...(!isTitle && { ...styles.exerciseElement }),
        }}
      >
        {exerciseRepetitions}
      </Text>
      {!isTitle && <Button title="delete" onPress={deleteExercise} />}
    </View>
  );
};

export default NewExerciseItem;

const newExerciseItemStyles = (theme: Theme) =>
  StyleSheet.create({
    exerciseItem: {
      flexDirection: "row",
      borderWidth: 1,
      borderBottomWidth: 0,
    },
    exerciseItemText: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      textAlign: "center",
      fontWeight: "bold",
    },
    exerciseName: { width: "40%" },
    exerciseSets: { width: "20%" },
    exerciseRepetitions: { width: "40%" },
    exerciseTitle: {
      backgroundColor: Colors[theme].modalBackground,
      color: Colors[theme].text,
    },
    exerciseElement: {
      backgroundColor: Colors[theme].secondary,
      color: Colors[theme].primary,
      textAlignVertical: "center",
      paddingVertical: 10,
    },
  });
