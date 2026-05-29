import type { RequestStatusStep } from "@lakbay/shared";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

export function StatusTimeline({ steps }: { steps: RequestStatusStep[] }) {
  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <View key={step.status} style={styles.row}>
          <View style={[styles.dot, step.completed && styles.dotDone]} />
          <View style={styles.copy}>
            <Text style={styles.label}>{step.label}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  row: {
    flexDirection: "row",
    gap: spacing.md
  },
  dot: {
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    height: 14,
    marginTop: 4,
    width: 14
  },
  dotDone: {
    backgroundColor: colors.heritage
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  },
  label: {
    color: colors.text,
    ...typography.label
  },
  description: {
    color: colors.mutedText,
    ...typography.body
  }
});
