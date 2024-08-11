import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { CreateExerciseModalProps } from "@/src/types/Components";
import { useAppDispatch } from "@/src/hooks/reactReduxHook";
import { AcceptButton, CancelButton } from "../ThemedButton";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const CreateExerciseModal = ({ closeModal }: CreateExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = createExerciseModalStyles(theme);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [sets, setSets] = useState(3);
  const [hasWeeksVariations, setHasWeeksVariations] = useState(false);
  const [isCustomRepetitions, setIsCustomRepetitions] = useState(false);

  const handleName = (val: string) => setName(val);
  const handleSets = (val: number) => setSets(val);

  const variations = () => {
    // write logic for variations , dropdowns, checkboxes,  items
    return null;
  };

  const setsDropdownValues = [...Array(10)].map((_, i) => i + 1);

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
              <View style={styles.nameInputContainer}>
                <TextInput
                  onChangeText={handleName}
                  style={styles.nameTextInput}
                  value={name}
                  placeholder="Exercise's name"
                  placeholderTextColor={Colors[theme].secondary}
                  multiline
                />
              </View>
              <View style={styles.setsInputContainer}>
                <Text style={styles.setsText}>How many sets are you doing?</Text>
                <SelectDropdown
                  data={setsDropdownValues}
                  defaultValue={setsDropdownValues[2]}
                  onSelect={handleSets}
                  renderButton={(selectedItem, isOpened) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>{selectedItem}</Text>
                      <Ionicons
                        style={styles.dropdownButtonArrowStyle}
                        name={isOpened ? "chevron-up" : "chevron-down"}
                      />
                    </View>
                  )}
                  renderItem={(el, _, isSelected) => (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {
                          backgroundColor:
                            theme === "light" ? Colors[theme].primary : Colors[theme].text,
                        }),
                      }}
                    >
                      <Text
                        style={{
                          ...styles.dropdownItemTxtStyle,
                          ...(isSelected && {
                            color:
                              theme === "light" ? Colors[theme].background : Colors[theme].primary,
                          }),
                        }}
                      >
                        {el}
                      </Text>
                    </View>
                  )}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
              <View>{variations()}</View>
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

const createExerciseModalStyles = (theme: Theme) =>
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
      minWidth: "75%",
      maxWidth: "90%",
      padding: 20,
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
    nameInputContainer: {
      flexDirection: "row",
      gap: 10,
      width: "75%",
      margin: "auto",
    },
    nameTextInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 18,
      borderBottomWidth: 0.9,
      padding: 10,
      borderColor: Colors[theme].text,
      width: "90%",
    },
    setsInputContainer: {
      flexDirection: "row",
      gap: 20,
      margin: "auto",
      paddingHorizontal: 10,
    },
    setsText: { textAlignVertical: "center", color: Colors[theme].text, fontSize: 14 },
    dropdownButtonStyle: {
      gap: 12,
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    dropdownButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 18,
      fontWeight: "500",
      color: Colors[theme].text,
      textAlign: "center",
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
      fontSize: 18,
      fontWeight: "500",
      color: Colors[theme].text,
    },
    checkboxContainer: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
    checkboxText: { textAlignVertical: "center", color: Colors[theme].text, fontSize: 12 },
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
