import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EditWeightModal from "./EditWeightModal";
import ThemedButton from "../Buttons/ThemedButton";
import CustomSelectDropdown from "../CustomSelectDropdown";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useModal from "@/src/hooks/useModal";
import { Theme } from "@/src/types/Contexts";
import { Exercise } from "@/src/types/Routines";
import { cloneDeep } from "lodash";
import { Strings } from "@/src/constants/Strings";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reactReduxHook";
import { toggleExerciseState } from "@/src/store/DoneExercise/DoneExerciseSlice";
import { useTranslation } from "react-i18next";
import { parsedWeightTxt } from "@/src/utils/Validations/Validations";

export const ExerciseItemTitle = () => {
  const { theme } = useSettingsContext();
  const styles = exerciseItemStyles(theme, true);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>{t("exercises")}</Text>
      <Text style={styles.inputContainer}>{t("sets")}</Text>
      <Text style={styles.inputContainer}>{t("weightsAndRepetitions")}</Text>
    </View>
  );
};

export const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const { theme, language } = useSettingsContext();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const doneExercises = useAppSelector(({ doneExercise }) => doneExercise);

  const { name, sets, weightsAndRepetitions, current } = exercise;

  const isExerciseDone =
    doneExercises.findIndex((item) => item === name) !== -1;

  const [selectedDropdownItem, setSelectedDropdownItem] = useState(current);
  const handleDropdownItem = (i: number) => setSelectedDropdownItem(i);

  const repetitions = weightsAndRepetitions.map(({ qty }) => qty || "N/A");
  const reversedWeightAndRepetitions = cloneDeep(
    weightsAndRepetitions
  ).reverse();
  const reversedIndex = weightsAndRepetitions.length - current;
  const firstPart = reversedWeightAndRepetitions
    .slice(reversedIndex)
    .find(({ weight }) => weight?.value);
  const secondPart = reversedWeightAndRepetitions
    .slice(0, reversedIndex - 1)
    .find(({ weight }) => weight?.value);
  const prevWeight = firstPart || secondPart;

  const currentWeight = weightsAndRepetitions[current].weight?.value;
  const weight = weightsAndRepetitions[selectedDropdownItem]?.weight?.value;
  const hasMultipleRepetitions = weightsAndRepetitions.length > 1;
  const isCurrent = selectedDropdownItem === current;
  const exerciseWithoutWeight = weight?.includes(Strings.NoWeight);

  const styles = exerciseItemStyles(theme, false, exerciseWithoutWeight);

  const repetitionsSelect = (data: string[]) => {
    if (data.length === 0) return null;
    const mappedData = data.map((rep, i) => ({ rep, i }));
    return data.length > 1 ? (
      <CustomSelectDropdown
        data={mappedData}
        defaultValue={mappedData[current]}
        onSelect={(_, i) => handleDropdownItem(i)}
        isExerciseItem
        current={current}
        btnStyle={styles.dropdownButtonStyle}
        btnTextStyle={styles.dropdownButtonTxtStyle}
        itemTextStyle={styles.dropdownItemTxtStyle}
      />
    ) : (
      <View style={styles.uniqueButtonStyle}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.uniqueButtonTxtStyle}
        >
          {data[0]}
        </Text>
      </View>
    );
  };

  const { closeModal, isModalOpen: isEditing, openModal } = useModal();

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const zIndexAnim = useRef(new Animated.Value(0)).current;

  const animation = (animationRef: Animated.Value, finalValue: number) => {
    Animated.timing(animationRef, {
      toValue: isExerciseDone ? finalValue : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(opacityAnim, 0.5);
    animation(zIndexAnim, 999);
  }, [isExerciseDone]);

  const handleDoubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => dispatch(toggleExerciseState(name)))
    .runOnJS(true);

  return (
    <>
      {isEditing && (
        <EditWeightModal
          isCurrent={isCurrent}
          selectedSerie={selectedDropdownItem}
          closeModal={closeModal}
          exerciseData={weightsAndRepetitions[selectedDropdownItem]}
          exerciseName={name}
          hasMultipleRepetitions={hasMultipleRepetitions}
        />
      )}
      <GestureHandlerRootView>
        <GestureDetector gesture={handleDoubleTap}>
          <View style={styles.container}>
            <Animated.View
              style={[
                styles.isFinishedOpacity,
                { opacity: opacityAnim, zIndex: zIndexAnim },
              ]}
            />
            <Text style={styles.inputContainer}>{name}</Text>
            <Text style={[styles.inputContainer, styles.sets]}>{sets}</Text>
            <View style={styles.inputContainer}>
              {!currentWeight && (
                <Text style={styles.prevText}>{t("addTodaysWeight")}</Text>
              )}
              {hasMultipleRepetitions && (
                <>
                  {prevWeight?.weight?.value && (
                    <Text style={styles.prevText}>
                      Prev: {prevWeight.qty}r -{" "}
                      {parsedWeightTxt({
                        txt: prevWeight.weight.value,
                        language,
                      })}
                    </Text>
                  )}
                </>
              )}

              <View style={styles.weightAndRepetitionsView}>
                {repetitionsSelect(repetitions)}
                {!exerciseWithoutWeight && (
                  <Text
                    style={styles.weightText}
                    numberOfLines={2}
                    adjustsFontSizeToFit
                  >
                    {parsedWeightTxt({ txt: weight, language })}
                  </Text>
                )}
                {/* {!exerciseWithoutWeight && (
                  <TextInput
                    style={styles.weightText}
                    defaultValue={weight}
                    multiline
                    scrollEnabled
                    readOnly
                  />
                )} */}
              </View>

              <View style={styles.themedButtonContainer}>
                <ThemedButton
                  externalButtonStyles={styles.editButtonView}
                  onPress={openModal}
                >
                  <Ionicons color={Colors[theme].background} name="pencil" />
                </ThemedButton>
              </View>
            </View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </>
  );
};

const exerciseItemStyles = (
  theme: Theme,
  isTitle: boolean,
  exerciseWithoutWeight: boolean = false
) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      borderTopLeftRadius: isTitle ? 6 : undefined,
      borderTopRightRadius: isTitle ? 6 : undefined,
    },
    isFinishedOpacity: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "black",
    },
    inputContainer: {
      flex: 1,
      flexGrow: 1,
      textAlign: "center",
      textAlignVertical: "center",
      color: isTitle ? Colors[theme].background : Colors[theme].text,
      backgroundColor: isTitle ? Colors[theme].text : Colors[theme].background,
      borderBottomWidth: 1,
      borderBottomColor: Colors[theme].text,
      fontWeight: isTitle ? "bold" : undefined,
      minHeight: 60,
    },
    sets: { fontSize: 16 },
    weightAndRepetitionsView: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      minHeight: 60,
      width: exerciseWithoutWeight ? "66%" : undefined,
      margin: exerciseWithoutWeight ? "auto" : undefined,
    },
    prevText: {
      fontSize: 11,
      fontWeight: "bold",
      margin: "auto",
      paddingTop: 6,
      color: Colors[theme].text,
    },
    weightText: {
      flex: 3,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
      color: Colors[theme].text,
      height: "100%",
      textAlignVertical: "center",
    },
    themedButtonContainer: {
      flexDirection: "row",
      paddingTop: 6,
      paddingBottom: 12,
      justifyContent: "flex-end",
    },
    editButtonView: {
      backgroundColor: Colors[theme].text,
      paddingHorizontal: 2,
      flex: 1,
      flexGrow: 0.35,
      marginRight: 10,
      alignItems: "center",
    },
    uniqueButtonStyle: {
      flex: 2,
      height: "75%",
      width: "30%",
      margin: "auto",
      backgroundColor: Colors[theme].secondaryTransparent,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 12,
    },
    uniqueButtonTxtStyle: {
      flexGrow: 1,
      fontSize: 16,
      fontWeight: "500",
      color: Colors[theme].text,
      textAlign: "center",
    },
    dropdownButtonStyle: {
      flex: 2,
      height: "75%",
      paddingVertical: 0,
    },
    dropdownButtonTxtStyle: {
      fontSize: 16,
      textAlign: "center",
    },
    dropdownItemTxtStyle: {
      fontSize: 16,
    },
  });
