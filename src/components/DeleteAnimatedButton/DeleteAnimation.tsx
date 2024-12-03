import { View } from "react-native";
import DeleteButton from "./DeleteButton";
import { DeleteAnimationProps } from "@/src/types/Components";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const END_POSITION = -70;
const MIN_POSITION = -30;

const DeleteAnimation = ({
  animatedViewStyles,
  containerViewStyles,
  children,
  position,
  isLeftSide,
  onDelete,
  isCurrent,
  isRoutine,
}: DeleteAnimationProps) => {
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (
        !isLeftSide.value &&
        e.translationX < 0 &&
        e.translationX > END_POSITION
      ) {
        position.value = e.translationX;
      } else if (
        isLeftSide.value &&
        e.translationX > 0 &&
        e.translationX < -END_POSITION
      ) {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd((_) => {
      if (!isLeftSide.value && position.value < MIN_POSITION) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        isLeftSide.value = true;
      } else {
        position.value = withTiming(0, { duration: 100 });
        isLeftSide.value = false;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={containerViewStyles}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[{ ...animatedStyle }, { ...animatedViewStyles }]}
        >
          {children}
          <DeleteButton
            onDelete={onDelete}
            isCurrent={isCurrent}
            isRoutine={isRoutine}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default DeleteAnimation;
