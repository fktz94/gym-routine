import { ScrollView, StyleSheet, Text, View } from "react-native";
import ExerciseListDay from "../ExerciseList/ExerciseListDay";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Theme } from "@/src/types/Contexts";

const SecondStep = () => {
  const { theme } = useThemeContext();
  const styles = secondStepStyles(theme);

  const {
    newRoutineState: { data, warmUp },
    handleAddOneExercise,
    handleAddOneWarmUpExercise,
    handleDeleteOneExercise,
    handleDeleteOneWarmUpExercise,
    handleEditOneExercise,
    handleEditOneWarmUpExercise,
    hasWarmUpRoutine,
  } = useNewRoutineContext();

  const renderDays = () =>
    data.map((_, i) => (
      <ExerciseListDay
        key={i}
        dayIndex={i}
        dataToMap={data[i]}
        handleAddExercise={handleAddOneExercise}
        handleDeleteExercise={handleDeleteOneExercise}
        handleEditExercise={handleEditOneExercise}
      />
    ));

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Now, let's start filling each day with its exercises.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <>
          {hasWarmUpRoutine && (
            <ExerciseListDay
              dataToMap={warmUp}
              handleAddExercise={handleAddOneWarmUpExercise}
              isWarmUp
              handleDeleteExercise={handleDeleteOneWarmUpExercise}
              handleEditExercise={handleEditOneWarmUpExercise}
            />
          )}
          {renderDays()}
        </>
      </ScrollView>
    </View>
  );
};

export default SecondStep;

const secondStepStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingTop: 40,
      flex: 1,
      flexGrow: 1,
      gap: 40,
      width: "100%",
    },
    container: {
      gap: 40,
      width: "75%",
      margin: "auto",
    },
    scrollViewContainer: { gap: 40, width: "100%" },
    title: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      fontSize: 20,
    },
    subtitle: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 0.5,
      textAlign: "center",
      marginTop: -20,
    },
  });
