import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthBackground } from "@/components/auth-background";
import { ThemedButton } from "@/components/themed-button";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import {
  Fonts,
  FontSizes,
  LineHeights,
  Palette,
  Spacing,
} from "@/constants/theme";
import { api } from "@/lib/api";
import { getApiError } from "@/lib/api-error";

const schema = z.object({
  email: z.email({ message: "validation.invalidEmail" }),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function onSubmit({ email }: FormValues) {
    setIsSubmitting(true);
    try {
      await api.post('/auth/request-password-reset', { email });
      router.replace({ pathname: "/(auth)/email-sent", params: { email } });
    } catch (e) {
      Alert.alert(t('common.error'), t(getApiError(e) as never));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthBackground variant="right">
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
          <View style={styles.heading}>
            <ThemedText type="subtitle" style={styles.title}>
              {t("auth.forgotPasswordTitle")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("auth.forgotPasswordSubtitle")}
            </ThemedText>

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
                  containerStyle={{marginTop: Spacing.md}}
                />
              )}
            />
          </View>

          <View style={styles.actions}>
            <ThemedButton
              label={t("auth.sendResetLink")}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            />

            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>
                {t("auth.rememberPassword")}
              </ThemedText>
              <Pressable onPress={() => router.back()} hitSlop={8}>
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
    marginTop: Spacing.xl,
  },
  heading: {
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSizes.xl,
    textAlign: "center",
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.sm * 1.6,
    textAlign: "center",
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
  actions: {
    gap: Spacing.md,
  },
});
