import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Theme } from "@/src/types/Contexts";

const WarmUpTitle = (props: { containerStyle?: ViewStyle }) => {
  const { theme } = useThemeContext();
  const styles = exerciseListTitleStyles(theme);
  return (
    <View style={[styles.warmUpTitleItem, props?.containerStyle]}>
      <Text style={styles.warmUpTitleText}>Exercise</Text>
      <Text style={styles.warmUpTitleText}>Sets</Text>
      <Text style={styles.warmUpTitleText}>Repetitions / time</Text>
    </View>
  );
};

export default WarmUpTitle;

const exerciseListTitleStyles = (theme: Theme) =>
  StyleSheet.create({
    warmUpTitleItem: {
      flexDirection: "row",
      overflow: "hidden",
      width: "100%",
    },
    warmUpTitleText: {
      paddingHorizontal: 6,
      paddingVertical: 8,
      textAlign: "center",
      fontWeight: "bold",
      backgroundColor: Colors[theme].modalBackground,
      color: Colors[theme].text,
      flexGrow: 1,
      width: 1,
      textAlignVertical: "center",
    },
  });
