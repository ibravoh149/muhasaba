# SelectOption

A reusable selectable row component used anywhere the user picks from a list — language selection, prayer types, goals, settings toggles, etc.

Supports **single select** (radio) and **multi select** (checkbox) modes. The `icon` prop is optional and accepts any React node.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | The option label |
| `selected` | `boolean` | required | Whether this option is selected |
| `onPress` | `() => void` | required | Called when the row is tapped |
| `icon` | `ReactNode` | `undefined` | Optional leading icon — emoji, Image, SVG, etc. |
| `multiSelect` | `boolean` | `false` | `true` → checkbox style, `false` → radio style |

All other `Pressable` props are forwarded.

## Single select (radio)

Selected state shows a filled accent circle with a dark dot inside.

```tsx
import { useState } from 'react';

import { SelectOption } from '@/components/select-option';

const OPTIONS = ['en', 'fr', 'ar', 'de'] as const;

export function LanguagePicker() {
  const [selected, setSelected] = useState('en');

  return (
    <>
      {OPTIONS.map((lang) => (
        <SelectOption
          key={lang}
          label={LANGUAGE_LABELS[lang]}
          icon={LANGUAGE_FLAGS[lang]}   // emoji string is a valid ReactNode
          selected={selected === lang}
          onPress={() => setSelected(lang)}
        />
      ))}
    </>
  );
}
```

## Multi select (checkbox)

Selected state shows a filled accent square with a checkmark.

```tsx
import { useState } from 'react';
import { Image } from 'react-native';

import { SelectOption } from '@/components/select-option';

const GOALS = ['prayer', 'quran', 'charity', 'fasting'];

export function GoalPicker() {
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(goal: string) {
    setPicked((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  }

  return (
    <>
      {GOALS.map((goal) => (
        <SelectOption
          key={goal}
          label={goal}
          selected={picked.includes(goal)}
          onPress={() => toggle(goal)}
          multiSelect
        />
      ))}
    </>
  );
}
```

## With a custom icon node

The `icon` prop accepts any React node, not just emoji strings.

```tsx
import { Image } from 'expo-image';

<SelectOption
  label="Mosque"
  icon={<Image source={require('@/assets/icons/mosque.png')} style={{ width: 24, height: 24 }} />}
  selected={selected === 'mosque'}
  onPress={() => setSelected('mosque')}
/>
```

## Without an icon

Just omit `icon` — the label takes up the full available width.

```tsx
<SelectOption
  label="Enable notifications"
  selected={enabled}
  onPress={() => setEnabled(!enabled)}
/>
```
