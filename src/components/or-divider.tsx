import { StyleSheet, View } from 'react-native';

import { FontSizes, Palette, Spacing } from '@/constants/theme';

import { ThemedText } from './themed-text';

export function OrDivider({ label = 'or' }: Readonly<{ label?: string }>) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Palette.base700,
  },
  label: {
    color: Palette.base500,
    fontSize: FontSizes.md,
  },
});
