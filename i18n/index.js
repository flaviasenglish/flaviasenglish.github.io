const pt = require('../public/locales/pt.json');
const ptBr = require('../public/locales/pt-BR.json');
const es = require('../public/locales/es.json');

const i18n = {
  translations: {
    'pt-BR': ptBr,
    pt,
    es,
  },
  defaultLang: 'pt-BR',
  useBrowserDefault: false,
  interpolation: {
    escapeValue: false,
  },
  nonExplicitSupportedLngs: true,
  debug: true,
};

module.exports = i18n;
