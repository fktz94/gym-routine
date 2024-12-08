import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Theme } from "@/src/types/Contexts";
import { Ionicons } from "@expo/vector-icons";
import useSettingsContext from "@/src/contexts/Settings/useSettingsContext";
import { Colors } from "@/src/constants/Colors";
import useExerciseListDay from "@/src/hooks/useExerciseListDay";
import { PropsWithChildren } from "react";

interface AnimatedDayCardProps extends PropsWithChildren {
  dayHasToBeShown?: boolean;
  title: string;
  containerStyle?: ViewStyle;
}

const AnimatedDayCard = ({
  children,
  dayHasToBeShown = false,
  title,
  containerStyle,
}: AnimatedDayCardProps) => {
  const { theme } = useSettingsContext();
  const styles = animatedDayCardStyles(theme);

  const { animatedStyle, isShown, onLayout, showDayDetails } =
    useExerciseListDay({
      dayHasToBeShown,
    });

  return (
    <View style={[styles.dayContainer, containerStyle]}>
      <Pressable style={styles.dayButton} onPress={showDayDetails}>
        <Text style={styles.dayButtonText}>{title}</Text>
        <Ionicons name={isShown ? "chevron-up" : "chevron-down"} />
      </Pressable>
      <Animated.View style={animatedStyle}>
        <View
          onLayout={onLayout}
          style={{ position: "absolute", width: "100%" }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default AnimatedDayCard;

const animatedDayCardStyles = (theme: Theme) =>
  StyleSheet.create({
    dayContainer: { width: "75%", margin: "auto" },
    dayButton: {
      backgroundColor: Colors[theme].secondary,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    dayButtonText: {
      color: Colors[theme].text,
      fontWeight: "bold",
      letterSpacing: 1,
      fontSize: 16,
    },
  });
