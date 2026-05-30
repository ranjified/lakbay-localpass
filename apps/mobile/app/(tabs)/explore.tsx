import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TourismCategory } from "@lakbay/shared";

import { AppScreen } from "@/components/AppScreen";
import { DestinationCard } from "@/components/DestinationCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useDestinations } from "@/features/destinations/use-destinations";

export default function ExploreScreen() {
  const [selectedCategory, setSelectedCategory] = useState<TourismCategory | undefined>();
  const { destinations, categories, isSaved, saveDestination, removeDestination } = useDestinations(selectedCategory);

  return (
    <AppScreen accessibilityLabel="Explore Tayabas destinations">
      <View style={styles.hero}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.body}>Browse Tayabas stops by route style, save favorites, and open QR-ready stories.</Text>
      </View>

      <View style={styles.filters}>
        <Pressable accessibilityRole="button" onPress={() => setSelectedCategory(undefined)} style={[styles.filter, !selectedCategory && styles.filterActive]}>
          <Text style={[styles.filterText, !selectedCategory && styles.filterTextActive]}>All</Text>
        </Pressable>
        {categories.map((category) => {
          const active = selectedCategory === category;
          return (
            <Pressable key={category} accessibilityRole="button" onPress={() => setSelectedCategory(category)} style={[styles.filter, active && styles.filterActive]}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Destinations" action={`${destinations.length} shown`} />
        {destinations.map((destination) => {
          const saved = isSaved(destination.id);
          return (
            <DestinationCard
              key={destination.id}
              destination={destination}
              saved={saved}
              onPress={() => router.push(`/destination/${destination.id}`)}
              onToggleSaved={() => (saved ? removeDestination(destination.id) : saveDestination(destination.id))}
            />
          );
        })}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  body: {
    color: colors.mutedText,
    ...typography.body
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  filter: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  filterActive: {
    backgroundColor: colors.heritage,
    borderColor: colors.heritage
  },
  filterText: {
    color: colors.heritage,
    textTransform: "capitalize",
    ...typography.label
  },
  filterTextActive: {
    color: colors.white
  },
  section: {
    gap: spacing.md
  }
});
