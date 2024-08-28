import { View, Text, StyleSheet, PanResponder, Animated, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import useThemeContext from "../contexts/Theme/useThemeContext";
import { Link } from "expo-router";
import CurrentThemedButton from "./CurrentThemedButton";
import ThemedButton from "./ThemedButton";
import { RoutinesItemListProps } from "../types/Components";
import { Colors } from "../constants/Colors";
import ConfirmDeleteRoutineModal from "./ConfirmDeleteRoutineModal";
import { Theme } from "../types/Contexts";

export default function RoutineItemList({
  routineName,
  madeOn,
  id,
  isCurrent = false,
}: RoutinesItemListProps) {
  const { theme } = useThemeContext();
  const styles = routinesListStyles(theme, isCurrent);

  const [isDeleting, setIsDeleting] = useState(false);
  const handleCloseModal = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsDeleting(false);
  };
  const handleOpenModal = () => setIsDeleting(true);

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0 && gestureState.dx > -70) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -30) {
          Animated.spring(translateX, {
            toValue: -70,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      {isDeleting && (
        <ConfirmDeleteRoutineModal id={id} name={routineName} closeModal={handleCloseModal} />
      )}
      <View style={styles.itemList} {...panResponder.panHandlers}>
        <Animated.View style={{ transform: [{ translateX }] }}>
          <Link href={`/routine/${id}`} asChild>
            {isCurrent ? (
              <CurrentThemedButton routineName={routineName} />
            ) : (
              <ThemedButton>{routineName}</ThemedButton>
            )}
          </Link>
          <Text style={styles.madeOnText}>
            Made on <Text style={styles.bold}>{madeOn}</Text>
          </Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleOpenModal}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
}

const routinesListStyles = (theme: Theme, isCurrent: boolean) =>
  StyleSheet.create({
    bold: { fontWeight: "bold" },
    itemList: { gap: 4, width: "50%", margin: "auto", overflow: "hidden" },
    madeOnText: { color: Colors[theme].text, fontSize: 12 },
    deleteButton: {
      backgroundColor: Colors.cancelBackground,
      justifyContent: "center",
      position: "absolute",
      width: 70,
      height: isCurrent ? "78%" : "71%",
      right: -70,
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
