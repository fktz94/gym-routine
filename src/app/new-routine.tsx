import NewRoutineProvider from "../contexts/NewRoutine/NewRoutineProvider";
import MainContainer from "../components/NewRoutine/MainContainer";

const NewRoutine = () => {
  return (
    <NewRoutineProvider>
      <MainContainer />
    </NewRoutineProvider>
  );
};

export default NewRoutine;
