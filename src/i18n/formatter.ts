import { SupportedLanguage } from './index';

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  de: 'de-DE',
  fr: 'fr-FR',
  ha: 'en-US',
  yo: 'en-US',
  ig: 'en-US',
};

function getLocale(lang: SupportedLanguage): string {
  return LOCALE_MAP[lang];
}

export function formatDate(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatTime(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatDateTime(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(getLocale(lang), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatHijriDate(date: Date, lang: SupportedLanguage): string {
  return new Intl.DateTimeFormat(`${getLocale(lang)}-u-ca-islamic`, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatRelativeTime(date: Date, lang: SupportedLanguage): string {
  const rtf = new Intl.RelativeTimeFormat(getLocale(lang), { numeric: 'auto' });
  const diffMs = date.getTime() - Date.now();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);

  if (Math.abs(diffSecs) < 60) return rtf.format(diffSecs, 'second');
  if (Math.abs(diffMins) < 60) return rtf.format(diffMins, 'minute');
  if (Math.abs(diffHours) < 24) return rtf.format(diffHours, 'hour');
  if (Math.abs(diffDays) < 7) return rtf.format(diffDays, 'day');
  if (Math.abs(diffWeeks) < 5) return rtf.format(diffWeeks, 'week');
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, 'month');
  return rtf.format(diffYears, 'year');
}

export function formatNumber(value: number, lang: SupportedLanguage): string {
  return new Intl.NumberFormat(getLocale(lang)).format(value);
}

export function formatCurrency(
  value: number,
  currency: string,
  lang: SupportedLanguage,
): string {
  return new Intl.NumberFormat(getLocale(lang), {
    style: 'currency',
    currency,
  }).format(value);
}
