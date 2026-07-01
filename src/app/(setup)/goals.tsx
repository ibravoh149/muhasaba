import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { AuthBackground } from "@/components/auth-background";
import { SelectOption } from "@/components/select-option";
import { SetupProgress } from "@/components/setup-progress";
import { ThemedButton } from "@/components/themed-button";
import { ThemedText } from "@/components/themed-text";
import {
  BorderRadius,
  Fonts,
  FontSizes,
  LineHeights,
  Palette,
  Spacing,
} from "@/constants/theme";
import { useDeedCategories } from "@/hooks/use-deed-categories";
import { useAddDeedCategories } from "@/hooks/use-deed-configs";

const CATEGORY_IMAGES: Record<string, ReturnType<typeof require>> = {
  salat: require("../../../assets/images/goals/salat.png"),
  kinship: require("../../../assets/images/goals/kinship.png"),
  almsGiving: require("../../../assets/images/goals/almsGiving.png"),
  quran: require("../../../assets/images/goals/quran.png"),
  visitation: require("../../../assets/images/goals/visitation.png"),
  islamicLearning: require("../../../assets/images/goals/islamicLearning.png"),
  kindness: require("../../../assets/images/goals/kindness.png"),
  fasting: require("../../../assets/images/goals/fasting.png"),
  adhkar: require("../../../assets/images/goals/adhkar.png"),
};

export default function SetupGoalsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: categories, isLoading, isError, refetch } = useDeedCategories();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { mutate: addCategories, isPending } = useAddDeedCategories();

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function renderList() {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={Palette.accent} />
        </View>
      );
    }

    if (isError || !categories) {
      return (
        <View style={styles.centered}>
          <ThemedText style={styles.errorText}>{t("common.error")}</ThemedText>
          <TouchableOpacity onPress={() => refetch()}>
            <ThemedText style={styles.retryText}>
              {t("common.retry")}
            </ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category) => {
          const isSelected = selected.has(category.id);
          const source = CATEGORY_IMAGES[category.key];
          return (
            <SelectOption
              key={category.id}
              label={t(`goals.${category.key}`)}
              description={category.description}
              selected={isSelected}
              multiSelect
              onPress={() => toggle(category.id)}
              icon={
                source ? (
                  <Image source={source} style={styles.categoryImage} />
                ) : null
              }
            />
          );
        })}
      </ScrollView>
    );
  }

  return (
    <AuthBackground variant="right">
      <View style={styles.container}>
        <ThemedText style={styles.logo}>{t("common.appName")}</ThemedText>
        <SetupProgress step={2} />

        <View style={styles.heading}>
          <ThemedText type="subtitle" style={styles.title}>
            {t("setup.selectGoals")}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {t("setup.selectGoalsSubtitle")}
          </ThemedText>
        </View>

        {renderList()}

        <ThemedButton
          label={t("setup.continue")}
          onPress={() =>
            addCategories(Array.from(selected), {
              onSuccess: () => router.push("/(setup)/notifications"),
            })
          }
          loading={isPending}
          disabled={selected.size === 0 || isPending}
        />
      </View>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.xxl,
    gap: Spacing.lg,
  },
  heading: {
    gap: Spacing.sm,
  },
  logo: {
    fontFamily: Fonts.display,
    fontSize: FontSizes.sm,
    lineHeight: FontSizes.xxl * 1.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: FontSizes.xl,
    textAlign: "center",
  },
  subtitle: {
    color: Palette.base400,
    fontSize: FontSizes.md,
    lineHeight: LineHeights.sm * 1.6,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: Spacing.sm,
  },
  categoryImage: {
    width: 100,
    height: 90,
    borderRadius: BorderRadius.md,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
  },
  errorText: {
    color: Palette.base400,
    fontSize: FontSizes.md,
  },
  retryText: {
    color: Palette.accent,
    fontSize: FontSizes.md,
  },
});
