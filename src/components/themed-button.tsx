import { ActivityIndicator, Pressable, type PressableProps, StyleSheet, type TextStyle, View, type ViewStyle } from 'react-native';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

export type ThemedButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  labelStyle?: TextStyle;
  icon?: React.ReactNode;
};

export function ThemedButton({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = true,
  disabled,
  style,
  labelStyle,
  icon,
  ...rest
}: ThemedButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style as ViewStyle,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'ghost' ? Palette.primary : Palette.white} />
      ) : (
        <View style={styles.inner}>
          {icon}
          <ThemedText style={[styles.label, styles[`label_${variant}`], styles[`labelSize_${size}`], labelStyle]}>
            {label}
          </ThemedText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },

  // variants
  primary: {
    backgroundColor: Palette.primary,
  },
  secondary: {
    backgroundColor: Palette.secondaryTint,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // sizes
  size_sm: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },

  // states
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },

  // label base
  label: {
    fontFamily: Fonts.semiBold,
    color: Palette.white,
  },
  label_primary: {
    color: Palette.white,
  },
  label_secondary: {
    color: Palette.white,
  },
  label_ghost: {
    color: Palette.primary,
  },

  // label sizes
  labelSize_sm: {
    fontSize: FontSizes.sm,
  },
  labelSize_md: {
    fontSize: FontSizes.md,
  },
  labelSize_lg: {
    fontSize: FontSizes.lg,
  },
});
