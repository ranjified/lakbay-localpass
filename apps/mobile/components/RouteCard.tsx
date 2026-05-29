import type { SuggestedRoute } from "@lakbay/shared";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";
import { TagPill } from "./TagPill";

export function RouteCard({ route }: { route: SuggestedRoute }) {
  return (
    <View style={styles.card}>
      <Text style={styles.duration}>{route.estimatedDuration}</Text>
      <Text style={styles.title}>{route.title}</Text>
      <Text style={styles.description}>{route.description}</Text>
      <View style={styles.tags}>
        {route.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.heritage,
    borderRadius: radius.lg,
    gap: spacing.sm,
    padding: spacing.lg
  },
  duration: {
    color: colors.reward,
    ...typography.label
  },
  title: {
    color: colors.white,
    ...typography.heading
  },
  description: {
    color: colors.white,
    opacity: 0.86,
    ...typography.body
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
