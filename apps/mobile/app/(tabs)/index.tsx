import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/AppScreen";
import { DestinationCard } from "@/components/DestinationCard";
import { EmptyState } from "@/components/EmptyState";
import { PointsCard } from "@/components/PointsCard";
import { QuickActionCard } from "@/components/QuickActionCard";
import { RouteCard } from "@/components/RouteCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, spacing, typography } from "@/constants/theme";
import { useDestinations } from "@/features/destinations/use-destinations";
import { useProfile } from "@/features/profile/use-profile";

export default function HomeScreen() {
  const { featuredDestinations, suggestedRoutes, isSaved, saveDestination, removeDestination } = useDestinations();
  const { profile, tripSummary, recentActivity } = useProfile();
  const featuredRoute = suggestedRoutes[0];

  return (
    <AppScreen accessibilityLabel="Tourist home dashboard">
      <View style={styles.hero}>
        <Text style={styles.greeting}>Hi, {profile.name}</Text>
        <Text style={styles.title}>Your Tayabas trip is ready.</Text>
        <Text style={styles.body}>Save stops, scan QR stories, and track every LocalPass reward from one pocket guide.</Text>
      </View>

      <PointsCard points={tripSummary.points} savedCount={tripSummary.savedCount} checkInCount={tripSummary.checkInCount} />

      {featuredRoute ? (
        <View style={styles.section}>
          <SectionHeader title="Featured route" />
          <RouteCard route={featuredRoute} />
        </View>
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Quick actions" />
        <View style={styles.actions}>
          <QuickActionCard label="Scan QR" hint="Unlock a story" onPress={() => router.push("/scan")} />
          <QuickActionCard label="Explore places" hint="Find stops" onPress={() => router.push("/explore")} />
          <QuickActionCard label="Request pasalubong" hint="Send inquiry" onPress={() => router.push("/requests")} />
          <QuickActionCard label="View LocalPass" hint="Points wallet" onPress={() => router.push("/pass")} />
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Saved trip" action={`${tripSummary.savedCount} stops`} />
        {tripSummary.savedDestinations.length > 0 ? (
          <View style={styles.savedList}>
            {tripSummary.savedDestinations.slice(0, 3).map((destination) => (
              <Text key={destination.id} style={styles.savedItem}>
                {destination.name}
              </Text>
            ))}
          </View>
        ) : (
          <EmptyState title="No saved places yet" message="Explore Tayabas and save three places to build your first route." />
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Highlighted destinations" />
        {featuredDestinations.slice(0, 2).map((destination) => {
          const saved = isSaved(destination.id);
          return (
            <DestinationCard
              key={destination.id}
              destination={destination}
              saved={saved}
              onPress={() => router.push(`/destination/${destination.id}`)}
              onToggleSaved={() => (saved ? removeDestination(destination.id) : saveDestination(destination.id))}
            />
          );
        })}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Recent activity" />
        {recentActivity.length > 0 ? (
          recentActivity.map((activity) => (
            <Text key={activity.id} style={styles.activity}>
              {activity.label}: {activity.detail}
            </Text>
          ))
        ) : (
          <EmptyState title="Activity starts here" message="Save a place, scan a QR, or submit an inquiry to fill your trip log." />
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: spacing.sm
  },
  greeting: {
    color: colors.heritage,
    ...typography.label
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
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  savedList: {
    gap: spacing.sm
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
