import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { AuthBackground } from '@/components/auth-background';
import { AuthInput } from '@/components/auth-input';
import { OrDivider } from '@/components/or-divider';
import { ThemedButton } from '@/components/themed-button';
import { ThemedText } from '@/components/themed-text';
import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

function SocialButton({ icon, label, onPress }: Readonly<{ icon: 'google' | 'facebook'; label: string; onPress: () => void }>) {
  return (
    <Pressable style={styles.socialBtn} onPress={onPress}>
      <FontAwesome5
        name={icon === 'google' ? 'google' : 'facebook-f'}
        size={16}
        color={Palette.white}
      />
      <ThemedText style={styles.socialLabel}>{label}</ThemedText>
    </Pressable>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <ThemedText type="subtitle" style={styles.title}>{t('auth.createAccount')}</ThemedText>

            <View style={styles.form}>
              <SocialButton icon="google" label={t('auth.continueWithGoogle')} onPress={() => {}} />
              <SocialButton icon="facebook" label={t('auth.continueWithFacebook')} onPress={() => {}} />
              <OrDivider label={t('auth.or')} />
              <View style={styles.nameRow}>
                <AuthInput
                  label={t('auth.firstName')}
                  placeholder="Ibrahim"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  containerStyle={styles.nameField}
                />
                <AuthInput
                  label={t('auth.lastName')}
                  placeholder="Ali"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  containerStyle={styles.nameField}
                />
              </View>
              <AuthInput
                label={t('auth.emailAddress')}
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                textContentType="emailAddress"
              />
              <AuthInput
                label={t('auth.password')}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="newPassword"
              />
            </View>

            <ThemedButton label={t('auth.createAccount')} onPress={() => {}} />

            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>{t('auth.alreadyHaveAccount')}</ThemedText>
              <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
                <ThemedText style={styles.link}>{t('auth.logIn')}</ThemedText>
              </Pressable>
            </View>
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
  title: {
    fontSize: FontSizes.xl,
  },
  form: {
    gap: Spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  nameField: {
    flex: 1,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Palette.secondaryTint,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Palette.base700,
    height: 52,
  },
  socialLabel: {
    color: Palette.white,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
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
