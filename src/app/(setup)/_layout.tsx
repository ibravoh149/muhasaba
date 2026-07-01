import { Redirect, Stack } from 'expo-router';

import { Palette } from '@/constants/theme';
import { useAuth } from '@/context/auth';

export default function SetupLayout() {
  const { accessToken, isLoading, setupCompleted } = useAuth();

  if (isLoading) return null;
  if (!accessToken) return <Redirect href="/(auth)/login" />;
  if (setupCompleted) return <Redirect href="/(tabs)" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Palette.primary },
      }}
    />
  );
}
