# Emoji Icons

Emoji work natively on iOS and Android — no packages, no assets needed. Just copy and paste directly into your code as a string.

## Finding emoji

Go to **emojipedia.org**, search for what you need, and copy it. That's it.

## Usage in code

Pass emoji strings directly — they're valid strings and render as icons anywhere you'd use text:

```tsx
// As icon prop in SelectOption
<SelectOption icon="🕌" label="Mosque" selected={...} onPress={...} />

// Inline in text
<Text>Prayer 🙏</Text>

// In a constant map
const FLAGS: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇦🇪',
  de: '🇩🇪',
  ng: '🇳🇬',
};
```

## Flag emoji

Every country flag is two Unicode regional indicator letters combined — no special lookup needed. Examples:

| Flag | Code | Country |
|---|---|---|
| 🇬🇧 | `'🇬🇧'` | United Kingdom |
| 🇫🇷 | `'🇫🇷'` | France |
| 🇦🇪 | `'🇦🇪'` | UAE (used for Arabic) |
| 🇩🇪 | `'🇩🇪'` | Germany |
| 🇳🇬 | `'🇳🇬'` | Nigeria |
| 🇸🇦 | `'🇸🇦'` | Saudi Arabia |

Search emojipedia.org for any country name to get its flag.

## Sizing

When passing emoji as a string `icon` prop to `SelectOption`, sizing is handled automatically. If you render emoji directly in a `Text` component, set `fontSize` to control the size:

```tsx
<Text style={{ fontSize: 28 }}>🌙</Text>
```
