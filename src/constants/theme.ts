import "@/global.css";

import { Platform, StyleSheet } from "react-native";

export const Palette = {
  primary: "#2D5A5A",
  primaryShade1: "#182424",
  primaryShade2: "#335DDC",
  primaryShade3: "#2ED7D7",
  primaryShade4: "#71A4A4",
  secondaryTint: "#243737",
  accent: "#F5CB10",
  warm: "#DC8233",
  background: "#121A1A",
  base200: "#E5E7EB",
  base300: "#D1D5DC",
  base400: "#99A1AF",
  base500: "#6A7282",
  base600: "#4A5565",
  base700: "#364153",
  base800: "#1E2939",
  white: "#E6F1F1",
} as const;

export const Colors = {
  light: {
    text: Palette.white,
    textSecondary: Palette.base400,
    background: Palette.background,
    backgroundElement: Palette.primaryShade1,
    backgroundSelected: Palette.secondaryTint,
    primary: Palette.primary,
    accent: Palette.accent,
  },
  dark: {
    text: Palette.white,
    textSecondary: Palette.base400,
    background: Palette.background,
    backgroundElement: Palette.primaryShade1,
    backgroundSelected: Palette.secondaryTint,
    primary: Palette.primary,
    accent: Palette.accent,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = {
  regular: "DMSans_400Regular",
  regularItalic: "DMSans_400Regular_Italic",
  medium: "DMSans_500Medium",
  semiBold: "DMSans_600SemiBold",
  bold: "DMSans_700Bold",
  display: "MadimiOne_400Regular",
  mono: Platform.select({ ios: "ui-monospace", default: "monospace" }),
} as const;

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const LineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 64,
} as const;

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BorderWidth = {
  thin: StyleSheet.hairlineWidth,
  default: 1,
  thick: 2,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
