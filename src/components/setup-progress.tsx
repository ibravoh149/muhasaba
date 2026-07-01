import { StyleSheet, View } from 'react-native';

import { Palette } from '@/constants/theme';

type Props = { step: number; total?: number };

export function SetupProgress({ step, total = 3 }: Readonly<Props>) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.dot, i === step - 1 && styles.dotActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: Palette.base700,
  },
  dotActive: {
    width: 40,
    backgroundColor: Palette.accent,
  },
});
