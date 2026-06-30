import { Linking, Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useLocalSearchParams, useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { AuthBackground } from "@/components/auth-background";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import {
  Fonts,
  FontSizes,
  LineHeights,
  Palette,
  Spacing,
} from "@/constants/theme";

export default function EmailSentScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <AuthBackground variant="center">
      <View style={styles.inner}>
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
              {t("auth.checkYourEmail")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("auth.emailSentTo")}
            </ThemedText>
            {email ? (
              <ThemedText style={styles.emailDisplay}>{email}</ThemedText>
            ) : null}
          </View>
          <ThemedText style={styles.subtitle}>
            {t("auth.emailSentInstructions")}
          </ThemedText>

          <ThemedText style={styles.hint}>{t("auth.didntReceive")}</ThemedText>

          <View style={styles.actions}>
            <View style={styles.actions}>
              <ThemedButton
                label={t("auth.openEmailApp")}
                onPress={() => Linking.openURL("mailto:")}
              />
            </View>

            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>
                {t("auth.rememberPassword")}
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
      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
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
    lineHeight: LineHeights.sm * 1.6,
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  emailDisplay: {
    color: Palette.white,
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    textAlign: "center",
  },
  hint: {
    color: Palette.base500,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.xs * 1.6,
    textAlign: "center",
  },
  actions: {
    gap: Spacing.sm,
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
