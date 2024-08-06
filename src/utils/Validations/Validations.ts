export function validateWeightInputNumber(inputValue: string | number) {
  return (
    inputValue === " " ||
    inputValue === 0 ||
    inputValue === "," ||
    inputValue === "." ||
    inputValue
      .toString()
      .split("")
      .filter((el) => el === "," || el === ".").length > 1
  );
}
