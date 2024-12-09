import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";

const ExerciseListTitle = (props: { containerStyle?: ViewStyle }) => {
  const { theme } = useSettingsContext();
  const styles = exerciseListTitleStyles(theme);
  const { t } = useTranslation();

  return (
    <View style={[styles.exerciseItem, props?.containerStyle]}>
      <Text
        style={[
          styles.exerciseItemText,
          styles.exerciseName,
          styles.exerciseTitle,
        ]}
      >
        {t("exercise")}
      </Text>
      <Text
        style={[
          styles.exerciseItemText,
          styles.exerciseSets,
          styles.exerciseTitle,
        ]}
      >
        {t("sets")}
      </Text>
      <Text
        style={[
          styles.exerciseItemText,
          styles.exerciseRepetitions,
          styles.exerciseTitle,
        ]}
      >
        {t("repetitions")}
      </Text>
    </View>
  );
};

export default ExerciseListTitle;

const exerciseListTitleStyles = (theme: Theme) =>
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
  });
