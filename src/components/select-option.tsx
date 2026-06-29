import { type ReactNode } from 'react';
import { Pressable, type PressableProps,StyleSheet, Text, View } from 'react-native';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

export type SelectOptionProps = Omit<PressableProps, 'style'> & {
  label: string;
  selected: boolean;
  /** Optional — accepts any React node: emoji string, Image, custom SVG icon, etc. */
  icon?: ReactNode;
  multiSelect?: boolean;
};

export function SelectOption({
  label,
  selected,
  icon,
  multiSelect = false,
  ...rest
}: SelectOptionProps) {
  return (
    <Pressable
      accessibilityRole={multiSelect ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        pressed && styles.optionPressed,
      ]}
      {...rest}
    >
      {icon == null ? null : (
        <View style={styles.iconWrapper}>
          {typeof icon === 'string' ? <Text style={styles.iconText}>{icon}</Text> : icon}
        </View>
      )}

      <ThemedText style={styles.label}>{label}</ThemedText>

      <Indicator selected={selected} multiSelect={multiSelect} />
    </Pressable>
  );
}

function Indicator({ selected, multiSelect }: Readonly<{ selected: boolean; multiSelect: boolean }>) {
  return (
    <View
      style={[
        styles.indicator,
        multiSelect ? styles.indicatorMulti : styles.indicatorSingle,
        selected && styles.indicatorSelected,
      ]}
    >
      {selected && (
        multiSelect
          ? <Text style={styles.checkmark}>✓</Text>
          : <View style={styles.dot} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primaryShade1,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: Spacing.md,
  },
  optionSelected: {
    borderColor: Palette.accent,
  },
  optionPressed: {
    opacity: 0.75,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
  },
  label: {
    flex: 1,
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Palette.white,
  },
  indicator: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Palette.base400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSingle: {
    borderRadius: BorderRadius.full,
  },
  indicatorMulti: {
    borderRadius: BorderRadius.sm,
  },
  indicatorSelected: {
    borderColor: Palette.accent,
    backgroundColor: Palette.accent,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Palette.background,
  },
  checkmark: {
    color: Palette.background,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.sm + 2,
  },
});
