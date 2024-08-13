import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { CreateExerciseModalProps } from "@/src/types/Components";
import { useAppDispatch } from "@/src/hooks/reactReduxHook";
import { AcceptButton, CancelButton } from "../ThemedButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import CustomSelectDropdown from "../CustomSelectDropdown";
import { WeightsAndRepetitions } from "@/src/types/Routines";

const CreateExerciseModal = ({ closeModal }: CreateExerciseModalProps) => {
  const { theme } = useThemeContext();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [sets, setSets] = useState(3);

  const [hasWeeksVariations, setHasWeeksVariations] = useState(false);
  const [isCustomRepetitions, setIsCustomRepetitions] = useState(false);

  const styles = createExerciseModalStyles(theme, hasWeeksVariations);

  const [weeksVariations, setWeeksVariations] = useState(1);

  const handleName = (val: string) => setName(val);
  const handleSets = (val: number) => setSets(val);
  const toggleHasWeeksVariations = () => {
    if (!hasWeeksVariations) {
      setWeeksVariations(4);
    } else {
      setWeeksVariations(1);
    }
    setHasWeeksVariations(!hasWeeksVariations);
  };

  const toggleCustomRepetitions = () => setIsCustomRepetitions(!isCustomRepetitions);

  const handleWeeksVariations = (val: number) => setWeeksVariations(val);

  const variations = [...Array(weeksVariations).fill({ qty: undefined, weight: undefined })];

  const handleRepetitions = () => {};

  const repetitionsInputs = () => {
    return (
      <View style={styles.repetitionsInputsContainer}>
        {variations.map((el, i) => (
          <View
            style={{
              ...styles.repetitionsInputsInnerContainer,
              ...(variations.length === 1 && { width: "auto", maxWidth: "100%" }),
            }}
          >
            <TextInput
              keyboardType={isCustomRepetitions ? "default" : "number-pad"}
              style={styles.repetitionsTextInput}
              multiline
            />
            {i !== variations.length - 1 && (
              <Text style={[styles.baseText, styles.repetitionsTextSlash]}>/</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const dropdownValues = [...Array(10)].map((_, i) => i + 1);
  const isButtonDisabled = !name;

  return (
    <Modal animationType="slide" transparent>
      <View style={styles.container}>
        {false ? ( ///////////////////////////////////////////////////////// this should render while it's loading after submitting new data
          <ActivityIndicator size={80} color={Colors[theme].secondary} /> // this should render while it's loading after submitting new data
        ) : (
          <>
            <Ionicons
              style={styles.closeIconBtn}
              name="close"
              color={Colors[theme].text}
              size={30}
              onPress={closeModal}
            />
            <View style={styles.exerciseContainer}>
              <View style={[styles.innerContainer, styles.nameInputContainer]}>
                <TextInput
                  onChangeText={handleName}
                  style={[styles.baseText, styles.nameTextInput]}
                  value={name}
                  placeholder="Exercise's name"
                  placeholderTextColor={Colors[theme].secondary}
                  multiline
                />
              </View>
              <View style={styles.innerContainer}>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.baseText}>How many sets are you doing?</Text>
                </View>
                <CustomSelectDropdown
                  data={dropdownValues}
                  defaultValue={dropdownValues[2]}
                  onSelect={handleSets}
                  btnStyle={styles.dropdownButtonStyle}
                  btnTextStyle={styles.dropdownButtonTxtStyle}
                />
              </View>
              <View style={styles.innerContainer}>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.baseText}>
                    Check if it has repetition variations along the weeks.
                  </Text>
                </View>
                <BouncyCheckbox
                  size={18}
                  fillColor={Colors.light.primary}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={toggleHasWeeksVariations}
                  isChecked={hasWeeksVariations}
                />
              </View>
              {hasWeeksVariations && (
                <View style={styles.innerContainer}>
                  <View style={styles.innerTextContainer}>
                    <Text style={styles.baseText}>How many variations?</Text>
                  </View>
                  <CustomSelectDropdown
                    data={dropdownValues.slice(1)}
                    defaultValue={dropdownValues.find((el) => el === weeksVariations)!}
                    onSelect={handleWeeksVariations} //
                    btnStyle={styles.dropdownButtonStyle}
                    btnTextStyle={styles.dropdownButtonTxtStyle}
                  />
                </View>
              )}
              <View style={[styles.innerContainer, styles.repetitionsContainer]}>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.baseText}>Repetitions:</Text>
                </View>
                {repetitionsInputs()}
              </View>
              <View style={styles.innerContainer}>
                <View style={styles.innerTextContainer}>
                  <Text style={styles.customizeCheckboxText}>
                    Need to customize the text instead of just numbers?
                  </Text>
                </View>
                <BouncyCheckbox
                  size={18}
                  fillColor={Colors.light.primary}
                  innerIconStyle={{ borderWidth: 2 }}
                  onPress={toggleCustomRepetitions}
                  isChecked={isCustomRepetitions}
                />
              </View>
              <View style={styles.buttonsContainer}>
                <CancelButton onCancel={closeModal}>
                  <Ionicons name="close" size={20} />
                </CancelButton>
                <AcceptButton isDisabled={isButtonDisabled} onAccept={closeModal}>
                  <Ionicons name="checkmark" size={20} />
                </AcceptButton>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default CreateExerciseModal;

const createExerciseModalStyles = (theme: Theme, multipleRepetitions: boolean) =>
  StyleSheet.create({
    closeIconBtn: {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 10,
      color: Colors[theme].background,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors[theme].modalBackground,
    },
    exerciseContainer: {
      width: "80%",
      padding: 30,
      backgroundColor: Colors[theme].background,
      borderRadius: 10,
      gap: 40,
      elevation: 1,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    innerContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    innerTextContainer: {
      maxWidth: "80%",
      flexGrow: 1,
    },
    baseText: {
      color: Colors[theme].text,
      fontSize: 14,
      textAlignVertical: "center",
      flexGrow: 1,
    },
    nameInputContainer: {
      width: "80%",
      margin: "auto",
    },
    nameTextInput: {
      textAlign: "center",
      fontSize: 18,
      padding: 10,
      borderBottomWidth: 0.9,
      borderColor: Colors[theme].text,
    },
    dropdownButtonStyle: {
      gap: 8,
      paddingHorizontal: 14,
      paddingVertical: 8,
      width: undefined,
    },
    dropdownButtonTxtStyle: {
      fontSize: 18,
    },
    repetitionsContainer: {
      flexDirection: multipleRepetitions ? "column" : "row",
    },
    repetitionsInputsContainer: {
      flexDirection: "row",
      margin: "auto",
      flexWrap: "wrap",
      paddingTop: multipleRepetitions ? 20 : undefined,
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
    customizeCheckboxContainer: {
      flexDirection: "row",
      gap: 20,
      margin: "auto",
      paddingHorizontal: 10,
      borderWidth: 1,
      justifyContent: "space-around",
    },
    customizeCheckboxText: {
      color: Colors[theme].text,
      fontSize: 14,
      width: "auto",
    },
    //

    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
