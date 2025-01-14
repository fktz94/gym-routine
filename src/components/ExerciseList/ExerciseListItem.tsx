import { StyleSheet, Text } from "react-native";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import DeleteAnimation from "../DeleteAnimatedButton/DeleteAnimation";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useDeleteAnimation from "@/src/hooks/useDeleteAnimation";
import useModal from "@/src/hooks/useModal";
import { ExerciseListItemProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import { TouchableOpacity } from "react-native-gesture-handler";

const ExerciseListItem = ({
  dayIndex = 0,
  exerciseData,
  exerciseIndex,
  handleDeleteExercise,
  handleEditExercise,
  isLastElement,
  style,
}: ExerciseListItemProps) => {
  const { theme } = useSettingsContext();
  const styles = exerciseListItemStyles(theme);

  const { name, sets, weightsAndRepetitions } = exerciseData;
  const exerciseRepetitions = weightsAndRepetitions
    .map((el) => el.qty)
    .join(" / ");

  const { closeModal, isModalOpen: isEditing, openModal } = useModal();

  const deleteExercise = () => {
    if (
      (dayIndex !== 0 && !dayIndex) ||
      (exerciseIndex !== 0 && !exerciseIndex)
    )
      return;
    handleDeleteExercise({ dayIndex, exerciseIndex });
  };

  const { isLeftSide, position } = useDeleteAnimation();

  return (
    <>
      {isEditing && (
        <CreateOrEditExerciseModal
          closeModal={closeModal}
          dayIndex={dayIndex}
          exerciseToEdit={exerciseData}
          handleOnAccept={handleEditExercise}
        />
      )}
      <DeleteAnimation
        isLeftSide={isLeftSide}
        position={position}
        containerViewStyles={{
          ...styles.exerciseItem,
          ...style,
          ...(isLastElement && { borderBottomWidth: 1 }),
        }}
        animatedViewStyles={{ flex: 1, flexDirection: "row" }}
        onDelete={deleteExercise}
      >
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "row" }}
          onPress={openModal}
        >
          <Text
            style={[
              styles.exerciseItemText,
              styles.exerciseName,
              styles.exerciseElement,
            ]}
          >
            {name}
          </Text>
          <Text
            style={[
              styles.exerciseItemText,
              styles.exerciseSets,
              styles.exerciseElement,
            ]}
          >
            {sets}
          </Text>
          <Text
            style={[
              styles.exerciseItemText,
              styles.exerciseRepetitions,
              styles.exerciseElement,
            ]}
          >
            {exerciseRepetitions}
          </Text>
        </TouchableOpacity>
      </DeleteAnimation>
    </>
  );
};

export default ExerciseListItem;

const exerciseListItemStyles = (theme: Theme) =>
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
    exerciseElement: {
      backgroundColor: Colors[theme].secondary,
      color: Colors[theme].primary,
      textAlignVertical: "center",
      paddingVertical: 10,
    },
  });
