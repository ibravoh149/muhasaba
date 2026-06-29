import { Redirect, Stack } from "expo-router";

import { Palette } from "@/constants/theme";
import { useAuth } from "@/context/auth";

export default function AuthLayout() {
  const { accessToken, isLoading, hasOnboarded } = useAuth();

  if (isLoading) return null;
  if (!hasOnboarded) return <Redirect href="/(onboarding)" />;
  if (accessToken) return <Redirect href="/(tabs)" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Palette.background },
      }}
    />
  );
}
