import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';

export type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  hasOnboarded: boolean;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; accessToken: string; user: User; hasOnboarded: boolean }
  | { type: 'RESTORE_FAILED'; hasOnboarded: boolean }
  | { type: 'SIGN_IN'; accessToken: string; user: User }
  | { type: 'SIGN_IN_FAILURE'; error: string }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SIGN_OUT' };

type AuthContextValue = AuthState & {
  signIn: (accessToken: string, refreshToken: string, user: User) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const REFRESH_TOKEN_KEY = 'refresh_token';
const ONBOARDING_KEY = 'onboarding_complete';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,
  hasOnboarded: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
        user: action.user,
        hasOnboarded: action.hasOnboarded,
        isLoading: false,
      };
    case 'RESTORE_FAILED':
      return { ...initialState, hasOnboarded: action.hasOnboarded, isLoading: false };
    case 'SIGN_IN':
      return { ...state, user: action.user, accessToken: action.accessToken, isLoading: false, error: null };
    case 'SIGN_IN_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    case 'COMPLETE_ONBOARDING':
      return { ...state, hasOnboarded: true };
    case 'SIGN_OUT':
      return { ...initialState, hasOnboarded: state.hasOnboarded, isLoading: false };
  }
}

async function saveRefreshToken(token: string) {
  if (Platform.OS === 'web') return;
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
}

async function deleteRefreshToken() {
  if (Platform.OS === 'web') return;
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

async function loadRefreshToken(): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    async function restoreSession() {
      try {
        const [refreshToken, onboarded] = await Promise.all([
          loadRefreshToken(),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        const hasOnboarded = onboarded === 'true';

        if (!refreshToken) {
          dispatch({ type: 'RESTORE_FAILED', hasOnboarded });
          return;
        }

        // call your refresh endpoint here, then:
        // const { accessToken, user } = await api.refresh(refreshToken);
        // dispatch({ type: 'RESTORE_TOKEN', accessToken, user, hasOnboarded });

        dispatch({ type: 'RESTORE_FAILED', hasOnboarded });
      } catch {
        dispatch({ type: 'RESTORE_FAILED', hasOnboarded: false });
      }
    }

    restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signIn: async (accessToken, refreshToken, user) => {
        await saveRefreshToken(refreshToken);
        dispatch({ type: 'SIGN_IN', accessToken, user });
      },
      signOut: async () => {
        await deleteRefreshToken();
        dispatch({ type: 'SIGN_OUT' });
      },
      completeOnboarding: async () => {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        dispatch({ type: 'COMPLETE_ONBOARDING' });
      },
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
