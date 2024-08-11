import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { CreateExerciseModalProps } from "@/src/types/Components";
import { useAppDispatch } from "@/src/hooks/reactReduxHook";
import { AcceptButton, CancelButton } from "../ThemedButton";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CreateExerciseModal = ({ closeModal, handleName }: CreateExerciseModalProps) => {
  const { theme } = useThemeContext();
  const styles = createExerciseModalStyles(theme);
  const dispatch = useAppDispatch();

  const [hasWeeksVariations, setHasWeeksVariations] = useState(false);
  const [isCustomRepetitions, setIsCustomRepetitions] = useState(false);

  const variations = () => {
    // write logic for variations , dropdowns, checkboxes,  items
    return null;
  };

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
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={handleName}
                  style={styles.textInput}
                  placeholder="Exercise's name"
                  placeholderTextColor={Colors[theme].secondary}
                />
              </View>
              <View>{variations()}</View>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxText}>Customize value</Text>
                <BouncyCheckbox
                  size={18}
                  fillColor={Colors.light.primary}
                  innerIconStyle={{ borderWidth: 2 }}
                  // onPress={handleCustomCheckbox}
                  isChecked={hasWeeksVariations}
                />
              </View>
              <View style={styles.buttonsContainer}>
                <CancelButton onCancel={closeModal}>
                  <Ionicons name="close" size={20} />
                </CancelButton>
                <AcceptButton isDisabled={false} onAccept={closeModal}>
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
    textInputContainer: {
      flexDirection: "row",
      gap: 10,
      width: "75%",
      margin: "auto",
    },
    textInput: {
      color: Colors[theme].text,
      textAlign: "center",
      fontSize: 18,
      borderBottomWidth: 0.9,
      padding: 10,
      borderColor: Colors[theme].text,
      width: "90%",
    },
    checkboxContainer: { flexDirection: "row", gap: 12, justifyContent: "flex-end" },
    checkboxText: { textAlignVertical: "center", color: Colors[theme].text, fontSize: 12 },
    buttonsContainer: { flexDirection: "row", gap: 20, justifyContent: "center" },
  });
