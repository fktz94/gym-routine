import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import ExerciseListItem from "./ExerciseListItem";
import ExerciseListTitle from "./ExerciseListTitle";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useExerciseListDay from "@/src/hooks/useExerciseListDay";
import useModal from "@/src/hooks/useModal";
import { ExerciseListDayProps } from "@/src/types/Components";
import { Theme } from "@/src/types/Contexts";

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
  const { animatedStyle, isShown, onLayout, showDayDetails } = useExerciseListDay({
    dayHasToBeShown,
  });

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
    <View style={styles.dayContainer}>
      <Pressable style={styles.dayButton} onPress={showDayDetails}>
        <Text style={styles.dayButtonText}>{isWarmUp ? "WARM UP" : `DAY ${dayIndex + 1}`}</Text>
        <Ionicons name={isShown ? "chevron-up" : "chevron-down"} />
      </Pressable>
      <Animated.View style={animatedStyle}>
        <View onLayout={onLayout} style={{ position: "absolute" }}>
          {isCreating && (
            <CreateOrEditExerciseModal
              closeModal={closeModal}
              dayIndex={dayIndex}
              handleOnAccept={handleAddExercise}
            />
          )}
          <View style={styles.exercises}>
            {dataToMap.length > 0 && (
              <View>
                <ExerciseListTitle />
                {currentExercises()}
              </View>
            )}
            <TouchableOpacity onPress={openModal} style={styles.addExerciseIconContainer}>
              <Ionicons name="add-circle-outline" size={40} style={styles.addExerciseIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default ExerciseListDay;

const exerciseListDayStyles = (theme: Theme) =>
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
    addExerciseIconContainer: { flexDirection: "row", width: "100%" },
    addExerciseIcon: { margin: "auto" },
  });
