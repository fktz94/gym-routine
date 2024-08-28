import { View, Animated } from "react-native";
import DeleteButton from "./DeleteButton";
import { DeleteAnimationProps } from "@/src/types/Components";

const DeleteAnimation = ({
  animatedViewStyles,
  containerViewStyles,
  children,
  panResponder,
  translateX,
  onDelete,
  isCurrent,
  isRoutine,
}: DeleteAnimationProps) => {
  return (
    <View style={containerViewStyles} {...panResponder.panHandlers}>
      <Animated.View style={[{ transform: [{ translateX }] }, { ...animatedViewStyles }]}>
        {children}
        <DeleteButton onDelete={onDelete} isCurrent={isCurrent} isRoutine={isRoutine} />
      </Animated.View>
    </View>
  );
};

export default DeleteAnimation;
