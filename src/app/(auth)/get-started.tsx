import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import { useRouter } from "expo-router";

import { AuthBackground } from "@/components/auth-background";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { Fonts, FontSizes, Palette, Spacing } from "@/constants/theme";
export default function GetStartedScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthBackground>
      <View style={styles.inner}>
        <View style={styles.spacer} />
        <View style={styles.content}>
          <View style={styles.heading}>
            <ThemedText type="subtitle" style={styles.title}>
              {t("auth.beginYourJourney")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("auth.beginSubtitle")}
            </ThemedText>
          </View>
          <View style={styles.actions}>
            <ThemedButton
              label={t("auth.createAccount")}
              onPress={() => router.push("/(auth)/register")}
            />
            <View style={styles.linkRow}>
              <ThemedText style={styles.linkText}>
                {t("auth.alreadyHaveAccount")}
              </ThemedText>
              <Pressable
                onPress={() => router.push("/(auth)/login")}
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
    paddingBottom: Spacing.xl + Spacing.md,
  },

  spacer: {
    flex: 1,
  },

  content: {
    gap: Spacing.xl,
    justifyContent: "space-between",
    height: Dimensions.get("window").height * 0.43,
  },
  heading: {
    gap: Spacing.sm,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.xl,
  },
  subtitle: {
    textAlign: "center",
    color: Palette.base400,
    fontSize: FontSizes.md,
  },
  actions: {
    gap: Spacing.md,
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
