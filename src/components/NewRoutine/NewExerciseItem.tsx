import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DeleteAnimation from "../Animations/DeleteAnimation";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useDeleteAnimation from "@/src/hooks/useDeleteAnimation";
import useModal from "@/src/hooks/useModal";
import { ExerciseItemProps } from "@/src/types/Components";
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

  const { closeModal, isModalOpen: isEditing, openModal } = useModal();

  const { handleDeleteOneExercise, handleEditOneExercise } = useNewRoutineContext();

  const deleteExercise = () => {
    if ((dayIndex !== 0 && !dayIndex) || (exerciseIndex !== 0 && !exerciseIndex)) return;
    handleDeleteOneExercise({ dayIndex, exerciseIndex });
  };

  const { panResponder, translateX } = useDeleteAnimation();

  return (
    <>
      {isEditing && (
        <CreateOrEditExerciseModal
          closeModal={closeModal}
          dayIndex={dayIndex}
          exerciseToEdit={exerciseData}
          handleOnAccept={handleEditOneExercise} // check how to solve this type error
        />
      )}

      <DeleteAnimation
        panResponder={panResponder}
        translateX={translateX}
        containerViewStyles={{ ...styles.exerciseItem, ...style }}
        animatedViewStyles={{ flex: 1, flexDirection: "row" }}
        onDelete={deleteExercise}
      >
        <TouchableOpacity style={{ flex: 1, flexDirection: "row" }} onPress={openModal}>
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
  });
