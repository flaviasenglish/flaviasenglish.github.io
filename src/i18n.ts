import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import ptBR from './locales/pt-BR.json';
import pt from './locales/pt.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      pt: { translation: pt },
      es: { translation: es },
    },
    supportedLngs: ['pt-BR', 'pt', 'es'],
    // Lets e.g. "es-MX" and "pt-PT" resolve to "es" and "pt"
    nonExplicitSupportedLngs: true,
    fallbackLng: 'pt-BR',
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lang',
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', () => {
  document.documentElement.lang = i18n.resolvedLanguage ?? 'pt-BR';
});
document.documentElement.lang = i18n.resolvedLanguage ?? 'pt-BR';

export default i18n;
