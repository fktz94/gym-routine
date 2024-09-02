import { useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

const useExerciseListDay = (props?: { dayHasToBeShown: boolean }) => {
  const [isShown, setIsShown] = useState(props?.dayHasToBeShown);
  const showDayDetails = () => setIsShown(!isShown);

  const [height, setHeight] = useState(0);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const layoutHeight = layout.height;
    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = isShown ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight,
      overflow: "hidden",
    };
  });
  return { animatedStyle, isShown, onLayout, showDayDetails };
};

export default useExerciseListDay;
