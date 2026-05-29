import { Pressable, StyleSheet, Text } from "react-native";

import { colors, layout, radius, spacing, typography } from "@/constants/theme";

type QuickActionCardProps = {
  label: string;
  hint: string;
  onPress: () => void;
};

export function QuickActionCard({ label, hint, onPress }: QuickActionCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: layout.tapTarget,
    padding: spacing.md,
    width: "48%"
  },
  label: {
    color: colors.text,
    ...typography.label
  },
  hint: {
    color: colors.mutedText,
    ...typography.label
  }
});
