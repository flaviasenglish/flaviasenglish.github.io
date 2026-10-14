import i18next, { type i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './locales/es.json';
import ptBR from './locales/pt-BR.json';
import pt from './locales/pt.json';

export const SITE_URL = 'https://www.flaviaforcatho.com';

// Each language is served (and prerendered) at its own path
export const languages = [
  {
    code: 'pt-BR',
    path: '/',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
    short: 'BR',
    name: 'Português (BR)',
  },
  {
    code: 'pt',
    path: '/pt/',
    hreflang: 'pt-PT',
    ogLocale: 'pt_PT',
    short: 'PT',
    name: 'Português (PT)',
  },
  {
    code: 'es',
    path: '/es/',
    hreflang: 'es',
    ogLocale: 'es_ES',
    short: 'ES',
    name: 'Español',
  },
] as const;

export type Language = (typeof languages)[number];
export type LanguageCode = Language['code'];

export const defaultLanguage = languages[0];

export const findLanguage = (code: string | null | undefined) =>
  languages.find((lang) => lang.code === code);

export const languageFromPath = (pathname: string): Language =>
  languages.find(
    (lang) => lang.path !== '/' && pathname.startsWith(lang.path),
  ) ?? defaultLanguage;

// Maps a browser language like "es-MX" or "pt-PT" to one of ours
export const matchBrowserLanguage = (browserLang: string) =>
  findLanguage(browserLang) ?? findLanguage(browserLang.split('-')[0]);

export const createI18n = (lng: LanguageCode): i18n => {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources: {
      'pt-BR': { translation: ptBR },
      pt: { translation: pt },
      es: { translation: es },
    },
    lng,
    fallbackLng: 'pt-BR',
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
  });
  return instance;
};
