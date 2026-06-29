import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, type TextInputProps, View, type ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { BorderRadius, Fonts, FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

type AuthInputProps = TextInputProps & {
  label?: string;
  containerStyle?: ViewStyle;
};

export function AuthInput({ label, secureTextEntry, containerStyle, style, ...rest }: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={containerStyle}>
      {label ? <ThemedText style={styles.label}>{label}</ThemedText> : null}
      <View style={[styles.row, focused && styles.rowFocused]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Palette.base500}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: Spacing.md,
    minHeight: 52,
  },
  rowFocused: {
    borderColor: Palette.primary,
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
});
