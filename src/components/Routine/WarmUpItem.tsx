import { Colors } from "@/src/constants/Colors";
import useThemeContext from "@/src/contexts/Theme/useThemeContext";
import { Theme } from "@/src/types/Contexts";
import { Exercise } from "@/src/types/Routines";
import { StyleSheet, Text, View } from "react-native";

const WarmUpItem = ({ exercise }: { exercise: Exercise }) => {
  const { name, sets, weightsAndRepetitions } = exercise;
  const { theme } = useThemeContext();
  const styles = warmUpItemStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.inputContainer}>{name}</Text>
      <Text style={[styles.inputContainer, styles.sets]}>{sets}</Text>
      <Text style={[styles.inputContainer, styles.sets]}>{weightsAndRepetitions[0].qty}</Text>
    </View>
  );
};

export default WarmUpItem;

const warmUpItemStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    inputContainer: {
      flex: 1,
      flexGrow: 1,
      textAlign: "center",
      textAlignVertical: "center",
      color: Colors[theme].text,
      backgroundColor: Colors[theme].background,
      borderBottomWidth: 1,
      borderBottomColor: Colors[theme].text,
      minHeight: 60,
    },
    sets: { fontSize: 16 },
  });
