import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { AuthBackground } from '@/components/auth-background';
import { AuthInput } from '@/components/auth-input';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { FontSizes, LineHeights, Palette, Spacing } from '@/constants/theme';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleReset() {
    router.replace('/(auth)/reset-success');
  }

  return (
    <View style={styles.container}>
      <AuthBackground variant="right" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kav}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => router.back()} style={styles.back} hitSlop={8}>
            <Ionicons name="chevron-back" size={24} color={Palette.white} />
          </Pressable>

          <View style={styles.moonSpacer} />

          <View style={styles.content}>
            <View style={styles.heading}>
              <ThemedText type="subtitle" style={styles.title}>
                {t('auth.createNewPassword')}
              </ThemedText>
              <ThemedText style={styles.subtitle}>
                {t('auth.createNewPasswordSubtitle')}
              </ThemedText>
            </View>

            <View style={styles.form}>
              <AuthInput
                label={t('auth.newPassword')}
                placeholder="••••••••"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                textContentType="newPassword"
              />
              <AuthInput
                label={t('auth.confirmPassword')}
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                textContentType="newPassword"
              />
            </View>

            <ThemedButton
              label={t('auth.resetPassword')}
              onPress={handleReset}
              disabled={!newPassword || !confirmPassword}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  back: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    alignSelf: 'flex-start',
  },
  moonSpacer: {
    height: 140,
  },
  content: {
    gap: Spacing.lg,
  },
  heading: {
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xl,
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm * 1.6,
  },
  form: {
    gap: Spacing.md,
  },
});
