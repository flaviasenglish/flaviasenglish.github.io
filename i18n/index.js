const en = require('../public/locales/en/common.json');
const es = require('../public/locales/es/common.json');
const pt = require('../public/locales/pt/common.json');

const i18n = {
  translations: {
    en: en.i18n,
    es: es.i18n,
    pt: pt.i18n,
  },
  defaultLang: 'en',
  useBrowserDefault: true,
};

module.exports = i18n;
