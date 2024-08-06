import RoutineContext from "./RoutineContext";

type Props = {
  routine: RoutineStructure;
  children: React.ReactNode;
};

export default function RoutineProvider({ children, routine }: Props) {
  const { currentDay, data, id, madeOn, name } = routine;
  return (
    <RoutineContext.Provider value={{ currentDay, data, id, madeOn, name }}>
      {children}
    </RoutineContext.Provider>
  );
}
