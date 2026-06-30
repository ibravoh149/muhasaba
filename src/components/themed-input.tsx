import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, type TextInputProps, View, type ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Ionicons } from '@expo/vector-icons';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

type ThemedInputProps = TextInputProps & {
  label?: string;
  containerStyle?: ViewStyle;
  error?: string;
};

export function ThemedInput({
  label,
  secureTextEntry,
  containerStyle,
  style,
  error,
  onBlur,
  ...rest
}: ThemedInputProps) {
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={containerStyle}>
      {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
      <View style={[styles.row, focused && styles.rowFocused, !!error && styles.rowError]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Palette.base500}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          autoCapitalize="none"
          {...rest}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden(!hidden)} style={styles.eyeBtn} hitSlop={8}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={Palette.base400}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <ThemedText style={styles.error}>{t(error as never)}</ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FontSizes.sm,
    color: Palette.base300,
    fontFamily: Fonts.medium,
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.secondaryTint,
    borderRadius: BorderRadius.lg,
    borderWidth: 0.5,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.md,
    minHeight: 52,
  },
  rowFocused: {
    borderColor: Palette.accent,
  },
  rowError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    color: Palette.white,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    paddingVertical: Spacing.sm,
  },
  eyeBtn: {
    padding: Spacing.xs,
  },
  error: {
    color: '#EF4444',
    fontSize: FontSizes.xs,
    marginTop: Spacing.xs,
  },
});
