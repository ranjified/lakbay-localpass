import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/AppScreen";
import { EmptyState } from "@/components/EmptyState";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SecondaryButton } from "@/components/SecondaryButton";
import { SectionHeader } from "@/components/SectionHeader";
import { TagPill } from "@/components/TagPill";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useDestinations } from "@/features/destinations/use-destinations";
import { useLocalPass } from "@/features/localpass/localpass-context";

export default function DestinationDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const destinationId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { getDestination, isSaved, saveDestination, removeDestination } = useDestinations();
  const { state } = useLocalPass();
  const destination = destinationId ? getDestination(destinationId) : undefined;

  if (!destination) {
    return (
      <AppScreen>
        <EmptyState title="Destination not found" message="Return to Explore and choose another Tayabas stop." />
        <SecondaryButton onPress={() => router.back()}>Go back</SecondaryButton>
      </AppScreen>
    );
  }

  const saved = isSaved(destination.id);
  const unlocked = state.unlockedStoryIds.includes(destination.id);

  return (
    <AppScreen accessibilityLabel={`${destination.name} details`}>
      <View style={styles.hero}>
        <Text style={styles.category}>{destination.category}</Text>
        <Text style={styles.title}>{destination.name}</Text>
        <Text style={styles.location}>{destination.locationLabel}</Text>
      </View>

      <View style={styles.tags}>
        {destination.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title="About this stop" />
        <Text style={styles.body}>{destination.description}</Text>
      </View>

      <View style={styles.storyBox}>
        <SectionHeader title={unlocked ? "Unlocked story" : "Story preview"} />
        <Text style={styles.body}>{unlocked ? destination.story : `${destination.story.slice(0, 92)}... Scan the QR to unlock the full story.`}</Text>
        <Text style={styles.points}>{destination.points} LocalPass points available</Text>
        {destination.qrCode ? <Text style={styles.qr}>QR: {destination.qrCode}</Text> : null}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Nearby local suggestions" />
        <Text style={styles.body}>Pair this stop with nearby food, pasalubong, rides, stays, or a guided route from the Requests tab.</Text>
      </View>

      {saved ? (
        <SecondaryButton onPress={() => removeDestination(destination.id)}>Remove from trip</SecondaryButton>
      ) : (
        <PrimaryButton onPress={() => saveDestination(destination.id)}>Save to trip</PrimaryButton>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  category: {
    color: colors.heritage,
    textTransform: "capitalize",
    ...typography.label
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  location: {
    color: colors.mutedText,
    ...typography.body
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  section: {
    gap: spacing.md
  },
  body: {
    color: colors.mutedText,
    ...typography.body
  },
  storyBox: {
    backgroundColor: colors.surface,
    borderColor: colors.reward,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg
  },
  points: {
    color: colors.reward,
    ...typography.label
  },
  qr: {
    color: colors.heritage,
    ...typography.label
  }
});
