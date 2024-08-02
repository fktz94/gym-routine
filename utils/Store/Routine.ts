export const findCurrentRoutine = ({ routines, currentRoutineName }: RoutinesData) => {
  const currentRoutine = routines.find((el) => el.name === currentRoutineName);
  return currentRoutine ?? routines[0];
};
