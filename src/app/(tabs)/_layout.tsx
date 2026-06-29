import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAuth } from '@/context/auth';

export default function TabsLayout() {
  const { accessToken, isLoading, hasOnboarded } = useAuth();

  if (isLoading) return null;
  if (!hasOnboarded) return <Redirect href="/(onboarding)" />;
  if (!accessToken) return <Redirect href="/(auth)/login" />;

  return <AppTabs />;
}
