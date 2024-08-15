import useEditRoutine from "@/src/hooks/useEditRoutine";
import EditRoutineContext from "./EditRoutineContext";

type Props = {
  children: React.ReactNode;
  routineId: string;
  selectedDay: string;
};

export default function EditRoutineProvider({ children, routineId, selectedDay }: Props) {
  const { data } = useEditRoutine({ routineId });

  return (
    <EditRoutineContext.Provider value={{ selectedRoutine: data, selectedDay }}>
      {children}
    </EditRoutineContext.Provider>
  );
}
