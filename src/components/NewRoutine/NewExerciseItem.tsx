import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const NewExerciseItem = ({ day }: { day: number }) => {
  const { theme } = useThemeContext();
  const styles = secondStepStyles(theme);
  const [isShown, setIsShown] = useState(false);

  const showDayDetails = () => setIsShown(!isShown);

  return (
    <View style={styles.dayContainer}>
      <Pressable style={styles.dayButton} onPress={showDayDetails}>
        <Text style={styles.dayButtonText}>DAY {day}</Text>
        <Ionicons name={isShown ? "chevron-up" : "chevron-down"} />
      </Pressable>
      {isShown && (
        <View style={styles.exercises}>
          <View style={styles.exerciseItem}>
            <TextInput style={styles.exercisesTextInput} />
            <View style={styles.exercisesDetailsContainer}></View>
          </View>
        </View>
      )}
    </View>
  );
};

export default NewExerciseItem;

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
    exerciseItem: { flexDirection: "row", borderWidth: 1 },
    exercisesTextInput: { color: Colors[theme].modalBackground },
    exercisesDetailsContainer: {},
  });
