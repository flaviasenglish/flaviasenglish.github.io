import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';

import { App } from './App';
import {
  createI18n,
  defaultLanguage,
  findLanguage,
  languageFromPath,
  matchBrowserLanguage,
} from './i18n';
import { getStoredLanguage } from './utils/languagePreference';

import 'material-icons/iconfont/filled.css';
import 'material-icons/iconfont/round.css';
import 'react-multi-carousel/lib/styles.css';
import './styles/main.css';

// Sends visitors to the page in their language when they land on the
// default one: old "?lang=" links, a language they picked before, or their
// browser's language. Returns true when it is navigating away.
const redirectToPreferredLanguage = () => {
  const { pathname, search, hash } = window.location;
  const current = languageFromPath(pathname);
  const fromQuery = findLanguage(new URLSearchParams(search).get('lang'));

  let target = fromQuery;
  if (!target && current === defaultLanguage) {
    target =
      findLanguage(getStoredLanguage()) ??
      matchBrowserLanguage(navigator.language);
  }

  if (target && (target !== current || fromQuery)) {
    window.location.replace(target.path + hash);
    return true;
  }
  return false;
};

if (!redirectToPreferredLanguage()) {
  ReactGA.initialize('G-1XW09QDNP6');

  const lang = languageFromPath(window.location.pathname);
  const app = (
    <StrictMode>
      <App i18n={createI18n(lang.code)} />
    </StrictMode>
  );

  const root = document.getElementById('root')!;
  // Pages are prerendered at build time; in dev the root starts empty
  if (root.hasChildNodes()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}
