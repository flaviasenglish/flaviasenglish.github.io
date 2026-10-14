// The language the visitor picked in the selector, remembered so that
// landing on the default page later takes them back to it

const KEY = 'lang';

export const getStoredLanguage = () => {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

export const storeLanguage = (code: string) => {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies)
  }
};
