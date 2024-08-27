import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";
import { EditCreatedExerciseModalProps } from "@/src/types/Components";
import { AcceptButton, CancelButton } from "../ThemedButton";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useState } from "react";
import CustomSelectDropdown from "../CustomSelectDropdown";
import { Exercise, WeightsAndRepetitions } from "@/src/types/Routines";
import useEditRoutineContext from "@/src/contexts/EditRoutine/useEditRoutineContext";
import CreateOrEditExerciseModal from "../CreateOrEditExerciseModal/CreateOrEditExerciseModal";

const EditExerciseModal = ({
  closeModal,
  dayIndex,
  exerciseName,
}: EditCreatedExerciseModalProps) => {
  const { theme } = useThemeContext();

  const { handleEditOneExercise, selectedRoutine } = useEditRoutineContext();

  const selectedExercise = selectedRoutine.data[dayIndex].find((el) => el.name === exerciseName);

  if (!selectedExercise) return null;

  // handleEditOneExercise({ dayIndex, exerciseData: payload, prevName: selectedExercise.name });

  return (
    <CreateOrEditExerciseModal
      closeModal={closeModal}
      dayIndex={dayIndex}
      handleOnAccept={handleEditOneExercise}
      exerciseToEdit={selectedExercise}
    />
  );
};

export default EditExerciseModal;
