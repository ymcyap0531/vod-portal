import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en_US",
  lng: "en_US",
  resources: {
    en_US: {
      translations: require("./locales/en_US/translations.json"),
    },
    // nl_NL: {
    //   translations: require("./locales/nl_NL/translations.json"),
    // },
  },
  ns: ["translations"],
  defaultNS: "translations",
});

i18n.languages = ["en_US"];

export default i18n;
