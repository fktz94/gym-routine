import { useLocalSearchParams } from "expo-router";
import EditRoutineProvider from "@/src/contexts/EditRoutine/EditRoutineProvider";
import EditRoutine from "@/src/components/EditRoutine/EditRoutine";

const EditRoutineScreen = () => {
  const { id, selectedDay } = useLocalSearchParams<{ id: string; selectedDay: string }>();

  return (
    <EditRoutineProvider routineId={id} selectedDay={selectedDay}>
      <EditRoutine />
    </EditRoutineProvider>
  );
};

export default EditRoutineScreen;
