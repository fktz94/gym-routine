export enum ResponseStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULFILLED,
}

export interface RoutineStore extends RoutinesData {
  errorMessage: string;
  isLoading: boolean;
  status: ResponseStatus;
  currentRoutineData: RoutineStructure;
}
