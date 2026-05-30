import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { requestTypeLabels } from "@lakbay/shared";

import { AppScreen } from "@/components/AppScreen";
import { EmptyState } from "@/components/EmptyState";
import { SecondaryButton } from "@/components/SecondaryButton";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusTimeline } from "@/components/StatusTimeline";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useRequests } from "@/features/requests/use-requests";

export default function RequestDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const requestId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { getRequest } = useRequests();
  const request = requestId ? getRequest(requestId) : undefined;

  if (!request) {
    return (
      <AppScreen>
        <EmptyState title="Request not found" message="Return to Requests and choose another saved inquiry." />
        <SecondaryButton onPress={() => router.back()}>Go back</SecondaryButton>
      </AppScreen>
    );
  }

  return (
    <AppScreen accessibilityLabel={`${request.title} status`}>
      <View style={styles.hero}>
        <Text style={styles.type}>{requestTypeLabels[request.type]}</Text>
        <Text style={styles.title}>{request.title}</Text>
        <Text style={styles.body}>Created {new Date(request.createdAt).toLocaleString()}</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Inquiry details" />
        {Object.entries(request.details).map(([key, value]) =>
          value ? (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailKey}>{key}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ) : null
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Status timeline" />
        <StatusTimeline steps={request.timeline} />
      </View>
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
  type: {
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
  detailRow: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  detailKey: {
    color: colors.heritage,
    ...typography.label
  },
  detailValue: {
    color: colors.text,
    ...typography.body
  }
});
