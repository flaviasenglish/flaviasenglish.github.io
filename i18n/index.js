const pt = require('../public/locales/pt.json');
const en = require('../public/locales/en.json');
const ptBr = require('../public/locales/pt-BR.json');

const i18n = {
  translations: {
    'pt-BR': ptBr,
    pt,
    en,
  },
  defaultLang: 'en',
  useBrowserDefault: false,
  interpolation: {
    escapeValue: false,
  },
  nonExplicitSupportedLngs: true,
  debug: true,
};

module.exports = i18n;
