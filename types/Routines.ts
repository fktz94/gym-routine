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
  name: string;
  madeOn: string;
  data: RoutineDay[];
}

type Routine = RoutineStructure[];

interface RoutinesData {
  routines: Routine;
  current: string;
}
