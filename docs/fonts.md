# Fonts

The app uses **DM Sans** as the primary font and **Madimi One** as the display/brand font. Both are loaded via Expo Google Fonts. Fonts are available after the splash screen hides — they're guaranteed to be ready by the time any screen renders.

## Available weights

| Token | Font name | Use for |
|---|---|---|
| `Fonts.regular` | DMSans_400Regular | Body text, inputs |
| `Fonts.regularItalic` | DMSans_400Regular_Italic | Emphasis, quotes |
| `Fonts.medium` | DMSans_500Medium | Subheadings, slightly emphasized text |
| `Fonts.semiBold` | DMSans_600SemiBold | Buttons, labels, nav items |
| `Fonts.bold` | DMSans_700Bold | Titles, headings |
| `Fonts.display` | MadimiOne_400Regular | App name, brand moments only |
| `Fonts.mono` | System monospace | Code, numbers that need fixed width |

## Basic usage

```tsx
import { StyleSheet, Text } from 'react-native';

import { Fonts } from '@/constants/theme';

export default function Example() {
  return (
    <>
      <Text style={styles.title}>Muhasaba</Text>
      <Text style={styles.body}>Track your daily habits</Text>
      <Text style={styles.label}>Submit</Text>
    </>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: Fonts.bold, fontSize: 28 },
  body:  { fontFamily: Fonts.regular, fontSize: 16 },
  label: { fontFamily: Fonts.semiBold, fontSize: 14 },
});
```

## With ThemedText

If you're using `ThemedText`, apply the font through its `style` prop:

```tsx
import { Fonts } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

<ThemedText type="title" style={{ fontFamily: Fonts.bold }}>
  Hello
</ThemedText>
```

## Font + color together

Combine `Fonts` with `Colors` from the same theme file:

```tsx
import { useColorScheme } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

const scheme = useColorScheme() ?? 'light';

const styles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors[scheme].text,
  },
  secondary: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors[scheme].textSecondary,
  },
});
```

## Adding more weights

If you need a weight that isn't loaded (e.g. ExtraBold), add it in two places:

**1. Import and register in `src/app/_layout.tsx`:**
```tsx
import { DMSans_800ExtraBold } from '@expo-google-fonts/dm-sans';

const [fontsLoaded] = useFonts({
  // ...existing
  DMSans_800ExtraBold,
});
```

**2. Add a token in `src/constants/theme.ts`:**
```ts
export const Fonts = {
  // ...existing
  extraBold: 'DMSans_800ExtraBold',
} as const;
```

Then use it as `Fonts.extraBold`.
