import * as SecureStore from 'expo-secure-store';

import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const REFRESH_TOKEN_KEY = 'refresh_token';

let _accessToken: string | null = null;
let _onUnauthorized: (() => void) | null = null;

export function setAccessToken(token: string | null) {
  _accessToken = token;
}

export function setOnUnauthorized(cb: () => void) {
  _onUnauthorized = cb;
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        if (!refreshToken) throw new Error('no refresh token');

        // Use a plain axios call (not `api`) to avoid re-triggering this interceptor
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        setAccessToken(data.access_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        _onUnauthorized?.();
      }
    }

    return Promise.reject(error);
  },
);
