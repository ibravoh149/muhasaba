import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { AuthBackground } from '@/components/auth-background';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { Fonts, FontSizes, LineHeights, Palette, Spacing } from '@/constants/theme';

export default function SetupIntroScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <AuthBackground variant="center">
      <View style={styles.container}>

        <View style={styles.body}>
        <ThemedText style={styles.logo}>{t('common.appName')}</ThemedText>

          <ThemedText type="subtitle" style={styles.title}>
            {t('setup.letsSetUp')}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('setup.letsSetUpSubtitle')}
          </ThemedText>
        </View>

        <ThemedButton
          label={t('setup.getStarted')}
          onPress={() => router.push('/(setup)/location')}
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
  logo: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.xxl,
    lineHeight: FontSizes.xxl * 1.4,
    textAlign: 'center',
    textTransform:"uppercase"
  },
  body: {
    gap: Spacing.md,
    justifyContent:"center",
    flex:1,
  },
  title: {
    fontSize: FontSizes.xl,
    textAlign: 'center',
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.sm * 1.6,
    textAlign: 'center',
  },
});
