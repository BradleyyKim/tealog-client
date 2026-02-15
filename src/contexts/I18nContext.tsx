import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Locale, type TranslationKey, translations, LOCALE_KEY } from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored === 'ko' || stored === 'en') return stored;
  return 'ko';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_KEY, l);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key] ?? key,
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
