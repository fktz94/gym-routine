import { Strings } from "@/src/constants/Strings";
import translationEs from "@/src/i18n/locales/translationEs";

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

export const parsedWeightTxt = ({
  txt,
  language,
}: {
  txt: string | undefined;
  language: string | undefined;
}) => {
  if (!txt) return;
  if (!!!txt?.includes(Strings.EachSide) || language === "en") return txt;
  let weightTxt;
  switch (language) {
    case "es":
      weightTxt = txt.replace(Strings.EachSide, translationEs.each);
      break;
    default:
      weightTxt = txt;
      break;
  }
  return weightTxt;
};
