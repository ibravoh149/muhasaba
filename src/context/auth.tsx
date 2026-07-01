import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';

import { api, REFRESH_TOKEN_KEY, refreshTokens, setAccessToken, setOnUnauthorized } from '@/lib/api';
import type { ProfileResponse } from '@/types/user';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  phone: string | null;
};

function mapProfile(data: ProfileResponse): User {
  return {
    id: data.user_id ?? data._id,
    firstName: data.first_name,
    lastName: data.last_name,
    avatar: data.avatar,
    phone: data.phone,
  };
}

type FetchedProfile = { user: User; setupCompleted: boolean; locationSet: boolean };

async function fetchProfile(): Promise<FetchedProfile | null> {
  try {
    const { data } = await api.get<ProfileResponse>('/users/profile');
    return {
      user: mapProfile(data),
      setupCompleted: data.onboarding_completed,
      locationSet: data.location.latitude !== null,
    };
  } catch {
    return null;
  }
}

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  hasOnboarded: boolean;
  setupCompleted: boolean;
  locationSet: boolean;
};

type AuthAction =
  | { type: 'RESTORE_TOKEN'; accessToken: string; user?: User; hasOnboarded: boolean; setupCompleted: boolean; locationSet: boolean }
  | { type: 'RESTORE_FAILED'; hasOnboarded: boolean }
  | { type: 'SIGN_IN'; accessToken: string; user?: User; setupCompleted: boolean; locationSet: boolean }
  | { type: 'SIGN_IN_FAILURE'; error: string }
  | { type: 'FINISH_ONBOARDING' }
  | { type: 'COMPLETE_SETUP' }
  | { type: 'SET_LOCATION' }
  | { type: 'SIGN_OUT' };

type AuthContextValue = AuthState & {
  signIn: (accessToken: string, refreshToken: string, user?: User) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  completeSetup: () => Promise<void>;
  setLocationDone: () => void;
};

const ONBOARDING_KEY = 'onboarding_complete';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  error: null,
  hasOnboarded: false,
  setupCompleted: false,
  locationSet: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
        user: action.user ?? null,
        hasOnboarded: action.hasOnboarded,
        setupCompleted: action.setupCompleted,
        locationSet: action.locationSet,
        isLoading: false,
      };
    case 'RESTORE_FAILED':
      return { ...initialState, hasOnboarded: action.hasOnboarded, isLoading: false };
    case 'SIGN_IN':
      return { ...state, user: action.user ?? null, accessToken: action.accessToken, setupCompleted: action.setupCompleted, locationSet: action.locationSet, isLoading: false, error: null };
    case 'SIGN_IN_FAILURE':
      return { ...state, isLoading: false, error: action.error };
    case 'FINISH_ONBOARDING':
      return { ...state, hasOnboarded: true };
    case 'COMPLETE_SETUP':
      return { ...state, setupCompleted: true };
    case 'SET_LOCATION':
      return { ...state, locationSet: true };
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
    setOnUnauthorized(() => {
      deleteRefreshToken().catch(() => {});
      dispatch({ type: 'SIGN_OUT' });
    });
  }, []);

  useEffect(() => {
    setAccessToken(state.accessToken);
  }, [state.accessToken]);

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

        const tokens = await refreshTokens(refreshToken);
        setAccessToken(tokens.access_token);
        await saveRefreshToken(tokens.refresh_token);
        const profile = await fetchProfile();
        dispatch({ type: 'RESTORE_TOKEN', accessToken: tokens.access_token, user: profile?.user, hasOnboarded, setupCompleted: profile?.setupCompleted ?? false, locationSet: profile?.locationSet ?? false });
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
        setAccessToken(accessToken);
        await saveRefreshToken(refreshToken);
        const profile = user ? null : await fetchProfile();
        dispatch({ type: 'SIGN_IN', accessToken, user: user ?? profile?.user, setupCompleted: profile?.setupCompleted ?? false, locationSet: profile?.locationSet ?? false });
      },
      signOut: async () => {
        try {
          await api.post('/auth/logout');
        } catch {
          // best-effort — clear local state regardless
        }
        await deleteRefreshToken();
        dispatch({ type: 'SIGN_OUT' });
      },
      completeOnboarding: async () => {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        dispatch({ type: 'FINISH_ONBOARDING' });
      },
      completeSetup: async () => {
        await api.patch('/users/onboarding/complete');
        dispatch({ type: 'COMPLETE_SETUP' });
      },
      setLocationDone: () => {
        dispatch({ type: 'SET_LOCATION' });
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
