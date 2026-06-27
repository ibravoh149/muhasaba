# Assets & Brand Reference

## Brand Colors

These are the current placeholder colors. Replace them all with your brand colors.

| Token | Current Value | Where to change |
|---|---|---|
| Splash / overlay background | `#208AEF` | `app.json` → `expo-splash-screen.backgroundColor` AND `src/components/animated-icon.tsx` → `backgroundSolidColor.backgroundColor` (must match) |
| Animated icon gradient top | `#3C9FFE` | `src/components/animated-icon.tsx` → `background.experimental_backgroundImage` |
| Animated icon gradient bottom | `#0274DF` | `src/components/animated-icon.tsx` → `background.experimental_backgroundImage` |
| Android icon background | `#E6F4FE` | `app.json` → `android.adaptiveIcon.backgroundColor` |
| App text (light) | `#000000` | `src/constants/theme.ts` → `Colors.light.text` |
| App text (dark) | `#ffffff` | `src/constants/theme.ts` → `Colors.dark.text` |
| App background (light) | `#ffffff` | `src/constants/theme.ts` → `Colors.light.background` |
| App background (dark) | `#000000` | `src/constants/theme.ts` → `Colors.dark.background` |
| Surface element (light) | `#F0F0F3` | `src/constants/theme.ts` → `Colors.light.backgroundElement` |
| Surface element (dark) | `#212225` | `src/constants/theme.ts` → `Colors.dark.backgroundElement` |
| Secondary text (light) | `#60646C` | `src/constants/theme.ts` → `Colors.light.textSecondary` |
| Secondary text (dark) | `#B0B4BA` | `src/constants/theme.ts` → `Colors.dark.textSecondary` |

> The splash `backgroundColor` in `app.json` and the `backgroundSolidColor` in `animated-icon.tsx`
> **must be identical** — this is what makes the native-to-animated splash transition seamless.

---

## App Icons

### iOS
| File | Notes |
|---|---|
| `assets/expo.icon/` | Xcode `.icon` bundle — replace the contents with your icon set |

### Android
| File | Notes |
|---|---|
| `assets/images/android-icon-foreground.png` | Foreground layer of adaptive icon (your logo, transparent bg) |
| `assets/images/android-icon-background.png` | Background layer of adaptive icon (solid color or pattern) |
| `assets/images/android-icon-monochrome.png` | Monochrome version for themed icons |

### Shared / Web
| File | Notes |
|---|---|
| `assets/images/icon.png` | Fallback app icon (1024×1024 px, no transparency) |
| `assets/images/favicon.png` | Web browser tab icon |

---

## Splash Screen

### Native splash (static — configured in `app.json`)
| Setting | Current value | Notes |
|---|---|---|
| `backgroundColor` | `#208AEF` | Full-screen background color |
| `android.image` | `assets/images/splash-icon.png` | Centered logo on Android (transparent PNG) |
| `android.imageWidth` | `76` | Width in dp |

iOS uses the app icon as the splash by default (no image override needed).

### Animated overlay (JS — `src/components/animated-icon.tsx`)
Plays immediately after the native splash hides. Fades out over 600ms revealing the app.

| What | Where in file |
|---|---|
| Overlay background color | `styles.backgroundSolidColor.backgroundColor` |
| Icon gradient | `styles.background.experimental_backgroundImage` |
| Icon logo image | `require('@/assets/images/expo-logo.png')` — replace file |
| Glow ring image | `require('@/assets/images/logo-glow.png')` — replace or remove |
| Animation duration | `const DURATION = 600` (ms) |

---

## Images to Replace or Delete

| File | Status | Notes |
|---|---|---|
| `assets/images/splash-icon.png` | Replace | Your logo centered on splash (transparent PNG) |
| `assets/images/expo-logo.png` | Replace | Logo shown in `AnimatedIcon` (home screen hero) |
| `assets/images/logo-glow.png` | Replace or delete | Spinning glow ring behind logo |
| `assets/images/expo-badge.png` | Delete | Expo web badge — no longer used |
| `assets/images/expo-badge-white.png` | Delete | Expo web badge — no longer used |
| `assets/images/react-logo.png` (+ @2x, @3x) | Delete | Unused now that starter screens are replaced |
| `assets/images/tabIcons/` | Replace | Tab bar icons — `home.png`, `explore.png` (+ @2x, @3x) |
