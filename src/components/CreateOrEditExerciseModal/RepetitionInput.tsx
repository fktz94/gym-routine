import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { RepetitionInputProps } from "@/src/types/Components";
import { StyleSheet, Text, TextInput, View } from "react-native";

const RepetitionInput = ({
  index,
  el,
  variations,
  isCustomRepetitions,
  handleRepetitionValues,
  hasWeeksVariations,
}: RepetitionInputProps) => {
  const { theme } = useThemeContext();
  const styles = repetitionInputStyles(theme, hasWeeksVariations);

  return (
    <View
      key={index}
      style={{
        ...styles.repetitionsInputsInnerContainer,
        ...(variations.length === 1 && { width: "auto", maxWidth: "100%" }),
      }}
    >
      <TextInput
        keyboardType={isCustomRepetitions ? "default" : "number-pad"}
        style={styles.repetitionsTextInput}
        multiline
        onChangeText={(val) => handleRepetitionValues(val, index)}
        value={el.qty?.toString()}
      />
      {index !== variations.length - 1 && (
        <Text style={[styles.baseText, styles.repetitionsTextSlash]}>/</Text>
      )}
    </View>
  );
};

export default RepetitionInput;

const repetitionInputStyles = (theme: Theme, multipleRepetitions: boolean) =>
  StyleSheet.create({
    baseText: {
      color: Colors[theme].text,
      fontSize: 14,
      textAlignVertical: "center",
      flexGrow: 1,
    },
    repetitionsInputsInnerContainer: {
      flexDirection: "row",
      width: "25%",
    },
    repetitionsTextInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderBottomWidth: 0.9,
      borderColor: Colors[theme].text,
      flexWrap: "wrap",
      flexGrow: 1,
      height: multipleRepetitions ? 60 : undefined,
    },
    repetitionsTextSlash: { flexGrow: 0, borderBottomWidth: 0.9, borderColor: Colors[theme].text },
  });
