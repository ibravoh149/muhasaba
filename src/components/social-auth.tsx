import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { Ionicons } from '@expo/vector-icons';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

const SOCIAL_ICONS = {
  google: require('@/assets/images/google-icon.png'),
  facebook: require('@/assets/images/facebook-icon.png'),
};

const AUTH_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

type Provider = 'google' | 'facebook';

type SocialAuthTokens = {
  access_token: string;
  refresh_token: string;
};

type SocialAuthProps = {
  onSuccess: (tokens: SocialAuthTokens) => void;
  onError?: (error: string) => void;
};

type SocialButtonProps = {
  icon: Provider;
  label: string;
  onPress: () => void;
  style?: object;
};

function SocialButton({ icon, label, onPress, style }: Readonly<SocialButtonProps>) {
  return (
    <Pressable style={[styles.socialBtn, style]} onPress={onPress}>
      <Image source={SOCIAL_ICONS[icon]} style={styles.socialIcon} resizeMode="contain" />
      <ThemedText style={styles.socialLabel}>{label}</ThemedText>
    </Pressable>
  );
}

export function SocialAuth({ onSuccess, onError }: Readonly<SocialAuthProps>) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  function open(p: Provider) {
    setLoading(true);
    setProvider(p);
  }

  function close() {
    setProvider(null);
  }

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const data = JSON.parse(event.nativeEvent.data) as Partial<SocialAuthTokens>;
      if (data.access_token && data.refresh_token) {
        console.log('Received tokens:', data);
        // close();
        // onSuccess({ access_token: data.access_token, refresh_token: data.refresh_token });
      }
    } catch {
      onError?.('Failed to parse auth response');
    }
  }

  const authUrl = provider ? `${AUTH_BASE_URL}/auth/${provider}` : '';

  return (
    <>
      <SocialButton
        icon="google"
        label={t('auth.continueWithGoogle')}
        onPress={() => open('google')}
        style={styles.googleBtn}
      />
      <SocialButton
        icon="facebook"
        label={t('auth.continueWithFacebook')}
        onPress={() => open('facebook')}
        style={styles.facebookBtn}
      />

      <Modal
        visible={!!provider}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={close}
      >
        <View style={[styles.sheet, ...(Platform.OS === 'android' ? [{ paddingTop: insets.top }] : [])]}>
          <View style={styles.sheetHeader}>
            <ThemedText style={styles.sheetTitle}>
              {provider === 'google' ? 'Google' : 'Facebook'}
            </ThemedText>
            <Pressable onPress={close} hitSlop={8}>
              <Ionicons name="close" size={22} color={Palette.base300} />
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator color={Palette.primary} size="large" />
            </View>
          ) : null}

          {provider ? (
            <WebView
              source={{ uri: authUrl }}
              style={[styles.webview, loading && styles.hidden]}
              onLoadEnd={() => setLoading(false)}
              onMessage={handleMessage}
              // Prevents the WebView from opening links outside itself
              setSupportMultipleWindows={false}
            />
          ) : null}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Palette.base700,
    backgroundColor: Palette.secondaryTint,
    height: 52,
  },
  googleBtn: {
    backgroundColor: Palette.background,
    borderColor: Palette.primary,
  },
  facebookBtn: {
    backgroundColor: 'transparent',
    borderColor: Palette.accent,
    borderWidth: 0.5,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialLabel: {
    color: Palette.white,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
  },
  sheet: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Palette.base700,
  },
  sheetTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
  },
  webview: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  hidden: {
    opacity: 0,
  },
  loader: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
