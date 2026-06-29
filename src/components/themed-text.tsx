import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, FontSizes, LineHeights, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  smallBold: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  default: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.md,
  },
  title: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xxl,
    lineHeight: LineHeights.xxl,
  },
  subtitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xl,
    lineHeight: LineHeights.xl,
  },
  link: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
  },
  linkPrimary: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    lineHeight: LineHeights.sm,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: FontSizes.xs,
  },
});
