import { StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { RepetitionsButtonProps } from "../types/Components";
import { useState } from "react";
import ThemedButton from "./ThemedButton";

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
  const [weight, setWeight] = useState(weightsAndRepetitions[current].weight);

  const handleWeight = (i: number) => {
    setWeight(weightsAndRepetitions[i].weight);
  };

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
        defaultValue={mappedData[0]} // hardcoded data
        onSelect={(el, i) => handleWeight(i)}
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
      <Text style={styles.inputContainer}>{name}</Text>
      <Text style={[styles.inputContainer, styles.sets]}>{sets}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.weightAndRepetitionsView}>
          {repetitionsSelect(repetitions)}
          <TextInput
            style={styles.weightText}
            defaultValue={weight.toString()}
            multiline
            scrollEnabled
          />
        </View>

        <View style={styles.themedButtonContainer}>
          <ThemedButton
            externalButtonStyles={styles.themedButtonView}
            externalTextStyles={styles.themedButtonText}
          >
            Exercise done!
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
    weightText: {
      flex: 3,
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: 1,
      fontSize: 16,
      color: Colors[theme].text,
      height: "100%",
    },
    themedButtonContainer: { paddingTop: 6, paddingBottom: 12 },
    themedButtonView: { paddingVertical: 6, backgroundColor: Colors.light.secondary },
    themedButtonText: { textAlign: "center", fontSize: 12, fontWeight: "bold" },
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
