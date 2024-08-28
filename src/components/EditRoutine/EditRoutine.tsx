import { Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import EachDayItem from "./EachDayItem";
import { Colors } from "@/src/constants/Colors";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import ThemedButton from "../ThemedButton";
import { isEqual } from "lodash";
import ConfirmEditRoutineModal from "./ConfirmEditRoutineModal";
import { Theme } from "@/src/types/Contexts";

const EditRoutine = () => {
  const { theme } = useThemeContext();
  const styles = editRoutineStyles(theme);
  const [isCreating, setIsCreating] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);

  const {
    selectedRoutine: { data, name },
    originalRoutine,
    isCurrent,
    handleSetToCurrent,
    toCurrent,
    handleName,
  } = useEditRoutineContext();

  if (!originalRoutine) return null;

  const { data: originalData } = originalRoutine;

  const hasChanges = !isEqual(data, originalData) || originalRoutine.name !== name;

  const setToCurrent = !isCurrent && toCurrent;

  const isButtonDisabled = !hasChanges && !setToCurrent;

  const handleSaveChanges = () => {
    if (isButtonDisabled) return;
    setIsCreating(true);
  };

  const closeModal = () => setIsCreating(false);

  const toggleChangingName = () => {
    if (isChangingName) {
      handleName(originalRoutine.name);
    }
    setIsChangingName(!isChangingName);
  };

  const renderDays = () => data.map((_, i) => <EachDayItem key={i} dayIndex={i} />);

  return (
    <>
      {isCreating && <ConfirmEditRoutineModal closeModal={closeModal} />}
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Let's update this routine!</Text>
        </View>
        {!isCurrent && (
          <View style={[styles.container, styles.checkboxContainer]}>
            <Text style={styles.baseText}>Set to current routine</Text>
            <BouncyCheckbox
              size={18}
              fillColor={Colors.light.primary}
              innerIconStyle={{ borderWidth: 2 }}
              onPress={handleSetToCurrent}
              isChecked={toCurrent}
            />
          </View>
        )}
        <View style={[styles.container, styles.checkboxContainer]}>
          <Text style={styles.baseText}>Change name?</Text>
          <BouncyCheckbox
            size={18}
            fillColor={Colors.light.primary}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={toggleChangingName}
            isChecked={isChangingName}
          />
        </View>
        {isChangingName && (
          <View
            style={[
              styles.container,
              styles.checkboxContainer,
              styles.changeNameTextInputContainer,
            ]}
          >
            <TextInput value={name} onChangeText={handleName} style={styles.textInput} />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>{renderDays()}</ScrollView>
        <ThemedButton
          externalButtonStyles={styles.modifyRoutineBtnContainer}
          externalTextStyles={styles.modifyRoutineBtnText}
          onPress={handleSaveChanges}
          disabled={isButtonDisabled}
        >
          Save changes!
        </ThemedButton>
      </View>
    </>
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
    checkboxContainer: { flexDirection: "row" },
    changeNameTextInputContainer: { marginTop: -30 },
    textInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 16,
      borderBottomWidth: 0.9,
      minWidth: "50%",
      maxWidth: "100%",
      margin: "auto",
      padding: 6,
      borderColor: Colors[theme].text,
    },
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
    baseText: {
      color: Colors[theme].text,
      fontSize: 14,
      textAlignVertical: "center",
      flexGrow: 1,
    },
  });
