import { useMemo } from 'react';

import { useLanguage } from '@/context/language';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatHijriDate,
  formatNumber,
  formatRelativeTime,
  formatTime,
} from '@/i18n/formatter';

export function useFormatter() {
  const { language } = useLanguage();

  return useMemo(
    () => ({
      date: (d: Date) => formatDate(d, language),
      time: (d: Date) => formatTime(d, language),
      dateTime: (d: Date) => formatDateTime(d, language),
      hijriDate: (d: Date) => formatHijriDate(d, language),
      relativeTime: (d: Date) => formatRelativeTime(d, language),
      number: (n: number) => formatNumber(n, language),
      currency: (n: number, currency: string) => formatCurrency(n, currency, language),
    }),
    [language],
  );
}
