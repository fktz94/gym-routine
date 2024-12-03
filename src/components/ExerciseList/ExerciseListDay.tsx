import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ExerciseListItem from "./ExerciseListItem";
import ExerciseListTitle from "./ExerciseListTitle";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useModal from "@/src/hooks/useModal";
import { ExerciseListDayProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";
import AnimatedDayCard from "./AnimatedDayCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const ExerciseListDay = ({
  dataToMap,
  dayHasToBeShown = false,
  dayIndex = 0,
  handleDeleteExercise,
  handleEditExercise,
  handleAddExercise,
  isWarmUp = false,
}: ExerciseListDayProps) => {
  const { theme } = useThemeContext();
  const styles = exerciseListDayStyles(theme);

  const { closeModal, isModalOpen: isCreating, openModal } = useModal();

  const currentExercises = () =>
    dataToMap.map((exercise, i) => {
      const isLastElement = i === dataToMap.length - 1;
      return (
        <ExerciseListItem
          dayIndex={dayIndex}
          exerciseData={exercise}
          exerciseIndex={i}
          handleDeleteExercise={handleDeleteExercise}
          handleEditExercise={handleEditExercise}
          key={exercise.name} // find another way to make a proper key without making a mess with the delete animation
          isLastElement={isLastElement}
        />
      );
    });

  return (
    <AnimatedDayCard
      dayHasToBeShown={dayHasToBeShown}
      title={isWarmUp ? "WARM UP" : `DAY ${dayIndex + 1}`}
    >
      {isCreating && (
        <CreateOrEditExerciseModal
          closeModal={closeModal}
          dayIndex={dayIndex}
          handleOnAccept={handleAddExercise}
          isWarmUp={isWarmUp}
        />
      )}
      <View style={styles.exercises}>
        {dataToMap.length > 0 && (
          <View>
            <ExerciseListTitle />
            {currentExercises()}
          </View>
        )}
        <TouchableOpacity
          onPress={openModal}
          style={styles.addExerciseIconContainer}
        >
          <Ionicons
            name="add-circle-outline"
            size={40}
            style={styles.addExerciseIcon}
          />
        </TouchableOpacity>
      </View>
    </AnimatedDayCard>
  );
};

export default ExerciseListDay;

const exerciseListDayStyles = (theme: Theme) =>
  StyleSheet.create({
    exercises: { backgroundColor: Colors[theme].text, gap: 15, padding: 20 },
    addExerciseIconContainer: { flexDirection: "row", width: "100%" },
    addExerciseIcon: { margin: "auto" },
  });
