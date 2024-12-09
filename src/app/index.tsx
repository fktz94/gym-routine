import { StyleSheet, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";
import CustomLoader from "@/src/components/CustomLoader";
import CurrentRoutineButton from "@/src/components/Index/CurrentRoutineButton";
import RoutinesList from "@/src/components/Index/RoutinesList";
import ThemedButton from "@/src/components/Buttons/ThemedButton";
import { Colors } from "@/src/constants/Colors";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import useIndex from "@/src/hooks/useIndex";
import useRoutines from "@/src/hooks/useRoutines";
import { Theme } from "@/src/types/Contexts";
import { Path } from "../types/Utils";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { theme, language } = useSettingsContext();
  const styles = indexStyles(theme);
  const { t } = useTranslation();

  const { currentRoutine, pastRoutines, noRoutines } = useRoutines();
  const { renderLoader } = useIndex();

  if (!language) return <Redirect href={Path.SELECTLANGUAGE} />;

  return (
    <View style={styles.mainContainer}>
      {renderLoader ? (
        <CustomLoader style={{ marginVertical: "auto" }} />
      ) : (
        <>
          <Link href={`/new-routine`} asChild>
            <ThemedButton isSecondary>{t("newRoutine")}</ThemedButton>
          </Link>

          {currentRoutine && (
            <View style={styles.listContainer}>
              <Text style={styles.title}>{t("currentRoutine")}</Text>
              <CurrentRoutineButton currentRoutine={currentRoutine} />
            </View>
          )}
          {pastRoutines.length > 0 && (
            <View style={styles.listContainer}>
              <Text style={styles.title}>{t("pastRoutines")}</Text>
              <RoutinesList selectedRoutines={pastRoutines} />
            </View>
          )}
          {noRoutines && (
            <View style={styles.listContainer}>
              <Text style={[styles.title, styles.noRoutines]}>
                {t("noRoutines")}
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const indexStyles = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexGrow: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 32,
      backgroundColor: Colors[theme].background,
    },
    listContainer: {
      gap: 15,
      width: "100%",
    },
    title: {
      fontWeight: "bold",
      fontSize: 24,
      color: Colors[theme].text,
      textAlign: "center",
    },
    noRoutines: { letterSpacing: 2, padding: 60, lineHeight: 35 },
  });
