import type { LocalPassBadge } from "@lakbay/shared";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

export function BadgeCard({ badge }: { badge: LocalPassBadge }) {
  return (
    <View style={[styles.card, badge.unlocked ? styles.unlocked : styles.locked]}>
      <Text style={styles.name}>{badge.name}</Text>
      <Text style={styles.description}>{badge.description}</Text>
      <Text style={styles.state}>{badge.unlocked ? "Unlocked" : "Locked"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    gap: spacing.xs,
    padding: spacing.md
  },
  unlocked: {
    backgroundColor: colors.surface,
    borderColor: colors.reward,
    borderWidth: 1
  },
  locked: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1
  },
  name: {
    color: colors.text,
    ...typography.label
  },
  description: {
    color: colors.mutedText,
    ...typography.label
  },
  state: {
    color: colors.heritage,
    ...typography.label
  }
});
