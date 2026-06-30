import { Image, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import {
  BorderRadius,
  Fonts,
  FontSizes,
  Palette,
  Spacing,
} from "@/constants/theme";

import { ThemedText } from "./themed-text";

const SOCIAL_ICONS = {
  google: require("@/assets/images/google-icon.png"),
  facebook: require("@/assets/images/facebook-icon.png"),
};

const AUTH_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type Provider = "google" | "facebook";

export type SocialAuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  onboarding_completed: boolean;
};

type SocialAuthProps = {
  onSuccess: (tokens: SocialAuthTokens) => void;
  onError?: (error: string) => void;
};

type SocialButtonProps = {
  icon: Provider;
  label: string;
  onPress: () => void;
  style?: object;
};

function SocialButton({
  icon,
  label,
  onPress,
  style,
}: Readonly<SocialButtonProps>) {
  return (
    <Pressable style={[styles.socialBtn, style]} onPress={onPress}>
      <Image
        source={SOCIAL_ICONS[icon]}
        style={styles.socialIcon}
        resizeMode="contain"
      />
      <ThemedText style={styles.socialLabel}>{label}</ThemedText>
    </Pressable>
  );
}

export function SocialAuth({ onSuccess, onError }: Readonly<SocialAuthProps>) {
  const { t } = useTranslation();

  async function open(provider: Provider) {
    const { oauthUrl } = await fetch(
      `${AUTH_BASE_URL}/social-login/start?provider=${provider}`,
    ).then((r) => r.json());

    // Use bare scheme so both muhasaba://auth/callback and muhasaba://social-login are caught
    const result = await WebBrowser.openAuthSessionAsync(
      `${oauthUrl}`,
      Linking.createURL(""),
    );

    if (result.type !== "success") return;

    const { queryParams } = Linking.parse(result.url);
    const success = queryParams?.success === "true";

    if (!success) {
      const raw = (queryParams?.error as string) ?? '';
      if (raw.toLowerCase().includes('cancel')) return;
      const key = raw.includes('duplicate key') || raw.includes('E11000')
        ? 'auth.emailAlreadyExists'
        : 'common.error';
      onError?.(key);
      return;
    }

    const access_token = queryParams?.access_token as string | undefined;
    const refresh_token = queryParams?.refresh_token as string | undefined;
    const expires_in = Number(queryParams?.expires_in ?? 900);
    const onboarding_completed = queryParams?.onboarding_completed === "true";

    if (access_token && refresh_token) {
      onSuccess({
        access_token,
        refresh_token,
        expires_in,
        onboarding_completed,
      });
    } else {
      onError?.("auth/missingTokens");
    }
  }

  return (
    <>
      <SocialButton
        icon="google"
        label={t("auth.continueWithGoogle")}
        onPress={() => {
          void open("google");
        }}
        style={styles.googleBtn}
      />
      <SocialButton
        icon="facebook"
        label={t("auth.continueWithFacebook")}
        onPress={() => {
          void open("facebook");
        }}
        style={styles.facebookBtn}
      />
    </>
  );
}

const styles = StyleSheet.create({
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Palette.base700,
    backgroundColor: Palette.secondaryTint,
    height: 52,
  },
  googleBtn: {
    backgroundColor: Palette.background,
    borderColor: Palette.primary,
  },
  facebookBtn: {
    backgroundColor: "transparent",
    borderColor: Palette.accent,
    borderWidth: 0.5,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialLabel: {
    color: Palette.white,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
  },
});
