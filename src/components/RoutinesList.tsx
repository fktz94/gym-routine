import { View, FlatList, StyleSheet } from "react-native";
import { RoutinesListProps } from "../types/Components";
import RoutineItemList from "./RoutineItemList";

export default function RoutinesList({ selectedRoutines }: RoutinesListProps) {
  return (
    <FlatList
      data={selectedRoutines}
      renderItem={({ item: { name, madeOn, id } }) => (
        <RoutineItemList id={id} madeOn={madeOn} routineName={name} />
      )}
      keyExtractor={({ id }) => id.toString()}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: { height: 10 },
});
