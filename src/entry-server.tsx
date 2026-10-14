import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './App';
import { SITE_URL, createI18n, languages, type Language } from './i18n';
import { renderHead } from './seo';

// Used by scripts/prerender.js to build one static page per language
export const render = (lang: Language) => {
  const i18n = createI18n(lang.code);
  return {
    html: renderToString(
      <StrictMode>
        <App i18n={i18n} />
      </StrictMode>,
    ),
    head: renderHead(lang, i18n),
  };
};

export { SITE_URL, languages };
