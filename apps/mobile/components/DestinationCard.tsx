import type { Destination } from "@lakbay/shared";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadow, spacing, typography } from "@/constants/theme";
import { TagPill } from "./TagPill";

type DestinationCardProps = {
  destination: Destination;
  saved: boolean;
  unlocked?: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function DestinationCard({ destination, saved, unlocked, onPress, onToggleSaved }: DestinationCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.category}>{destination.category}</Text>
          <Text style={styles.name}>{destination.name}</Text>
        </View>
        <Pressable accessibilityRole="button" onPress={onToggleSaved} style={styles.saveButton}>
          <Text style={styles.saveLabel}>{saved ? "Saved" : "Save"}</Text>
        </Pressable>
      </View>
      <Text style={styles.description}>{destination.description}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{destination.locationLabel}</Text>
        <Text style={styles.points}>{destination.points} pts</Text>
      </View>
      <View style={styles.tags}>
        {destination.tags.slice(0, 3).map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </View>
      <Text style={styles.story}>{unlocked ? "Story unlocked" : destination.qrCode ? "QR story available" : "Story preview"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
    ...shadow.card
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  },
  category: {
    color: colors.heritage,
    textTransform: "capitalize",
    ...typography.label
  },
  name: {
    color: colors.text,
    ...typography.heading
  },
  saveButton: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  saveLabel: {
    color: colors.heritage,
    ...typography.label
  },
  description: {
    color: colors.mutedText,
    ...typography.body
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  meta: {
    color: colors.mutedText,
    ...typography.label
  },
  points: {
    color: colors.reward,
    ...typography.label
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  story: {
    color: colors.heritage,
    ...typography.label
  }
});
