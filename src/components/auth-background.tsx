import { Image, StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Palette } from '@/constants/theme';

type AuthBackgroundProps = {
  variant?: 'center' | 'right';
};

export function AuthBackground({ variant = 'right' }: AuthBackgroundProps) {
  const isCenter = variant === 'center';

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={[Palette.primary, Palette.background]}
        locations={[0, 0.55]}
        style={styles.gradient}
      />

      {/* Circular glow behind the moon */}
      <View style={[styles.glowContainer, isCenter ? styles.glowContainerCenter : styles.glowContainerRight]}>
        <View style={styles.glow} />
      </View>

      {/* Moon crescent image */}
      <View style={[styles.moonContainer, isCenter ? styles.moonContainerCenter : styles.moonContainerRight]}>
        <Image
          source={require('@/assets/images/cut-moon.png')}
          style={[styles.moon, isCenter ? styles.moonCenter : styles.moonRight]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  glowContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  glowContainerCenter: {
    top: -60,
  },
  glowContainerRight: {
    top: -80,
    alignItems: 'flex-end',
    paddingRight: -40,
  },
  glow: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${Palette.primary}50`,
    marginRight: -60,
  },
  moonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  moonContainerCenter: {
    top: 24,
  },
  moonContainerRight: {
    top: -10,
    alignItems: 'flex-end',
  },
  moon: {
    position: 'relative',
  },
  moonCenter: {
    width: 260,
    height: 260,
  },
  moonRight: {
    width: 220,
    height: 220,
    marginRight: -30,
  },
});
