import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/constants/theme";

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between"
  },
  title: {
    color: colors.text,
    ...typography.heading
  },
  action: {
    color: colors.heritage,
    ...typography.label
  }
});
