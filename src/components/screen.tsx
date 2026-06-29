import { StyleSheet, View, type ViewProps } from 'react-native';

import { Palette, Spacing } from '@/constants/theme';

type ScreenProps = ViewProps & {
  padded?: boolean;
};

export function Screen({ padded = true, style, children, ...rest }: ScreenProps) {
  return (
    <View style={[styles.base, padded && styles.padded, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  padded: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
});
