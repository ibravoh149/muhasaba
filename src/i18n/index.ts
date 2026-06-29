import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import ar from './locales/ar';
import de from './locales/de';
import en from './locales/en';
import fr from './locales/fr';
import ha from './locales/ha';
import ig from './locales/ig';
import yo from './locales/yo';

export const SUPPORTED_LANGUAGES = ['en', 'ar', 'de', 'fr', 'ha', 'yo', 'ig'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: SupportedLanguage[] = ['ar'];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  fr: 'Français',
  ha: 'Hausa',
  yo: 'Yorùbá',
  ig: 'Igbo',
};

export function isSupportedLanguage(code: string): code is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(code as SupportedLanguage);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    de: { translation: de },
    fr: { translation: fr },
    ha: { translation: ha },
    yo: { translation: yo },
    ig: { translation: ig },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
