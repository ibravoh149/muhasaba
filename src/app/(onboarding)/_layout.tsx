import { Redirect, Stack } from "expo-router";

import { Palette } from "@/constants/theme";
import { useAuth } from "@/context/auth";

export default function OnboardingLayout() {
  const { isLoading, hasOnboarded, accessToken } = useAuth();

  if (isLoading) return null;
  if (hasOnboarded && accessToken) return <Redirect href="/(tabs)" />;
  if (hasOnboarded && !accessToken) return <Redirect href="/(auth)/get-started" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Palette.background,
        },
      }}
    />
  );
}
