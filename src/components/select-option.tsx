import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

export type SelectOptionProps = Omit<PressableProps, 'style'> & {
  label: string;
  selected: boolean;
  description?: string;
  style?: StyleProp<ViewStyle>;
  /** Optional — accepts any React node: emoji string, Image, custom SVG icon, etc. */
  icon?: ReactNode;
  multiSelect?: boolean;
};

export function SelectOption({
  label,
  selected,
  description,
  style,
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
        pressed && styles.optionPressed,
        style,
      ]}
      {...rest}
    >
      {icon == null ? null : (
        <View style={styles.iconWrapper}>
          {typeof icon === 'string' ? <Text style={styles.iconText}>{icon}</Text> : icon}
        </View>
      )}

      <View style={styles.labelGroup}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        {description ? <ThemedText style={styles.description}>{description}</ThemedText> : null}
      </View>

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
  labelGroup: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.md,
    color: Palette.white,
  },
  description: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    color: Palette.base400,
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
