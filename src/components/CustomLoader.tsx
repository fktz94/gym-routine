import { ActivityIndicator, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import useSettingsContext from "../contexts/Settings/useSettingsContext";

const CustomLoader = (props: { style?: ViewStyle; size?: number }) => {
  const { theme } = useSettingsContext();
  const propsStyle = props?.style;
  const propsSize = props?.size;
  return (
    <ActivityIndicator
      size={propsSize ?? 80}
      color={Colors[theme].secondary}
      style={propsStyle}
    />
  );
};

export default CustomLoader;
