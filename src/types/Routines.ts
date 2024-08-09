export interface WeightsAndRepetitions {
  qty: number | string;
  weight: number | string | null;
}

interface Exercise {
  name: string;
  sets: number;
  weightsAndRepetitions: WeightsAndRepetitions[];
  current: number;
}

export type RoutineDay = Exercise[];

export interface RoutineStructure {
  data: RoutineDay[];
  id: string;
  madeOn: string;
  name: string;
  currentDay: number;
}

export type Routine = RoutineStructure[];

export interface RoutinesData {
  currentRoutineName: string;
  routines: Routine;
}

export const monthsOfTheYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
