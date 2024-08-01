interface WeightsAndRepetitions {
  qty: number | string;
  weight: number | string;
}

interface Exercise {
  name: string;
  sets: number;
  weightsAndRepetitions: WeightsAndRepetitions[];
}

type RoutineDay = Exercise[];

interface RoutineStructure {
  data: RoutineDay[];
  id: number;
  madeOn: string;
  name: string;
}

type Routine = RoutineStructure[];

interface RoutinesData {
  currentRoutine: string;
  routines: Routine;
}
