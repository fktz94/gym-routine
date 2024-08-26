import { useState } from "react";
import { WeightsAndRepetitions } from "../types/Routines";

const useCreateOrEditNewExercise = () => {
  const [name, setName] = useState("");
  const [hasWeeksVariations, setHasWeeksVariations] = useState(false);
  const [isCustomRepetitions, setIsCustomRepetitions] = useState(false);
  const [sets, setSets] = useState(3);
  const [variations, setVariations] = useState<WeightsAndRepetitions[]>([
    { qty: undefined, weight: undefined },
  ]);

  const handleName = (val: string) => setName(val);
  const handleSets = (val: number) => setSets(val);
  const toggleHasWeeksVariations = () => {
    if (!hasWeeksVariations) {
      setVariations((prev) => [...prev, ...Array(3).fill({ qty: undefined, weight: undefined })]);
    } else {
      setVariations((prev) => prev.slice(0, 1));
    }
    setHasWeeksVariations(!hasWeeksVariations);
  };

  const toggleCustomRepetitions = () => setIsCustomRepetitions(!isCustomRepetitions);

  const currentVariations = variations.length;

  const handleWeeksVariations = (val: number) => {
    if (val === currentVariations) return;
    if (val > currentVariations) {
      const variationsToAdd = val - currentVariations;
      setVariations((prev) => [
        ...prev,
        ...Array(variationsToAdd).fill({ qty: undefined, weight: undefined }),
      ]);
    }
    if (val < currentVariations) {
      setVariations((prev) => prev.slice(0, val));
    }
  };

  const handleRepetitionValues = (val: string, i: number) => {
    setVariations((prev) => prev.map((el, index) => (index === i ? { ...el, qty: val } : el)));
  };

  const dropdownValues = [...Array(10)].map((_, i) => i + 1);

  const areUncompletedRepetitions = variations.findIndex(({ qty }) => !qty);
  const isButtonDisabled = !name || areUncompletedRepetitions !== -1;

  return {
    currentVariations,
    dropdownValues,
    handleName,
    handleRepetitionValues,
    handleSets,
    handleWeeksVariations,
    hasWeeksVariations,
    isButtonDisabled,
    isCustomRepetitions,
    name,
    sets,
    toggleCustomRepetitions,
    toggleHasWeeksVariations,
    variations,
  };
};

export default useCreateOrEditNewExercise;
