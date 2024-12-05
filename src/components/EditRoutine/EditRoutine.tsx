import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ConfirmEditRoutineModal from "./ConfirmEditRoutineModal";
import ThemedButton from "../Buttons/ThemedButton";
import ProcceedQuittingModal from "../ProcceedQuittingModal";
import ExerciseListDay from "../ExerciseList/ExerciseListDay";
import { Colors } from "@/src/constants/Colors";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useEditRoutineChanges from "@/src/hooks/useEditRoutineChanges";
import useModal from "@/src/hooks/useModal";
import { Theme } from "@/src/types/Contexts";
import CustomLoader from "../CustomLoader";

const EditRoutine = () => {
  const { theme } = useThemeContext();
  const styles = editRoutineStyles(theme);

  const [isChangingName, setIsChangingName] = useState(false);

  const { closeModal, isModalOpen: isCreating, openModal } = useModal();
  const { showQuitModal, toggleHasUpdatedValues } = useHeaderContext();
  const {
    handleAddOneExercise,
    handleDeleteOneExercise,
    handleEditOneExercise,
    handleName,
    handleSetToCurrent,
    isCurrent,
    originalRoutine,
    selectedDay,
    selectedRoutine: { data, name, warmUp },
    toCurrent,
    handleAddOneWarmUpExercise,
    handleEditOneWarmUpExercise,
    handleDeleteOneWarmUpExercise,
    toggleWarmUp,
    addWarmUp,
    isDispatching,
  } = useEditRoutineContext();

  if (!originalRoutine) return null;

  const { toggleChangingName, handleSaveChanges, isButtonDisabled } =
    useEditRoutineChanges({
      data,
      handleName,
      isChangingName,
      isCurrent,
      name,
      openModal,
      originalRoutine,
      setIsChangingName,
      toCurrent,
      warmUp,
    });

  const hasPrevWarmUp = originalRoutine.warmUp.length > 0;
  const hasWarmUp = hasPrevWarmUp || addWarmUp;

  const renderDays = () =>
    data.map((_, i) => (
      <ExerciseListDay
        dataToMap={data[i]}
        dayHasToBeShown={selectedDay === i.toString()}
        dayIndex={i}
        handleAddExercise={handleAddOneExercise}
        handleDeleteExercise={handleDeleteOneExercise}
        handleEditExercise={handleEditOneExercise}
        key={i}
      />
    ));

  useEffect(() => {
    toggleHasUpdatedValues(!isButtonDisabled);
    return () => {
      toggleHasUpdatedValues(false);
    };
  }, [isButtonDisabled]);

  return (
    <>
      {showQuitModal && <ProcceedQuittingModal />}
      {isCreating && <ConfirmEditRoutineModal closeModal={closeModal} />}
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Let's update this routine!</Text>
        </View>
        {isDispatching ? (
          <View style={{ flex: 1 }}>
            <CustomLoader style={{ marginTop: 100 }} />
          </View>
        ) : (
          <>
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
                <TextInput
                  value={name}
                  onChangeText={handleName}
                  style={styles.textInput}
                />
              </View>
            )}
            {!hasPrevWarmUp && (
              <View style={[styles.container, styles.checkboxContainer]}>
                <Text style={styles.baseText}>Add warm up</Text>
                <BouncyCheckbox
                  size={18}
                  fillColor={Colors.light.primary}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={toggleWarmUp}
                  isChecked={addWarmUp}
                />
              </View>
            )}
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {hasWarmUp && (
                <ExerciseListDay
                  dataToMap={warmUp}
                  handleAddExercise={handleAddOneWarmUpExercise}
                  handleDeleteExercise={handleDeleteOneWarmUpExercise}
                  handleEditExercise={handleEditOneWarmUpExercise}
                  isWarmUp
                />
              )}
              {renderDays()}
            </ScrollView>
            <ThemedButton
              externalButtonStyles={styles.modifyRoutineBtnContainer}
              externalTextStyles={styles.modifyRoutineBtnText}
              onPress={handleSaveChanges}
              disabled={isButtonDisabled}
            >
              Save changes!
            </ThemedButton>
          </>
        )}
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
      backgroundColor: Colors[theme].background,
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
    modifyRoutineBtnContainer: {
      width: "40%",
      margin: "auto",
      marginTop: 15,
      marginBottom: 30,
    },
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
