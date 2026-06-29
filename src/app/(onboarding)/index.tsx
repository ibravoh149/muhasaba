import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { SelectOption } from '@/components/select-option';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';
import { LANGUAGE_LABELS, SupportedLanguage, useLanguage } from '@/context/language';
import i18n from '@/i18n';

const ONBOARDING_LANGUAGES: SupportedLanguage[] = ['en', 'fr', 'ar', 'de'];

const LANGUAGE_FLAGS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇦🇪',
  de: '🇩🇪',
};

export default function SelectLanguageScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [selected, setSelected] = useState<SupportedLanguage>(language);

  async function handleContinue() {
    await setLanguage(selected);
    router.push('/(onboarding)/slides');
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.appName}>{t('common.appName').toUpperCase()}</Text>
        <ThemedText style={styles.subtitle}>{t('onboarding.selectLanguage')}</ThemedText>

        <View style={styles.list}>
          {ONBOARDING_LANGUAGES.map((lang) => (
            <SelectOption
              key={lang}
              label={LANGUAGE_LABELS[lang]}
              icon={LANGUAGE_FLAGS[lang]}
              selected={selected === lang}
              onPress={() => { setSelected(lang); i18n.changeLanguage(lang); }}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <ThemedText style={styles.hint} themeColor="textSecondary">
          {t('onboarding.languageHint')}
        </ThemedText>
        <ThemedButton label={t('onboarding.continue')} onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  appName: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xxl,
    color: Palette.white,
    letterSpacing: 2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    marginBottom: Spacing.sm,
    minHeight: FontSizes.md * 1.5 * 2,
  },
  list: {
    width: '100%',
    gap: Spacing.sm,
  },
  bottom: {
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },
  hint: {
    textAlign: 'center',
    fontSize: FontSizes.sm,
    minHeight: FontSizes.sm * 1.5 * 2,
  },
});
