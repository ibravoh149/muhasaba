import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Palette } from "@/constants/theme";

type AuthBackgroundProps = {
  variant?: "center" | "right";
  children?: React.ReactNode;
};

export function AuthBackground({ children }: Readonly<AuthBackgroundProps>) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={[Palette.primary, Palette.background]}
          locations={[0, 0.7]}
          style={styles.gradient}
        />

        <View style={[styles.moonContainer]}>
          <Image
            source={require("@/assets/images/cut-moon.png")}
            style={[styles.moon]}
            resizeMode="contain"
          />
        </View>

        <LinearGradient
          colors={[Palette.background, Palette.black]}
          locations={[0.2, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
          }}
        />
      </View>

      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "60%",
  },
  glowContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  glowContainerCenter: {
    top: -60,
  },
  glowContainerRight: {
    top: -80,
    alignItems: "flex-end",
  },
  glow: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: `${Palette.primary}50`,
    marginRight: -60,
  },
  moonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    opacity: 0.1,
    top: 100,
  },
  moonContainerCenter: {
    top: 24,
  },
  moonContainerRight: {
    top: -10,
    alignItems: "flex-end",
  },
  moon: {
    position: "relative",
    width: 292,
    height: 314,
  },
});
