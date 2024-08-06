import { StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { RepetitionsButtonProps } from "../types/Components";
import { useState } from "react";
import ThemedButton from "./ThemedButton";
import EditExerciseModal from "./EditExerciseModal";

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

  const repetitions = weightsAndRepetitions.map((el) => el.qty);

  const prevWeight = weightsAndRepetitions.at(current - 1);
  const currentWeight = weightsAndRepetitions[current].weight;

  const [isEditingExercise, setIsEditingExercise] = useState(false);

  const [selectedDropdownItem, setSelectedDropdownItem] = useState(current);
  const weight = weightsAndRepetitions[selectedDropdownItem].weight;

  const handleDropdownItem = (i: number) => setSelectedDropdownItem(i);

  const openEditModal = () => setIsEditingExercise(true);
  const closeEditModal = () => setIsEditingExercise(false);

  const repetitionsButton = ({
    selectedItem,
    isUnique = false,
    isOpened,
  }: RepetitionsButtonProps) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>{selectedItem}</Text>
        {!isUnique && (
          <Ionicons
            style={styles.dropdownButtonArrowStyle}
            name={isOpened ? "chevron-up" : "chevron-down"}
          />
        )}
      </View>
    );
  };

  const repetitionsSelect = (data: (string | number)[]) => {
    const mappedData = data.map((rep, i) => ({ rep, i }));

    return data.length > 1 ? (
      <SelectDropdown
        data={mappedData}
        defaultValue={mappedData[current]}
        onSelect={(el, i) => handleDropdownItem(i)}
        renderButton={(selectedItem, isOpened) =>
          repetitionsButton({ selectedItem: selectedItem?.rep, isOpened })
        }
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {
                backgroundColor: theme === "light" ? Colors[theme].primary : Colors[theme].text,
              }),
            }}
          >
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                ...(isSelected && {
                  color: theme === "light" ? Colors[theme].background : Colors[theme].primary,
                }),
                ...(current === index && { color: "red" }),
              }}
            >
              {item?.rep}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    ) : (
      repetitionsButton({ selectedItem: data[0], isUnique: true })
    );
  };

  return (
    <View style={styles.container}>
      {isEditingExercise && (
        <EditExerciseModal
          isCurrent={selectedDropdownItem === current}
          index={selectedDropdownItem}
          closeModal={closeEditModal}
          exerciseData={weightsAndRepetitions[selectedDropdownItem]}
        />
      )}
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
          <ThemedButton
            externalButtonStyles={styles.finishedButtonView}
            externalTextStyles={styles.finishedButtonText}
          >
            Done!
          </ThemedButton>
          <ThemedButton externalButtonStyles={styles.editButtonView} onPress={openEditModal}>
            <Ionicons color={Colors[theme].background} name="pencil" />
          </ThemedButton>
        </View>
      </View>
    </View>
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
      fontWeight: isTitle ? "bold" : undefined,
      minHeight: 60,
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
    themedButtonContainer: { flexDirection: "row", paddingTop: 6, paddingBottom: 12, gap: 2 },
    finishedButtonView: {
      paddingVertical: 6,
      backgroundColor: theme === "light" ? Colors.light.secondary : Colors.light.primary,
      flex: 1,
      flexGrow: 3,
    },
    finishedButtonText: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
    editButtonView: {
      backgroundColor: Colors[theme].text,
      paddingHorizontal: 2,
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
    },
    editButtonIcon: {},
    //
    dropdownButtonStyle: {
      flex: 2,
      height: "75%",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: "500",
      color: Colors[theme].text,
    },
    dropdownButtonArrowStyle: {
      color: Colors[theme].text,
    },
    dropdownMenuStyle: {
      backgroundColor: Colors[theme].secondary,
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: 12,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      color: Colors[theme].text,
    },
  });

// {
//   "name": "Remo al mentón",
//   "sets": 3,
//   "current": 0,
//   "weightsAndRepetitions": [{ "qty": 10, "weight": 10 }]
// },
// {
//   "name": "Sillón de cuádriceps",
//   "sets": 3,
//   "current": 0,
//   "weightsAndRepetitions": [{ "qty": 14, "weight": 45 }]
// },
// {
//   "name": "Frog pump c/ banda circular",
//   "sets": 3,
//   "current": 1,
//   "weightsAndRepetitions": [
//     { "qty": 12, "weight": 30 },
//     { "qty": 15, "weight": 20 }
//   ]
// },
// {
//   "name": "Vuelos laterales completos",
//   "sets": 3,
//   "current": 0,
//   "weightsAndRepetitions": [{ "qty": 10, "weight": 5 }]
// },
// {
//   "name": "Plancha lateral dinámica",
//   "sets": 3,
//   "current": 0,
//   "weightsAndRepetitions": [{ "qty": "10\"", "weight": "N/A" }]
// },
// {
//   "name": "Sit up + rotación",
//   "sets": 3,
//   "current": 0,
//   "weightsAndRepetitions": [{ "qty": "8 c/l", "weight": "N/A" }]
// }
