import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// ----------------------------------------------------------------------

const options = {
  loadPath: '/locales/{{lng}}/{{ns}}.json'
};

export const i18nFallbackLanguage = 'en';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || i18nFallbackLanguage,
    fallbackLng: i18nFallbackLanguage,
    debug: false,
    cleanCode: true,

    // backend
    backend: options,

    react: {
      useSuspense: false
    }
  });

export default i18n;
