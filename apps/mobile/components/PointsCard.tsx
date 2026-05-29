import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";

type PointsCardProps = {
  points: number;
  savedCount: number;
  checkInCount: number;
};

export function PointsCard({ points, savedCount, checkInCount }: PointsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>LocalPass points</Text>
      <Text style={styles.points}>{points}</Text>
      <Text style={styles.detail}>
        {savedCount} saved stops · {checkInCount} check-ins
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.reward,
    borderRadius: radius.lg,
    gap: spacing.xs,
    padding: spacing.lg
  },
  label: {
    color: colors.text,
    ...typography.label
  },
  points: {
    color: colors.text,
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 50
  },
  detail: {
    color: colors.text,
    ...typography.body
  }
});
