import { StyleSheet, Text, View, PanResponder, TouchableOpacity, Animated } from "react-native";
import { useRef, useState } from "react";
import { ExerciseItemProps } from "@/src/types/Components";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import { Theme } from "@/src/types/Contexts";

export const NewExerciseItem = ({
  exerciseData,
  style,
  dayIndex,
  exerciseIndex,
}: ExerciseItemProps) => {
  const { theme } = useThemeContext();
  const styles = newExerciseItemStyles(theme);

  const { name, sets, weightsAndRepetitions } = exerciseData;
  const exerciseRepetitions = weightsAndRepetitions.map((el) => el.qty).join(" / ");

  const [isEditing, setIsEditing] = useState(false);
  const openEditExerciseModal = () => setIsEditing(true);
  const closeEditExerciseModal = () => setIsEditing(false);

  const { handleDeleteOneExercise, handleEditOneExercise } = useNewRoutineContext();

  const deleteExercise = () => {
    if ((dayIndex !== 0 && !dayIndex) || (exerciseIndex !== 0 && !exerciseIndex)) return;
    handleDeleteOneExercise({ dayIndex, exerciseIndex });
  };

  // create custom hook for this
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0 && gestureState.dx > -70) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -30) {
          Animated.spring(translateX, {
            toValue: -70,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const deleteButton = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={deleteExercise}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {isEditing && (
        <CreateOrEditExerciseModal
          closeModal={closeEditExerciseModal}
          dayIndex={dayIndex}
          exerciseToEdit={exerciseData}
          handleOnAccept={handleEditOneExercise} // check how to solve this type error
        />
      )}
      <View style={[styles.exerciseItem, style]} {...panResponder.panHandlers}>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: "row",
            transform: [{ translateX }],
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={openEditExerciseModal}
          >
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
          {deleteButton()}
        </Animated.View>
      </View>
    </>
  );
};

export const NewExerciseItemTitle = () => {
  const { theme } = useThemeContext();
  const styles = newExerciseItemStyles(theme);
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

const newExerciseItemStyles = (theme: Theme) =>
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
    deleteButton: {
      backgroundColor: Colors.cancelBackground,
      justifyContent: "center",
      position: "absolute",
      width: 70,
      height: "100%",
      right: -70,
    },
    deleteButtonText: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
      color: Colors.light.background,
    },
  });
