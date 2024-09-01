export interface WeightsAndRepetitions {
  qty: string | undefined;
  weight: string | null | undefined;
}

export interface Exercise {
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
  currentRoutineId: string;
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
