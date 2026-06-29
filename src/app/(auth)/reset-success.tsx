import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { AuthBackground } from '@/components/auth-background';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { FontSizes, LineHeights, Palette, Spacing } from '@/constants/theme';

export default function ResetSuccessScreen() {
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
              {t('auth.passwordUpdated')}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t('auth.passwordUpdatedSubtitle')}
            </ThemedText>
          </View>
          <ThemedButton
            label={t('auth.goToLogin')}
            onPress={() => router.replace('/(auth)/login')}
          />
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
});
