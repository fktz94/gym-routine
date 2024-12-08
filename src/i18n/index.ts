import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/translationEn";
import translationEs from "./locales/translationEs";

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
};

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
  });
};

initI18n();

export default i18n;
