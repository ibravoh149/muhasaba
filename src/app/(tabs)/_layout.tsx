import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAuth } from '@/context/auth';

export default function TabsLayout() {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return null;
  if (!accessToken) return <Redirect href="/(auth)/login" />;

  return <AppTabs />;
}
