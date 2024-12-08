import { ActivityIndicator, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import useSettingsContext from "../contexts/Settings/useSettingsContext";

const CustomLoader = (props: { style?: ViewStyle }) => {
  const { theme } = useSettingsContext();
  const propsStyle = props?.style;
  return (
    <ActivityIndicator
      size={80}
      color={Colors[theme].secondary}
      style={propsStyle}
    />
  );
};

export default CustomLoader;
