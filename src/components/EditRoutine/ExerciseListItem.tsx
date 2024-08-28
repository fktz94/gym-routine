import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { ExerciseItemProps } from "@/src/types/Components";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import { Theme } from "@/src/types/Contexts";
import DeleteAnimation from "../Animations/DeleteAnimation";
import useDeleteAnimation from "@/src/hooks/useDeleteAnimation";

export const EditExerciseItem = ({
  exerciseData,
  style,
  dayIndex,
  exerciseIndex,
}: ExerciseItemProps) => {
  // create custom hook for this logic
  const { theme } = useThemeContext();
  const styles = editExerciseItemStyles(theme);

  const { name, sets, weightsAndRepetitions } = exerciseData;
  const exerciseRepetitions = weightsAndRepetitions.map((el) => el.qty).join(" / ");

  const [isEditing, setIsEditing] = useState(false);
  const openEditExerciseModal = () => setIsEditing(true);
  const closeEditExerciseModal = () => setIsEditing(false);

  const { handleDeleteOneExercise, handleEditOneExercise, selectedRoutine } =
    useEditRoutineContext();

  const selectedExercise = selectedRoutine.data[dayIndex].find((el) => el.name === name);

  if (!selectedExercise) return null;

  const { panResponder, translateX } = useDeleteAnimation();

  const deleteExercise = () => {
    if ((dayIndex !== 0 && !dayIndex) || (exerciseIndex !== 0 && !exerciseIndex)) return;
    handleDeleteOneExercise({ dayIndex, exerciseIndex });
  };

  return (
    <>
      {isEditing && (
        <CreateOrEditExerciseModal
          closeModal={closeEditExerciseModal}
          dayIndex={dayIndex}
          handleOnAccept={handleEditOneExercise} // chech how to solve this type error
          exerciseToEdit={selectedExercise}
        />
      )}
      <DeleteAnimation
        onDelete={deleteExercise}
        panResponder={panResponder}
        translateX={translateX}
        containerViewStyles={{ ...styles.exerciseItem, ...style }}
      >
        <TouchableOpacity style={{ flex: 1, flexDirection: "row" }} onPress={openEditExerciseModal}>
          <Text style={[styles.exerciseItemText, styles.exerciseName, styles.exerciseElement]}>
            {name}
          </Text>
          <Text style={[styles.exerciseItemText, styles.exerciseSets, styles.exerciseElement]}>
            {sets}
          </Text>
          <Text
            style={[styles.exerciseItemText, styles.exerciseRepetitions, styles.exerciseElement]}
          >
            {exerciseRepetitions}
          </Text>
        </TouchableOpacity>
      </DeleteAnimation>
    </>
  );
};

export const EditExerciseItemTitle = () => {
  const { theme } = useThemeContext();
  const styles = editExerciseItemStyles(theme);
  return (
    <View style={styles.exerciseItem}>
      <Text style={[styles.exerciseItemText, styles.exerciseName, styles.exerciseTitle]}>
        Exercise
      </Text>
      <Text style={[styles.exerciseItemText, styles.exerciseSets, styles.exerciseTitle]}>Sets</Text>
      <Text style={[styles.exerciseItemText, styles.exerciseRepetitions, styles.exerciseTitle]}>
        Repetitions
      </Text>
    </View>
  );
};

const editExerciseItemStyles = (theme: Theme) =>
  StyleSheet.create({
    exerciseItem: {
      flexDirection: "row",
      borderWidth: 1,
      borderBottomWidth: 0,
      overflow: "hidden",
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
