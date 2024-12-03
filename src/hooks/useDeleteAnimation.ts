import { useSharedValue, withTiming } from "react-native-reanimated";

const useDeleteAnimation = () => {
  const position = useSharedValue(0);
  const isLeftSide = useSharedValue(false);

  const animateBackToTheBeginning = () => {
    position.value = withTiming(0, { duration: 100 });
    isLeftSide.value = false;
  };

  return { position, isLeftSide, animateBackToTheBeginning };
};

export default useDeleteAnimation;
