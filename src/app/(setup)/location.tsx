import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";

import * as Location from "expo-location";
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
import { api } from "@/lib/api";
import { getApiError } from "@/lib/api-error";

export default function SetupLocationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locationSet, setLocationDone, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (locationSet) router.replace("/(setup)/goals");
  }, [locationSet, router]);

  async function handleCurrentLocation() {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          t("setup.locationDeniedTitle"),
          t("setup.locationDeniedMessage"),
          [
            { text: t("common.cancel"), style: "cancel" },
            {
              text: t("setup.openSettings"),
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      await api.patch("/users/profile", {
        location: { latitude: coords.latitude, longitude: coords.longitude },
        first_name: user?.firstName,
        last_name: user?.lastName,
      });

      setLocationDone();
      router.push("/(setup)/goals");
    } catch (e) {
      Alert.alert(t("common.error"), t(getApiError(e) as never));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthBackground variant="right">
      <View style={styles.container}>
        <ThemedText style={styles.logo}>{t("common.appName")}</ThemedText>
        <SetupProgress step={1} />

        <View style={styles.body}>
          <ThemedText type="subtitle" style={styles.title}>
            {t("setup.setYourLocation")}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t("setup.locationSubtitle")}
          </ThemedText>
        </View>

        <ThemedButton
          label={t("setup.useCurrentLocation")}
          onPress={handleCurrentLocation}
          loading={isLoading}
          icon={
            <Ionicons name="location-outline" size={18} color={Palette.white} />
          }
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
    justifyContent: "space-between",
  },
  body: {
    gap: Spacing.md,
    alignItems: "center",
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
});
