export enum ResponseStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULFILLED,
}

export interface RoutineStore extends RoutinesData {
  getAllRoutinesErrorMessage: string;
  isGettingAllRoutines: boolean;
  getAllRoutinesStatus: ResponseStatus;
}

export interface ModifyOneExerciseProps {
  index: any;
  data: any;
}
