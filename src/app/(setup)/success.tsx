import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AuthBackground } from '@/components/auth-background';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { FontSizes, LineHeights, Palette, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/auth';

export default function SetupSuccessScreen() {
  const { t } = useTranslation();
  const { completeSetup } = useAuth();

  return (
    <AuthBackground variant="right">
      <View style={styles.container}>
        <View style={styles.body}>
          <ThemedText type="subtitle" style={styles.title}>
            {t('setup.welcomeToMushasaba')}
          </ThemedText>
          <ThemedText style={styles.allSet}>{t('setup.allSet')}</ThemedText>
          <ThemedText style={styles.subtitle}>{t('setup.allSetSubtitle')}</ThemedText>
        </View>

        <ThemedButton
          label={t('setup.startJourney')}
          onPress={completeSetup}
        />
      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.xxl,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xxl,
    textAlign: 'center',
  },
  allSet: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    color: Palette.white,
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.sm * 1.6,
    textAlign: 'center',
  },
});
