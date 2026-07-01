import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useRouter } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import { AuthBackground } from "@/components/auth-background";
import { SetupProgress } from "@/components/setup-progress";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import {
  Fonts,
  FontSizes,
  LineHeights,
  Palette,
  Spacing,
} from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { useUpdateNotificationSettings } from "@/hooks/use-notification-settings";

function defaultTime() {
  const d = new Date();
  d.setHours(8, 0, 0, 0);
  return d;
}

export default function SetupNotificationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [time, setTime] = useState(defaultTime);
  const [showAndroidPicker, setShowAndroidPicker] = useState(false);
  const { saveSetup } = useAuth();
  const { mutate: updateSettings, isPending } = useUpdateNotificationSettings();

  function handleChange(_: unknown, selected: Date) {
    setTime(selected);
  }

  function handleAndroidChange(_: unknown, selected: Date) {
    setShowAndroidPicker(false);
    setTime(selected);
  }

  function handleContinue() {
    updateSettings(
      {
        daily_notification: {
          is_on: true,
          daily_notification_config: {
            notification_time: {
              hour: time.getHours(),
              minute: time.getMinutes(),
            },
          },
        },
      },
      {
        onSuccess: () => saveSetup(),
        onSettled: () => router.push("/(setup)/success"),
      },
    );
  }

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <AuthBackground variant="right">
      <View style={styles.container}>
        <View style={{ gap: Spacing.md, flex:1 }}>
          <ThemedText style={styles.logo}>{t("common.appName")}</ThemedText>
          <SetupProgress step={3} />

          <View style={styles.body}>
            <ThemedText type="subtitle" style={styles.title}>
              {t("setup.whenShouldWeRemind")}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {t("setup.remindersSubtitle")}
            </ThemedText>
          </View>

          {Platform.OS === "ios" ? (
            <View style={styles.pickerCard}>
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onValueChange={handleChange}
                textColor={Palette.white}
                themeVariant="dark"
                style={styles.picker}
              />
            </View>
          ) : (
            <>
              <Pressable
                style={styles.timeButton}
                onPress={() => setShowAndroidPicker(true)}
              >
                <ThemedText style={styles.timeText}>{formattedTime}</ThemedText>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={Palette.base400}
                />
              </Pressable>
              {showAndroidPicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="default"
                  onValueChange={handleAndroidChange}
                  onDismiss={() => setShowAndroidPicker(false)}
                />
              )}
            </>
          )}
        </View>
        <ThemedButton
          label={t("setup.continue")}
          onPress={handleContinue}
          loading={isPending}
          disabled={isPending}
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
    gap: Spacing.lg,
    justifyContent: "space-between",
  },
  body: {
    gap: Spacing.md,
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.xxl * 1.4,
    textTransform: "uppercase",
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
  pickerCard: {
    borderWidth: 1,
    borderColor: Palette.base700,
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    height: 180,
  },
  timeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Palette.base700,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  timeText: {
    fontSize: FontSizes.xl,
    color: Palette.white,
  },
});
