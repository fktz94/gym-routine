import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/src/constants/Colors";
import { DeleteButtonProps } from "@/src/types/Components";

const DeleteButton = ({ onDelete, isRoutine, isCurrent }: DeleteButtonProps) => {
  const styles = deleteButtonStyles(isCurrent);
  return (
    <TouchableOpacity
      style={{ ...styles.exerciseBtn, ...(isRoutine && styles.routineBtn) }}
      onPress={onDelete}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );
};

export default DeleteButton;

const deleteButtonStyles = (isCurrent = false) =>
  StyleSheet.create({
    exerciseBtn: {
      backgroundColor: Colors.cancelBackground,
      justifyContent: "center",
      position: "absolute",
      width: 70,
      height: "100%",
      right: -70,
    },
    routineBtn: {
      height: isCurrent ? "78%" : "71%",
      borderRadius: 11,
    },
    deleteButtonText: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      letterSpacing: 1,
      color: Colors.light.background,
    },
  });