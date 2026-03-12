import { createI18n } from "vue-i18n";
import es from "./locales/es.js";
import en from "./locales/en.js";

const savedLang = localStorage.getItem("lang") || "en";

// Sync <html lang=""> with the user's saved language preference
document.documentElement.lang = savedLang;

const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "en",
  messages: { es, en },
});

export default i18n;

