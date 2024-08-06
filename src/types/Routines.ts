interface WeightsAndRepetitions {
  qty: number | string;
  weight: number | string | null;
}

interface Exercise {
  name: string;
  sets: number;
  weightsAndRepetitions: WeightsAndRepetitions[];
  current: number;
}

type RoutineDay = Exercise[];

interface RoutineStructure {
  data: RoutineDay[];
  id: string;
  madeOn: string;
  name: string;
  currentDay: number;
}

type Routine = RoutineStructure[];

interface RoutinesData {
  currentRoutineName: string;
  routines: Routine;
}
