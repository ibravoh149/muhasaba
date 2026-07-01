import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { AuthBackground } from '@/components/auth-background';
import { Palette } from '@/constants/theme';
import { useAuth } from '@/context/auth';
import { api } from '@/lib/api';

type VerifyResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  onboarding_completed: boolean;
};

export default function VerifyEmailScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const { signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/(auth)/login');
      return;
    }

    async function verify() {
      try {
        const { data } = await api.post<VerifyResponse>('/auth/verify-token', { token });
        await signIn(data.access_token, data.refresh_token);
        router.replace(data.onboarding_completed ? '/(tabs)' : '/(setup)');
      } catch {
        router.replace('/(auth)/login');
      }
    }

    void verify();
  }, [token, signIn, router]);

  return (
    <AuthBackground>
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Palette.accent} />
      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
