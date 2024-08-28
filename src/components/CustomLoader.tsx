import { ActivityIndicator, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import useThemeContext from "../contexts/Theme/useThemeContext";

const CustomLoader = (props: { style?: ViewStyle }) => {
  const { theme } = useThemeContext();
  const propsStyle = props?.style;
  return <ActivityIndicator size={80} color={Colors[theme].secondary} style={propsStyle} />;
};

export default CustomLoader;
