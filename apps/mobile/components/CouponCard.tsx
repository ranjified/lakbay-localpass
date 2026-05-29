import type { Coupon } from "@lakbay/shared";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/constants/theme";
import { SecondaryButton } from "./SecondaryButton";

type CouponCardProps = {
  coupon: Coupon;
  unlocked: boolean;
  onClaim?: () => void;
};

export function CouponCard({ coupon, unlocked, onClaim }: CouponCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{coupon.title}</Text>
      <Text style={styles.description}>{coupon.description}</Text>
      <Text style={styles.meta}>{unlocked ? "Available" : `${coupon.pointsRequired} points required`}</Text>
      {unlocked && !coupon.claimed && onClaim ? <SecondaryButton onPress={onClaim}>Claim coupon</SecondaryButton> : null}
      {coupon.claimed ? <Text style={styles.claimed}>Claimed</Text> : null}
    </View>
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
  title: {
    color: colors.text,
    ...typography.label
  },
  description: {
    color: colors.mutedText,
    ...typography.body
  },
  meta: {
    color: colors.reward,
    ...typography.label
  },
  claimed: {
    color: colors.heritage,
    ...typography.label
  }
});
