import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import { EditExerciseItem, EditExerciseItemTitle } from "./ExerciseListItem";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";

const EachDayItem = ({ dayIndex }: { dayIndex: number }) => {
  const { theme } = useThemeContext();
  const styles = secondStepStyles(theme);

  const [isCreating, setIsCreating] = useState(false);
  const startCreatingNewExercise = () => setIsCreating(true);
  const cancelCreatingNewExercise = () => {
    setIsCreating(false);
  };

  const { selectedRoutine, selectedDay, handleAddOneExercise } = useEditRoutineContext();

  const { data } = selectedRoutine;

  const [isShown, setIsShown] = useState(selectedDay === dayIndex.toString());

  const showDayDetails = () => setIsShown(!isShown);

  const [height, setHeight] = useState(0);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutHeight = layout.height;

    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = isShown ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
      overflow: "hidden",
    };
  });

  const currentExercises = () =>
    data[dayIndex].map((exercise, i) => {
      const isLastElement = i === data[dayIndex].length - 1;
      return (
        <EditExerciseItem
          exerciseData={exercise}
          key={exercise.name} // find another way to make a proper key without making a mess with the delete animation
          exerciseIndex={i}
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

      <Animated.View style={animatedStyle}>
        <View onLayout={onLayout} style={{ position: "absolute" }}>
          {isCreating && (
            <CreateOrEditExerciseModal
              closeModal={cancelCreatingNewExercise}
              dayIndex={dayIndex}
              handleOnAccept={handleAddOneExercise}
            />
          )}
          <View style={styles.exercises}>
            {data[dayIndex].length > 0 && (
              <View>
                <EditExerciseItemTitle key="title" />
                {currentExercises()}
              </View>
            )}
            <TouchableOpacity
              onPress={startCreatingNewExercise}
              style={styles.addExerciseIconContainer}
            >
              <Ionicons name="add-circle-outline" size={40} style={styles.addExerciseIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default EachDayItem;

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
    addExerciseIconContainer: { flexDirection: "row", width: "100%" },
    addExerciseIcon: { margin: "auto" },
    acceptCancelButtonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      margin: "auto",
      gap: 60,
    },
  });
