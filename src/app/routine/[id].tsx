import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function RoutineDescription() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>routine</Text>
    </View>
  );
}
