import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/auth';
import { LanguageProvider } from '@/context/language';

SplashScreen.preventAutoHideAsync();

function SplashController() {
  const { isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) return null;

  return <AnimatedSplashOverlay />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LanguageProvider>
        <AuthProvider>
          <SplashController />
          <Slot />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
