import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

export function TagPill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  label: {
    color: colors.heritage,
    ...typography.label
  }
});
