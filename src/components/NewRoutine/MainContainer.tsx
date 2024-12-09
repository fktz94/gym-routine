import { StyleSheet, View } from "react-native";
import ConfirmCreateNewRoutineModal from "./ConfirmCreateNewRoutineModal";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThemedButton from "../Buttons/ThemedButton";
import useMainContainerNewRoutine from "@/src/hooks/useMainContainerNewRoutine";
import { Theme } from "@/src/types/Contexts";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { useTranslation } from "react-i18next";

const MainContainer = () => {
  const {
    step,
    isCreating,
    closeModal,
    isFirstStep,
    backBtnFn,
    isNextBtnDisabled,
    nextBtnFn,
    isLastStep,
  } = useMainContainerNewRoutine();

  const { theme } = useSettingsContext();
  const styles = mainStyles(theme);
  const { t } = useTranslation();

  const renderStep = () => {
    switch (step) {
      case 0:
        return <FirstStep />;
      case 1:
        return <SecondStep />;
      default:
        return null;
    }
  };

  return (
    <>
      {isCreating && <ConfirmCreateNewRoutineModal closeModal={closeModal} />}
      <View style={styles.mainContainer}>
        <View style={styles.inputsContainer}>{renderStep()}</View>
        <View style={styles.directionButtonsContainer}>
          <ThemedButton disabled={isFirstStep} onPress={backBtnFn}>
            {t("back").toUpperCase()}
          </ThemedButton>
          <ThemedButton disabled={isNextBtnDisabled} onPress={nextBtnFn}>
            {isLastStep
              ? `${t("finish").toUpperCase()}`
              : `${t("next").toUpperCase()}`}
          </ThemedButton>
        </View>
      </View>
    </>
  );
};

export default MainContainer;

const mainStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      alignItems: "center",
      gap: 10,
      backgroundColor: Colors[theme].background,
    },
    inputsContainer: {
      height: "90%",
      width: "100%",
      alignItems: "center",
    },
    directionButtonsContainer: {
      flexDirection: "row",
      width: "75%",
      justifyContent: "center",
      gap: 20,
    },
  });
