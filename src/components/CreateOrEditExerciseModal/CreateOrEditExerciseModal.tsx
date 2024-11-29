import { StyleSheet, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Colors } from "@/src/constants/Colors";
import { CreateExerciseModalProps } from "@/src/types/Components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Exercise } from "@/src/types/Routines";
import CustomText from "./CustomText";
import RepetitionInput from "./RepetitionInput";
import ThemedModal from "../ThemedModal";
import CustomSelectDropdown from "../CustomSelectDropdown";
import useCreateOrEditExercise from "@/src/hooks/useCreateOrEditExercise";
import { Theme } from "@/src/types/Contexts";

const CreateOrEditExerciseModal = ({
  closeModal,
  dayIndex = 0,
  exerciseToEdit,
  handleOnAccept,
  isWarmUp = false,
}: CreateExerciseModalProps) => {
  const {
    currentVariations,
    dropdownValues,
    handleName,
    handleRepetitionValues,
    handleSets,
    handleWeeksVariations,
    hasWeeksVariations,
    isButtonDisabled,
    isCustomRepetitions,
    name,
    sets,
    toggleCustomRepetitions,
    toggleHasWeeksVariations,
    variations,
  } = useCreateOrEditExercise({ exerciseToEdit });

  const { theme } = useThemeContext();
  const styles = createOrEditExerciseModalStyles(
    theme,
    hasWeeksVariations,
    name
  );

  const repetitionsInputs = () => {
    return (
      <View style={styles.repetitionsInputsContainer}>
        {variations.map((el, i) => (
          <RepetitionInput
            el={el}
            handleRepetitionValues={handleRepetitionValues}
            hasWeeksVariations={hasWeeksVariations}
            index={i}
            isCustomRepetitions={isCustomRepetitions}
            variations={variations}
            key={i}
          />
        ))}
      </View>
    );
  };

  const handleAccept = () => {
    const payload: Exercise = {
      name,
      sets,
      current: exerciseToEdit?.current || 0,
      weightsAndRepetitions: variations,
    };
    handleOnAccept({
      dayIndex,
      exerciseData: payload,
      prevName: exerciseToEdit?.name || "",
    });
    closeModal();
  };

  return (
    <ThemedModal
      closeModal={closeModal}
      handleAccept={handleAccept}
      isAcceptBtnDisabled={isButtonDisabled}
      buttonsAreIcons
    >
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
        <CustomText text="How many sets are you doing?" />
        <CustomSelectDropdown
          data={dropdownValues}
          defaultValue={dropdownValues[2]}
          onSelect={handleSets}
          btnStyle={styles.dropdownButtonStyle}
          btnTextStyle={styles.dropdownButtonTxtStyle}
        />
      </View>
      {!isWarmUp && (
        <View style={styles.innerContainer}>
          <CustomText text="Check if it has repetition variations along the weeks." />
          <BouncyCheckbox
            size={18}
            fillColor={Colors.light.primary}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={toggleHasWeeksVariations}
            isChecked={hasWeeksVariations}
          />
        </View>
      )}
      {hasWeeksVariations && (
        <View style={styles.innerContainer}>
          <CustomText text="How many variations?" />
          <CustomSelectDropdown
            data={dropdownValues.slice(1)}
            defaultValue={
              dropdownValues.find((el) => el === currentVariations)!
            }
            onSelect={handleWeeksVariations}
            btnStyle={styles.dropdownButtonStyle}
            btnTextStyle={styles.dropdownButtonTxtStyle}
          />
        </View>
      )}
      <View style={styles.innerContainer}>
        <View style={styles.repetitionsContainer}>
          <CustomText text="Repetitions / time:" />
          {repetitionsInputs()}
        </View>
      </View>
      <View style={styles.innerContainer}>
        <CustomText text="Need to customize the text instead of just numbers?" />
        <BouncyCheckbox
          size={18}
          fillColor={Colors.light.primary}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={toggleCustomRepetitions}
          isChecked={isCustomRepetitions}
        />
      </View>
    </ThemedModal>
  );
};

export default CreateOrEditExerciseModal;

const createOrEditExerciseModalStyles = (
  theme: Theme,
  multipleRepetitions: boolean,
  name: string
) =>
  StyleSheet.create({
    innerContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
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
      borderColor: !name ? Colors.cancelBackground : Colors.acceptBackground,
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
      width: "100%",
      flexDirection: multipleRepetitions ? "column" : "row",
    },
    repetitionsInputsContainer: {
      flexDirection: "row",
      margin: "auto",
      flexWrap: "wrap",
      paddingTop: multipleRepetitions ? 20 : undefined,
    },
  });
