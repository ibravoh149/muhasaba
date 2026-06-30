import '@/i18n';

import { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { MadimiOne_400Regular } from '@expo-google-fonts/madimi-one';
import { QueryClientProvider } from '@tanstack/react-query';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AuthProvider, useAuth } from '@/context/auth';
import { LanguageProvider } from '@/context/language';
import { queryClient } from '@/lib/query-client';

SplashScreen.preventAutoHideAsync();

function SplashController({ fontsLoaded }: Readonly<{ fontsLoaded: boolean }>) {
  const { isLoading } = useAuth();
  const ready = !isLoading && fontsLoaded;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) return null;

  return <AnimatedSplashOverlay />;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    MadimiOne_400Regular,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <LanguageProvider>
              <AuthProvider>
                <SplashController fontsLoaded={fontsLoaded} />
                <Slot />
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
