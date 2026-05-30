import { destinations, calculateBadges, calculateUnlockedCoupons } from "@lakbay/shared";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/AppScreen";
import { BadgeCard } from "@/components/BadgeCard";
import { CouponCard } from "@/components/CouponCard";
import { EmptyState } from "@/components/EmptyState";
import { PointsCard } from "@/components/PointsCard";
import { RequestCard } from "@/components/RequestCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, spacing, typography } from "@/constants/theme";
import { useDestinations } from "@/features/destinations/use-destinations";
import { useLocalPass } from "@/features/localpass/localpass-context";
import { useProfile } from "@/features/profile/use-profile";

export default function PassScreen() {
  const { state, claimCoupon } = useLocalPass();
  const { savedDestinations } = useDestinations();
  const { tripSummary, recentActivity } = useProfile();
  const badges = calculateBadges(
    {
      savedDestinationIds: state.savedDestinations.map((item) => item.destinationId),
      checkIns: state.checkIns,
      requests: state.requests
    },
    destinations
  );
  const unlockedCouponIds = new Set(
    calculateUnlockedCoupons(state.points, state.checkIns.length)
      .filter((coupon) => coupon.claimed)
      .map((coupon) => coupon.id)
  );

  return (
    <AppScreen accessibilityLabel="LocalPass wallet">
      <View style={styles.hero}>
        <Text style={styles.title}>Pass</Text>
        <Text style={styles.body}>Your LocalPass wallet collects Tayabas points, badges, coupons, check-ins, saved stops, and request activity.</Text>
      </View>

      <PointsCard points={state.points} savedCount={tripSummary.savedCount} checkInCount={tripSummary.checkInCount} />

      <View style={styles.section}>
        <SectionHeader title="Badges" action={`${badges.filter((badge) => badge.unlocked).length}/${badges.length}`} />
        <View style={styles.grid}>
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Coupons" />
        {state.coupons.map((coupon) => {
          const unlocked = unlockedCouponIds.has(coupon.id);
          return (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              unlocked={unlocked}
              onClaim={unlocked ? () => claimCoupon(coupon.id) : undefined}
            />
          );
        })}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Check-in history" action={`${state.checkIns.length} visits`} />
        {state.checkIns.length > 0 ? (
          state.checkIns.map((checkIn) => {
            const destination = destinations.find((item) => item.id === checkIn.destinationId);
            return (
              <View key={checkIn.id} style={styles.row}>
                <Text style={styles.rowTitle}>{destination?.name ?? checkIn.destinationId}</Text>
                <Text style={styles.rowMeta}>{checkIn.pointsAwarded} points · {new Date(checkIn.checkedInAt).toLocaleString()}</Text>
              </View>
            );
          })
        ) : (
          <EmptyState title="No check-ins yet" message="Scan a demo QR code to unlock a story and start your history." />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Saved itinerary" action={`${savedDestinations.length} stops`} />
        {savedDestinations.length > 0 ? (
          savedDestinations.map((destination) => (
            <Text key={destination.id} style={styles.savedItem}>{destination.name}</Text>
          ))
        ) : (
          <EmptyState title="No saved itinerary" message="Save three destinations from Explore to complete the starter route." />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Request activity" action={`${state.requests.length} requests`} />
        {state.requests.length > 0 ? (
          state.requests.slice(0, 3).map((request) => <RequestCard key={request.id} request={request} onPress={() => {}} />)
        ) : (
          <EmptyState title="No request activity" message="Submit a food, stay, ride, or tour inquiry to fill this section." />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recent activity" />
        {recentActivity.length > 0 ? (
          recentActivity.map((activity) => (
            <Text key={activity.id} style={styles.activity}>{activity.label}: {activity.detail}</Text>
          ))
        ) : (
          <Text style={styles.body}>Your activity will appear after saves, scans, requests, and coupon claims.</Text>
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  body: {
    color: colors.mutedText,
    ...typography.body
  },
  section: {
    gap: spacing.md
  },
  grid: {
    gap: spacing.sm
  },
  row: {
    gap: spacing.xs
  },
  rowTitle: {
    color: colors.text,
    ...typography.label
  },
  rowMeta: {
    color: colors.mutedText,
    ...typography.label
  },
  savedItem: {
    color: colors.text,
    ...typography.body
  },
  activity: {
    color: colors.mutedText,
    ...typography.body
  }
});
