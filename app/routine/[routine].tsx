import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function RoutineDescription() {
  const params = useLocalSearchParams<{ name: string }>();
  console.log(params);

  return (
    <View>
      <Text>routine</Text>
    </View>
  );
}
