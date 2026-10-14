import { useTranslation } from 'react-i18next';

import { findLanguage, languages } from '../i18n';
import { storeLanguage } from '../utils/languagePreference';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const current = findLanguage(i18n.language) ?? languages[0];

  const changeLanguage = (code: string) => {
    const lang = findLanguage(code);
    if (!lang) return;
    storeLanguage(lang.code);
    // Each language is its own prerendered page
    window.location.assign(lang.path);
  };

  // The visible pill is just a label; a transparent native <select> sits on
  // top of it, so the pill can stay compact while the list shows full names
  return (
    <div className="relative flex items-center gap-1 rounded-full border-2 border-bg_blue-0 bg-white py-0.5 pr-1 pl-1.5 text-xs font-bold text-bg_blue-0 focus-within:ring-2 focus-within:ring-bg_blue-0/40 xl:pr-1.5 xl:pl-2 xl:text-sm">
      <span className="material-icons-round text-base!" aria-hidden="true">
        language
      </span>
      <span aria-hidden="true">
        <span className="xl:hidden">{current.short}</span>
        <span className="hidden xl:inline">{current.name}</span>
      </span>
      <span className="material-icons-round text-base!" aria-hidden="true">
        expand_more
      </span>
      <select
        aria-label="Idioma / Language"
        value={current.code}
        onChange={(event) => changeLanguage(event.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { LanguageSelector };
