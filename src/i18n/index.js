import { createI18n } from "vue-i18n";
import es from "./locales/es.js";
import en from "./locales/en.js";

const savedLang = localStorage.getItem("lang") || "es";

const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "es",
  messages: { es, en },
});

export default i18n;
