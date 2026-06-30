import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthBackground } from "@/components/auth-background";
import { OrDivider } from "@/components/or-divider";
import { SocialAuth } from "@/components/social-auth";
import { ThemedButton } from "@/components/themed-button";
import { ThemedInput } from "@/components/themed-input";
import { ThemedText } from "@/components/themed-text";
import { Fonts, FontSizes, Palette, Spacing } from "@/constants/theme";

const schema = z.object({
  email: z.email({ message: "validation.invalidEmail" }),
  password: z.string().min(1, { message: "validation.required" }),
});

type FormValues = z.infer<typeof schema>;

function handleSocialAuth(tokens: {
  access_token: string;
  refresh_token: string;
}) {
  console.log(tokens);
}

export default function LoginScreen() {
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
    // TODO: call auth API
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

        {/* <View style={styles.moonSpacer} /> */}

        <View style={styles.content}>
          <View style={styles.heading}>
            <ThemedText type="subtitle" style={styles.title}>
              {t("auth.welcomeBack")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("auth.welcomeSubtitle")}
            </ThemedText>
          </View>

          <View style={styles.form}>
            <SocialAuth onSuccess={handleSocialAuth} />
          </View>

          <OrDivider label={t("auth.or")} />

          <View style={styles.form}>
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
            <View style={styles.passwordBlock}>
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
                    textContentType="password"
                  />
                )}
              />
              <Pressable
                onPress={() => router.push("/(auth)/forgot-password")}
                style={styles.forgotRow}
                hitSlop={8}
              >
                <ThemedText style={styles.forgot}>
                  {t("auth.forgotPassword")}
                </ThemedText>
              </Pressable>
            </View>
          </View>

          <View style={styles.form}>
            <ThemedButton
              label={t("auth.logIn")}
              onPress={handleSubmit(onSubmit)}
            />

            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>
                {t("auth.noAccount")}
              </ThemedText>
              <Pressable
                onPress={() => router.replace("/(auth)/register")}
                hitSlop={8}
              >
                <ThemedText style={styles.link}>{t("auth.signUp")}</ThemedText>
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
    marginBottom: Spacing.md,
  },

  content: {
    gap: Spacing.lg,
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSizes.xl,
    textAlign: "center",
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  form: {
    gap: Spacing.md,
  },
  passwordBlock: {
    gap: Spacing.xs,
  },
  forgotRow: {
    alignSelf: "flex-end",
  },
  forgot: {
    color: Palette.accent,
    fontSize: FontSizes.md,
    fontFamily: Fonts.medium,
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
