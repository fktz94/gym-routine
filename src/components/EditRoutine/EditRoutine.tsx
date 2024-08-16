import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import EachDayItem from "./EachDayItem";
import { Colors } from "@/src/constants/Colors";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import ThemedButton from "../ThemedButton";
import { isEqual } from "lodash";

const EditRoutine = () => {
  const { theme } = useThemeContext();
  const styles = editRoutineStyles(theme);

  const {
    selectedRoutine: { data },
    originalRoutine: { data: originalData },
  } = useEditRoutineContext();

  const hasChanges = !isEqual(data, originalData);

  const handleSaveChanges = () => {
    if (!hasChanges) return;
  };

  const renderDays = () => data.map((_, i) => <EachDayItem key={i} dayIndex={i} />);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Let's update this routine!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>{renderDays()}</ScrollView>
      <ThemedButton
        externalButtonStyles={styles.modifyRoutineBtnContainer}
        externalTextStyles={styles.modifyRoutineBtnText}
        onPress={handleSaveChanges}
        disabled={!hasChanges}
      >
        Save changes!
      </ThemedButton>
    </View>
  );
};

export default EditRoutine;

const editRoutineStyles = (theme: Theme) =>
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
    modifyRoutineBtnContainer: { width: "40%", margin: "auto", marginTop: 15, marginBottom: 30 },
    modifyRoutineBtnText: {
      fontSize: 14,
      letterSpacing: 2,
      fontWeight: "bold",
      textAlign: "center",
      paddingVertical: 6,
    },
  });
