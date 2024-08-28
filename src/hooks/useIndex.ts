import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reactReduxHook";
import { ResponseStatus } from "../types/Store";
import { useIsFocused } from "@react-navigation/native";
import { getAllRoutines } from "../store/Routines/RoutinesAsyncThunk";
import { setIsInitialLoadToFalse } from "../store/Routines/RoutinesSlice";
import useRoutines from "./useRoutines";

const useIndex = () => {
  const dispatch = useAppDispatch();
  const { getAllRoutinesStatus, isGettingAllRoutines, isInitialLoad } = useAppSelector(
    ({ routines }) => routines
  );

  const dataIsNotFetchedYet = getAllRoutinesStatus === ResponseStatus.IDLE;

  const isFocused = useIsFocused();

  const isLoading = isFocused && isGettingAllRoutines;

  if (dataIsNotFetchedYet) {
    dispatch(getAllRoutines());
  }

  useEffect(() => {
    // This isInitialLoad logic is because of the whole stored data being fetched again instead having a DB hosted in a server an make proper API calls.
    if (isInitialLoad && !isGettingAllRoutines && !dataIsNotFetchedYet) {
      dispatch(setIsInitialLoadToFalse());
    }
  }, [isInitialLoad, isGettingAllRoutines, dataIsNotFetchedYet]);

  const renderLoader = dataIsNotFetchedYet || (isInitialLoad && isGettingAllRoutines) || isLoading;

  return { renderLoader };
};

export default useIndex;
