import { StyleSheet, Text, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ProcceedQuittingModal from "../ProcceedQuittingModal";
import CustomSelectDropdown from "../CustomSelectDropdown";
import { Colors } from "@/src/constants/Colors";
import useHeaderContext from "@/src/contexts/Header/useHeaderContext";
import useNewRoutineContext from "@/src/contexts/NewRoutine/useNewRoutineContext";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Theme } from "@/src/types/Contexts";
import { useTranslation } from "react-i18next";
import { mesesDelAño, monthsOfTheYear } from "@/src/types/Routines";
import { useEffect, useMemo } from "react";

const FirstStep = () => {
  const { theme, language } = useSettingsContext();
  const styles = firstStepStyles(theme);
  const { t } = useTranslation();

  const { showQuitModal } = useHeaderContext();

  const {
    handleName,
    handleDays,
    newRoutineState,
    hasWarmUpRoutine,
    toggleWarmUpRoutine,
  } = useNewRoutineContext();

  const { name, data } = newRoutineState;

  const daysDropdownValues = [...Array(7)].map((_, i) => i + 1);

  const defaultValue = daysDropdownValues[data.length - 1];

  const currentMonth = useMemo(() => {
    let month;
    switch (language) {
      case "en":
        month = monthsOfTheYear[new Date().getMonth()];
        break;
      case "es":
        month = mesesDelAño[new Date().getMonth()];
        break;
      default:
        month = monthsOfTheYear[new Date().getMonth()];
        break;
    }
    return month;
  }, [language]);

  useEffect(() => {
    handleName(currentMonth);
  }, [currentMonth]);

  return (
    <>
      {showQuitModal && <ProcceedQuittingModal />}
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{t("giveName")}</Text>
          <Text style={styles.subtitle}>{t("usualName")}</Text>
          <TextInput
            value={name}
            onChangeText={handleName}
            style={styles.textInput}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{t("howManyDays")}</Text>
          <CustomSelectDropdown
            data={daysDropdownValues}
            defaultValue={defaultValue}
            onSelect={handleDays}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxText}>{t("wannaWarmUp")}</Text>
          <BouncyCheckbox
            size={26}
            fillColor={Colors.light.primary}
            innerIconStyle={{ borderWidth: 2 }}
            onPress={toggleWarmUpRoutine}
            isChecked={hasWarmUpRoutine}
          />
        </View>
      </View>
    </>
  );
};

export default FirstStep;

const firstStepStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingTop: 40,
      flex: 1,
      gap: 80,
      width: "75%",
      backgroundColor: Colors[theme].background,
    },
    container: {
      gap: 25,
    },
    checkboxContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: 60,
    },
    checkboxText: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      paddingHorizontal: 20,
      fontSize: 16,
    },
    title: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      textAlign: "center",
      fontSize: 20,
    },
    subtitle: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 0.5,
      textAlign: "center",
      marginTop: -20,
    },
    textInput: {
      fontSize: 24,
      paddingVertical: 10,
      paddingHorizontal: 20,
      color: Colors[theme].text,
      borderWidth: 1,
      borderColor: Colors[theme].primary,
      textAlign: "center",
    },
  });
