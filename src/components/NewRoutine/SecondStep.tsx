import { ScrollView, StyleSheet, Text, View } from "react-native";
import ExerciseListDay from "../ExerciseList/ExerciseListDay";
import { Colors } from "@/src/constants/Colors";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

const SecondStep = () => {
  const { theme } = useSettingsContext();
  const styles = secondStepStyles(theme);
  const { t } = useTranslation();

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
        <Text style={styles.title}>{t("fillingDays")}</Text>
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
      backgroundColor: Colors[theme].background,
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
