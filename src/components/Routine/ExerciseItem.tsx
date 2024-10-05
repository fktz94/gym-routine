import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditWeightModal from "./EditWeightModal";
import ThemedButton from "../Buttons/ThemedButton";
import CustomSelectDropdown from "../CustomSelectDropdown";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import useModal from "@/src/hooks/useModal";
import { Theme } from "@/src/types/Contexts";
import { Exercise } from "@/src/types/Routines";
import { cloneDeep } from "lodash";
import { Strings } from "@/src/constants/Strings";

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

export const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const { theme } = useThemeContext();

  const { name, sets, weightsAndRepetitions, current } = exercise;

  const [selectedDropdownItem, setSelectedDropdownItem] = useState(current);
  const handleDropdownItem = (i: number) => setSelectedDropdownItem(i);

  const repetitions = weightsAndRepetitions.map(({ qty }) => qty || "N/A");
  const reversedWeightAndRepetitions = cloneDeep(weightsAndRepetitions).reverse();
  const reversedIndex = weightsAndRepetitions.length - current;
  const firstPart = reversedWeightAndRepetitions
    .slice(reversedIndex)
    .find(({ weight }) => weight?.value);
  const secondPart = reversedWeightAndRepetitions
    .slice(0, reversedIndex - 1)
    .find(({ weight }) => weight?.value);
  const prevWeight = firstPart || secondPart;

  const currentWeight = weightsAndRepetitions[current].weight?.value;
  const weight = weightsAndRepetitions[selectedDropdownItem]?.weight?.value;
  const hasMultipleRepetitions = weightsAndRepetitions.length > 1;
  const isCurrent = selectedDropdownItem === current;
  const exerciseWithoutWeight = weight === Strings.NoWeight;

  const styles = exerciseItemStyles(theme, false, exerciseWithoutWeight);

  const repetitionsSelect = (data: string[]) => {
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

  const { closeModal, isModalOpen: isEditing, openModal } = useModal();

  return (
    <>
      {isEditing && (
        <EditWeightModal
          isCurrent={isCurrent}
          selectedSerie={selectedDropdownItem}
          closeModal={closeModal}
          exerciseData={weightsAndRepetitions[selectedDropdownItem]}
          exerciseName={name}
          hasMultipleRepetitions={hasMultipleRepetitions}
        />
      )}
      <View style={styles.container}>
        <Text style={styles.inputContainer}>{name}</Text>
        <Text style={[styles.inputContainer, styles.sets]}>{sets}</Text>
        <View style={styles.inputContainer}>
          {!currentWeight && <Text style={styles.prevText}>Add today's weight!</Text>}
          {hasMultipleRepetitions && (
            <>
              {prevWeight?.weight?.value && (
                <Text style={styles.prevText}>
                  Prev: {prevWeight.qty}r - {prevWeight.weight.value}
                </Text>
              )}
              {currentWeight && (
                <Text style={styles.prevText}>
                  Today: {weightsAndRepetitions[current].qty}r - {currentWeight}
                </Text>
              )}
            </>
          )}

          <View style={styles.weightAndRepetitionsView}>
            {repetitionsSelect(repetitions)}
            {!exerciseWithoutWeight && (
              <TextInput
                style={styles.weightText}
                defaultValue={weight}
                multiline
                scrollEnabled
                readOnly
              />
            )}
          </View>

          <View style={styles.themedButtonContainer}>
            <ThemedButton externalButtonStyles={styles.editButtonView} onPress={openModal}>
              <Ionicons color={Colors[theme].background} name="pencil" />
            </ThemedButton>
          </View>
        </View>
      </View>
    </>
  );
};

const exerciseItemStyles = (
  theme: Theme,
  isTitle: boolean,
  exerciseWithoutWeight: boolean = false
) =>
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
    },
    sets: { fontSize: 16 },
    weightAndRepetitionsView: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      minHeight: 60,
      width: exerciseWithoutWeight ? "66%" : undefined,
      margin: exerciseWithoutWeight ? "auto" : undefined,
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
