import { Pressable, ScrollView, StyleSheet, View } from "react-native";
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
import { FontSizes, LineHeights, Palette, Spacing } from "@/constants/theme";

const schema = z
  .object({
    newPassword: z.string().min(8, { message: "validation.passwordTooShort" }),
    confirmPassword: z.string().min(1, { message: "validation.required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "validation.passwordsMustMatch",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  function onSubmit(_data: FormValues) {
    router.replace("/(auth)/reset-success");
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
              {t("auth.createNewPassword")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("auth.createNewPasswordSubtitle")}
            </ThemedText>
            <View style={styles.form}>
              <Controller
                control={control}
                name="newPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <ThemedInput
                    placeholder={t("auth.newPassword")}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.newPassword?.message}
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
          </View>

          <ThemedButton
            label={t("auth.resetPassword")}
            onPress={handleSubmit(onSubmit)}
          />
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
    marginTop: Spacing.xxl,
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
  form: {
    gap: Spacing.md,
    marginTop: Spacing.xxl,
  },
});
