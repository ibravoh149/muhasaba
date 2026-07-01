import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthBackground } from "@/components/auth-background";
import { OrDivider } from "@/components/or-divider";
import { SocialAuth, type SocialAuthTokens } from "@/components/social-auth";
import { ThemedButton } from "@/components/themed-button";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { Fonts, FontSizes, Palette, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { api } from "@/lib/api";
import { getApiError } from "@/lib/api-error";

let schema = z.object({
  firstName: z.string().min(1, { message: "validation.required" }),
  lastName: z.string().min(1, { message: "validation.required" }),
  email: z.email({ message: "validation.invalidEmail" }),
  password: z.string().min(8, { message: "validation.passwordTooShort" }),
  confirmPassword: z.string().min(1, { message: "validation.required" }),
});

schema = schema.refine((data) => data.password === data.confirmPassword, {
  message: "validation.passwordsMustMatch",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSocialAuth(tokens: SocialAuthTokens) {
    await signIn(tokens.access_token, tokens.refresh_token);
    router.replace(tokens.onboarding_completed ? '/(tabs)' : '/(setup)');
  }

  function handleSocialError(error: string) {
    Alert.alert(t('auth.socialAuthFailed'), t(error as never));
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function onSubmit({ email, password, firstName, lastName }: FormValues) {
    setIsSubmitting(true);
    try {
      await api.post('/auth/register', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });
      router.replace({ pathname: '/(auth)/email-sent', params: { email, type: 'verify' } });
    } catch (e) {
      Alert.alert(t('common.error'), t(getApiError(e) as never));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthBackground>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable
          onPress={() => router.back()}
          style={styles.back}
          hitSlop={8}
        >
          <Ionicons name="chevron-back" size={24} color={Palette.white} />
        </Pressable>

        <View style={styles.content}>
          <ThemedText type="subtitle" style={styles.title}>
            {t("auth.createAccount")}
          </ThemedText>
          <View style={styles.form}>
            <SocialAuth onSuccess={handleSocialAuth} onError={handleSocialError} />
          </View>

          <OrDivider label={t("auth.or")} />

          <View style={styles.form}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t("auth.firstName")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                  autoCapitalize="words"
                  containerStyle={styles.nameField}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t("auth.lastName")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                  autoCapitalize="words"
                  containerStyle={styles.nameField}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t("auth.emailAddress")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t("auth.password")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  textContentType="newPassword"
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <ThemedInput
                  placeholder={t("auth.confirmPassword")}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  textContentType="newPassword"
                />
              )}
            />
          </View>
          <View style={styles.form}>
            <ThemedButton
              label={t("auth.createAccount")}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || Object.keys(errors).length > 0}
            />
            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>
                {t("auth.alreadyHaveAccount")}
              </ThemedText>
              <Pressable
                onPress={() => router.replace("/(auth)/login")}
                hitSlop={8}
              >
                <ThemedText style={styles.link}>{t("auth.logIn")}</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  back: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
    alignSelf: "flex-start",
    marginTop: Spacing.xxl,
  },
  content: {
    gap: Spacing.lg,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: FontSizes.xl,
    textAlign: "center",
  },
  form: {
    gap: Spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  nameField: {
    flex: 1,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  linkText: {
    color: Palette.base400,
    fontSize: FontSizes.md,
  },
  link: {
    color: Palette.accent,
    fontSize: FontSizes.md,
    fontFamily: Fonts.semiBold,
  },
});
