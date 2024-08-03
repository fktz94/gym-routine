import { StyleSheet, Text, View } from "react-native";
import React from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";

export const ExerciseItemTitle = () => {
  const { theme } = useThemeContext();
  const styles = exerciseItemStyles(theme, true);

  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>Exercise</Text>
      <Text style={styles.inputContainer}>Sets</Text>
      <Text style={styles.inputContainer}>Weights and repetitions</Text>
    </View>
  );
};

export const ExerciseItem = ({ name, sets, weightsAndRepetitions }: Exercise) => {
  const { theme } = useThemeContext();
  const styles = exerciseItemStyles(theme, false);

  console.log(weightsAndRepetitions);

  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>{name}</Text>
      <Text style={styles.inputContainer}>{sets}</Text>
      <View style={[styles.inputContainer, styles.weightAndRepetitionsView]}></View>
    </View>
  );
};

const exerciseItemStyles = (theme: Theme, isTitle: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      // gap: 4,
    },
    inputContainer: {
      flex: 1,
      textAlign: "center",
      textAlignVertical: "center",
      color: Colors[theme].text,
      borderWidth: 1,
      paddingVertical: 4,
      height: 60,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
    weightAndRepetitionsView: {},
  });
