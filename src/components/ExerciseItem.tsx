import { StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ThemedButton from "./ThemedButton";
import EditExerciseModal from "./EditExerciseModal";
import CustomSelectDropdown from "./CustomSelectDropdown";
import { Exercise } from "../types/Routines";

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

export const ExerciseItem = ({ name, sets, weightsAndRepetitions, current }: Exercise) => {
  const { theme } = useThemeContext();
  const styles = exerciseItemStyles(theme, false);

  const repetitions = weightsAndRepetitions.map((el) => el.qty || "N/A");

  const prevWeight = weightsAndRepetitions.at(current - 1);
  const currentWeight = weightsAndRepetitions[current].weight;

  const [isEditingExercise, setIsEditingExercise] = useState(false);

  const [selectedDropdownItem, setSelectedDropdownItem] = useState(current);
  const weight = weightsAndRepetitions[selectedDropdownItem].weight;

  const handleDropdownItem = (i: number) => setSelectedDropdownItem(i);

  const openEditModal = () => setIsEditingExercise(true);
  const closeEditModal = () => setIsEditingExercise(false);

  const repetitionsSelect = (data: (string | number)[]) => {
    if (data.length === 0) return null;

    const mappedData = data.map((rep, i) => ({ rep, i }));

    return data.length > 1 ? (
      <CustomSelectDropdown
        data={mappedData}
        defaultValue={mappedData[current]}
        onSelect={(_, i) => handleDropdownItem(i)}
        isExerciseItem
        current={current}
        btnStyle={styles.dropdownButtonStyle}
        btnTextStyle={styles.dropdownButtonTxtStyle}
        itemTextStyle={styles.dropdownItemTxtStyle}
      />
    ) : (
      <View style={styles.uniqueButtonStyle}>
        <Text style={styles.uniqueButtonTxtStyle}>{data[0]}</Text>
      </View>
    );
  };

  return (
    <>
      {isEditingExercise && (
        <EditExerciseModal
          isCurrent={selectedDropdownItem === current}
          selectedSerie={selectedDropdownItem}
          closeModal={closeEditModal}
          exerciseData={weightsAndRepetitions[selectedDropdownItem]}
          exerciseName={name}
        />
      )}
      <View style={styles.container}>
        <Text style={styles.inputContainer}>{name}</Text>
        <Text style={[styles.inputContainer, styles.sets]}>{sets}</Text>
        <View style={styles.inputContainer}>
          {!currentWeight ? (
            <Text style={styles.prevText}>Add today's weight!</Text>
          ) : (
            weightsAndRepetitions.length > 1 && (
              <>
                <Text style={styles.prevText}>
                  Today: {weightsAndRepetitions[current].qty}r -{currentWeight}
                  {typeof currentWeight === "number" && " kg"}
                </Text>
                {prevWeight?.weight && (
                  <Text style={styles.prevText}>
                    Prev: {prevWeight.qty}r - {prevWeight.weight}
                    {typeof prevWeight.weight === "number" && " kg"}
                  </Text>
                )}
              </>
            )
          )}

          <View style={styles.weightAndRepetitionsView}>
            {repetitionsSelect(repetitions)}
            <TextInput
              style={styles.weightText}
              defaultValue={
                typeof weight === "number" ? `${weight?.toString()} kg` : weight ?? undefined
              }
              multiline
              scrollEnabled
              readOnly
            />
          </View>

          <View style={styles.themedButtonContainer}>
            <ThemedButton externalButtonStyles={styles.editButtonView} onPress={openEditModal}>
              <Ionicons color={Colors[theme].background} name="pencil" />
            </ThemedButton>
          </View>
        </View>
      </View>
    </>
  );
};

const exerciseItemStyles = (theme: Theme, isTitle: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderTopLeftRadius: isTitle ? 6 : undefined,
      borderTopRightRadius: isTitle ? 6 : undefined,
    },
    inputContainer: {
      flex: 1,
      flexGrow: 1,
      textAlign: "center",
      textAlignVertical: "center",
      color: isTitle ? Colors[theme].background : Colors[theme].text,
      backgroundColor: isTitle ? Colors[theme].text : Colors[theme].background,
      borderBottomWidth: 1,
      borderBottomColor: Colors[theme].text,
      fontWeight: isTitle ? "bold" : undefined,
      minHeight: 60,
      overlayColor: "red",
    },
    sets: { fontSize: 16 },
    weightAndRepetitionsView: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      minHeight: 60,
    },
    prevText: {
      fontSize: 11,
      fontWeight: "bold",
      margin: "auto",
      paddingTop: 6,
      color: Colors[theme].text,
    },
    weightText: {
      flex: 3,
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: 1,
      fontSize: 16,
      color: Colors[theme].text,
      height: "100%",
    },
    themedButtonContainer: {
      flexDirection: "row",
      paddingTop: 6,
      paddingBottom: 12,
      justifyContent: "flex-end",
    },
    editButtonView: {
      backgroundColor: Colors[theme].text,
      paddingHorizontal: 2,
      flex: 1,
      flexGrow: 0.35,
      marginRight: 10,
      alignItems: "center",
    },
    editButtonIcon: {},
    //
    uniqueButtonStyle: {
      flex: 2,
      height: "75%",
      width: "30%",
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    uniqueButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: "500",
      color: Colors[theme].text,
      textAlign: "center",
    },
    dropdownButtonStyle: {
      flex: 2,
      height: "75%",
      paddingVertical: 0,
    },
    dropdownButtonTxtStyle: {
      fontSize: 16,
      textAlign: "center",
    },
    dropdownItemTxtStyle: {
      fontSize: 16,
    },
  });
