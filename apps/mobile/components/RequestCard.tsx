import { requestTypeLabels, type ServiceRequest } from "@lakbay/shared";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type RequestCardProps = {
  request: ServiceRequest;
  onPress: () => void;
};

export function RequestCard({ request, onPress }: RequestCardProps) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{requestTypeLabels[request.type]}</Text>
        <Text style={styles.status}>{request.status.replaceAll("_", " ")}</Text>
      </View>
      <Text style={styles.title}>{request.title}</Text>
      <Text style={styles.date}>{new Date(request.createdAt).toLocaleDateString()}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.md
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  type: {
    color: colors.heritage,
    ...typography.label
  },
  status: {
    color: colors.reward,
    textTransform: "capitalize",
    ...typography.label
  },
  title: {
    color: colors.text,
    ...typography.heading
  },
  date: {
    color: colors.mutedText,
    ...typography.label
  }
});
