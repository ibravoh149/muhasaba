import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Localization from 'expo-localization';
import * as Updates from 'expo-updates';

import i18n, {
  isSupportedLanguage,
  RTL_LANGUAGES,
  SupportedLanguage,
} from '@/i18n';

const LANGUAGE_KEY = 'app_language';

type LanguageContextValue = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolveDeviceLanguage(): SupportedLanguage {
  const locales = Localization.getLocales();
  for (const locale of locales) {
    const code = locale.languageCode ?? '';
    if (isSupportedLanguage(code)) return code;
  }
  return 'en';
}

async function applyLanguage(lang: SupportedLanguage) {
  await i18n.changeLanguage(lang);

  const shouldBeRTL = RTL_LANGUAGES.includes(lang);
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
    await Updates.reloadAsync();
  }
}

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    async function init() {
      const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
      const resolved = isSupportedLanguage(stored ?? '') ? (stored as SupportedLanguage) : resolveDeviceLanguage();
      await applyLanguage(resolved);
      setLanguage(resolved);
    }
    init();
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: async (lang) => {
        await AsyncStorage.setItem(LANGUAGE_KEY, lang);
        await applyLanguage(lang);
        setLanguage(lang);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export { LANGUAGE_LABELS,SUPPORTED_LANGUAGES } from '@/i18n';
export type { SupportedLanguage };
