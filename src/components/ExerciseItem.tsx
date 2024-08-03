import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";

const ExerciseItem = ({ name, sets, weightsAndRepetitions }: Exercise) => {
  const { theme } = useThemeContext();
  const styles = exerciseItemStyles(theme);
  console.log(weightsAndRepetitions);

  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>{name}</Text>
      <Text style={styles.inputContainer}>{sets}</Text>
      <View style={styles.inputContainer}></View>
    </View>
  );
};

export default ExerciseItem;

const exerciseItemStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    inputContainer: {
      textAlign: "center",
      flex: 1,
      borderWidth: 1,
    },
  });
