import RoutineItemList from "./RoutineListItem";
import { RoutineStructure } from "@/src/types/Routines";

const CurrentRoutineButton = ({ currentRoutine }: { currentRoutine: RoutineStructure }) => {
  const { id, madeOn, name } = currentRoutine;
  return <RoutineItemList id={id} madeOn={madeOn} routineName={name} isCurrent />;
};

export default CurrentRoutineButton;
