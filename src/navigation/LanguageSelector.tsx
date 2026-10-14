import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'pt-BR', short: 'BR', name: 'Português (BR)' },
  { code: 'pt', short: 'PT', name: 'Português (PT)' },
  { code: 'es', short: 'ES', name: 'Español' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const current =
    languages.find((lang) => lang.code === i18n.resolvedLanguage) ??
    languages[0]!;

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    // Keep the choice in the URL so the link can be shared
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.history.replaceState(null, '', url);
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
