import { StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Colors } from "../constants/Colors";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { RepetitionsButtonProps } from "../types/Components";

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

export const ExerciseItem = ({ name, sets, weightsAndRepetitions }: Exercise) => {
  const { theme } = useThemeContext();
  const styles = exerciseItemStyles(theme, false);

  const repetitions = weightsAndRepetitions.map((el) => el.qty);

  const repetitionsButton = ({
    selectedItem,
    isUnique = false,
    isOpened,
  }: RepetitionsButtonProps) => {
    return (
      <View style={styles.dropdownButtonStyle}>
        <Text style={styles.dropdownButtonTxtStyle}>{selectedItem}</Text>
        {!isUnique && <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} />}
      </View>
    );
  };

  const repetitionsSelect = (data: (string | number)[]) => {
    const mappedData = data.map((rep, i) => ({ rep, i }));

    return data.length > 1 ? (
      <SelectDropdown
        data={mappedData}
        defaultValue={mappedData[0]} // hardcoded data
        onSelect={(el, i) => {}}
        renderButton={(selectedItem, isOpened) =>
          repetitionsButton({ selectedItem: selectedItem?.rep, isOpened })
        }
        renderItem={(item, index, isSelected) => (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: Colors[theme].primary }),
            }}
          >
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                ...(isSelected && { color: Colors[theme].background }),
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
      <View style={[styles.inputContainer, styles.weightAndRepetitionsView]}>
        {repetitionsSelect(repetitions)}
        <TextInput style={styles.weightText} defaultValue="50" keyboardType="number-pad" readOnly />
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
      overflow: "hidden",
    },
    inputContainer: {
      flex: 1,
      textAlign: "center",
      textAlignVertical: "center",
      color: isTitle ? Colors[theme].background : Colors[theme].text,
      backgroundColor: isTitle ? Colors[theme].text : Colors[theme].background,
      borderBottomWidth: 1,
      fontWeight: isTitle ? "bold" : undefined,
      height: 60,
    },
    sets: { fontSize: 16 },
    weightAndRepetitionsView: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    },
    weightText: { flex: 1, textAlign: "center" },
    //
    dropdownButtonStyle: {
      flex: 1,
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
