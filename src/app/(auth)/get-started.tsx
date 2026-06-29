import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { AuthBackground } from '@/components/auth-background';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, FontSizes, LineHeights, Palette, Spacing } from '@/constants/theme';

export default function GetStartedScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AuthBackground variant="center" />
      <View style={styles.inner}>
        <View style={styles.spacer} />
        <View style={styles.content}>
          <View style={styles.heading}>
            <ThemedText type="subtitle" style={styles.title}>
              {t('auth.beginYourJourney')}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t('auth.beginSubtitle')}
            </ThemedText>
          </View>
          <View style={styles.actions}>
            <ThemedButton
              label={t('auth.createAccount')}
              onPress={() => router.push('/(auth)/register')}
            />
            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>{t('auth.alreadyHaveAccount')}</ThemedText>
              <Pressable onPress={() => router.push('/(auth)/login')} hitSlop={8}>
                <ThemedText style={styles.link}>{t('auth.logIn')}</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl + Spacing.md,
  },
  spacer: {
    flex: 1,
  },
  content: {
    gap: Spacing.xl,
  },
  heading: {
    gap: Spacing.sm,
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.xxl,
  },
  subtitle: {
    textAlign: 'center',
    color: Palette.base400,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md * 1.4,
  },
  actions: {
    gap: Spacing.md,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    color: Palette.base400,
    fontSize: FontSizes.sm,
  },
  link: {
    color: Palette.accent,
    fontSize: FontSizes.sm,
    fontFamily: Fonts.semiBold,
  },
});
