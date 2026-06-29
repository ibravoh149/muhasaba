import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  View,
  type ViewStyle,
  ViewToken,
} from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { useRouter } from "expo-router";

import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import { FontSizes, Palette, Spacing } from "@/constants/theme";
import { useAuth } from "@/context/auth";

const { width } = Dimensions.get("window");

const SLIDE_KEYS = ["reflect", "intentions", "consistency"] as const;
type SlideKey = (typeof SLIDE_KEYS)[number];

const SLIDE_MAP: Record<SlideKey, { title: string; subtitle: string }> = {
  reflect: {
    title: "onboarding.slide1Title",
    subtitle: "onboarding.slide1Subtitle",
  },
  intentions: {
    title: "onboarding.slide2Title",
    subtitle: "onboarding.slide2Subtitle",
  },
  consistency: {
    title: "onboarding.slide3Title",
    subtitle: "onboarding.slide3Subtitle",
  },
};

function AnimatedDot({ active }: Readonly<{ active: boolean }>) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: 300 });
  }, [active, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: progress.value * 24 + 8,
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [`${Palette.white}66`, Palette.accent],
    ),
  }));

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

function AnimatedShape({
  active,
  delay = 0,
  rotate,
  fromX = 0,
  fromY = 0,
  shapeStyle,
}: Readonly<{
  active: boolean;
  delay?: number;
  rotate: string;
  fromX?: number;
  fromY?: number;
  shapeStyle: Omit<ViewStyle, "transform">;
}>) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(active ? 1 : 0, { duration: 500 }),
    );
  }, [active, delay, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { rotate },
      { translateX: fromX * (1 - progress.value) },
      { translateY: fromY * (1 - progress.value) },
    ],
  }));

  return <Animated.View style={[styles.shape, shapeStyle, animatedStyle]} />;
}

function ReflectBackground({ active }: Readonly<{ active: boolean }>) {
  return (
    <AnimatedShape
      active={active}
      rotate="27deg"
      fromY={60}
      shapeStyle={{ width: 100, height: 100, top: "22%", alignSelf: "center", backgroundColor: Palette.primary }}
    />
  );
}

function IntentionsBackground({ active }: Readonly<{ active: boolean }>) {
  return (
    <>
      <AnimatedShape active={active} delay={0} rotate="-10deg" fromX={-50} fromY={30}
        shapeStyle={{ width: 100, height: 100, top: "18%", left: "8%", backgroundColor: Palette.primaryShade1, borderWidth: 1, borderColor: Palette.secondaryTint }}
      />
      <AnimatedShape active={active} delay={80} rotate="13deg" fromY={50}
        shapeStyle={{ width: 100, height: 100, top: "22%", left: "28%", backgroundColor: Palette.base600 }}
      />
      <AnimatedShape active={active} delay={160} rotate="-14deg" fromY={40}
        shapeStyle={{ width: 100, height: 100, top: "18%", right: "30%", backgroundColor: Palette.primaryShade4 }}
      />
      <AnimatedShape active={active} delay={240} rotate="13deg" fromX={50} fromY={30}
        shapeStyle={{ width: 100, height: 100, top: "22%", right: "8%", backgroundColor: Palette.primary }}
      />
    </>
  );
}

function ConsistencyBackground({ active }: Readonly<{ active: boolean }>) {
  return (
    <>
      <AnimatedShape active={active} delay={0} rotate="50deg" fromX={-60} fromY={-40}
        shapeStyle={{ width: 210, height: 210, top: -30, left: -60, backgroundColor: Palette.primaryShade1, borderWidth: 1, borderColor: Palette.secondaryTint }}
      />
      <AnimatedShape active={active} delay={120} rotate="-47deg" fromX={60} fromY={-30}
        shapeStyle={{ width: 190, height: 190, top: "10%", right: "-7%", backgroundColor: Palette.primary }}
      />
    </>
  );
}

const ILLUSTRATIONS: Record<
  SlideKey,
  (props: { active: boolean }) => React.JSX.Element
> = {
  reflect: ReflectBackground,
  intentions: IntentionsBackground,
  consistency: ConsistencyBackground,
};

function OnboardingSlide({
  slideKey,
  height,
  active,
}: Readonly<{ slideKey: SlideKey; height: number; active: boolean }>) {
  const { t } = useTranslation();
  const Background = ILLUSTRATIONS[slideKey];

  return (
    <View style={[styles.slide, { height }]}>
      <Background active={active} />
      <View style={styles.textBlock}>
        <ThemedText type="subtitle" style={styles.title}>
          {t(SLIDE_MAP[slideKey].title)}
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {t(SLIDE_MAP[slideKey].subtitle)}
        </ThemedText>
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { completeOnboarding } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideHeight, setSlideHeight] = useState(0);
  const listRef = useRef<FlatList<SlideKey>>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems[0]?.index !== null &&
        viewableItems[0]?.index !== undefined
      ) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  function goNext() {
    if (activeIndex < SLIDE_KEYS.length - 1) {
      listRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      handleFinish();
    }
  }

  function goBack() {
    if (activeIndex > 0) {
      listRef.current?.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  }

  async function handleFinish() {
    await completeOnboarding();
    router.replace("/(auth)/login");
  }

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === SLIDE_KEYS.length - 1;
  const continueLabel = isLast
    ? t("onboarding.getStarted")
    : t("onboarding.continue");

  return (
    <View style={styles.container}>
      <View
        style={styles.listContainer}
        onLayout={(e) => setSlideHeight(e.nativeEvent.layout.height)}
      >
        {slideHeight > 0 && (
          <FlatList
            ref={listRef}
            data={SLIDE_KEYS}
            extraData={activeIndex}
            renderItem={({ item, index }) => (
              <OnboardingSlide slideKey={item} height={slideHeight} active={index === activeIndex} />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            snapToAlignment="start"
            decelerationRate="fast"
            disableIntervalMomentum
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            style={{ width }}
          />
        )}
      </View>

      {/* Footer: dots at top, flex spacer, buttons pinned to bottom */}

      <View style={styles.dots}>
        {SLIDE_KEYS.map((key, index) => (
          <AnimatedDot key={key} active={index === activeIndex} />
        ))}
      </View>
      <View style={styles.footer}>
        <View style={styles.nav}>
          {isFirst ? (
            <ThemedButton label={continueLabel} onPress={goNext} />
          ) : (
            <>
              <ThemedButton
                label={t("onboarding.back")}
                variant="ghost"
                onPress={goBack}
                fullWidth={false}
                style={styles.backButton}
                labelStyle={{ color: Palette.white }}
              />
              <ThemedButton
                label={continueLabel}
                onPress={goNext}
                style={styles.continueButton}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  listContainer: {
    flex: 1,
  },
  slide: {
    width,
    justifyContent: "center",
    overflow: "hidden",
  },
  shape: {
    position: "absolute",
    borderRadius: 20,
  },
  textBlock: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    marginTop: Spacing.xxl,
  },
  title: {
    textAlign: "center",
    fontSize: FontSizes.xl,
  },
  subtitle: {
    textAlign: "center",
    fontSize: FontSizes.md,
    color: Palette.base300,
  },
  footer: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    minHeight: 160,
    justifyContent: "flex-end",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.xs,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.select({ ios: 350, android: 400 }),
    paddingTop: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: `${Palette.white}40`,
  },
  nav: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    alignItems: "center",
  },
  backButton: {
    minWidth: 90,
  },
  continueButton: {
    flex: 1,
  },
});
