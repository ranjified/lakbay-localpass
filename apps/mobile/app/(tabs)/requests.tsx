import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { requestTypeLabels, type RequestType } from "@lakbay/shared";

import { AppScreen } from "@/components/AppScreen";
import { EmptyState } from "@/components/EmptyState";
import { InlineError } from "@/components/InlineError";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RequestCard } from "@/components/RequestCard";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useRequests } from "@/features/requests/use-requests";

type FieldConfig = {
  key: string;
  label: string;
  placeholder: string;
};

const requestTypes: RequestType[] = ["food_pasabay", "stay", "ride", "tour"];

const fieldsByType: Record<RequestType, FieldConfig[]> = {
  food_pasabay: [
    { key: "itemOrBundle", label: "Item or bundle", placeholder: "Budin bundle" },
    { key: "quantity", label: "Quantity", placeholder: "2" },
    { key: "pickupDate", label: "Pickup date", placeholder: "2026-06-08" },
    { key: "pickupTime", label: "Pickup time", placeholder: "10:00 AM" },
    { key: "notes", label: "Notes", placeholder: "Pickup near Calle Budin" }
  ],
  stay: [
    { key: "checkInDate", label: "Check in date", placeholder: "2026-06-08" },
    { key: "checkOutDate", label: "Check out date", placeholder: "2026-06-09" },
    { key: "guestCount", label: "Number of guests", placeholder: "4" },
    { key: "preferredArea", label: "Preferred area", placeholder: "Poblacion" },
    { key: "budgetRange", label: "Budget range", placeholder: "1500-2500" },
    { key: "notes", label: "Notes", placeholder: "Family room if available" }
  ],
  ride: [
    { key: "pickupPoint", label: "Pickup point", placeholder: "Tayabas Terminal" },
    { key: "destination", label: "Destination", placeholder: "Basilica" },
    { key: "date", label: "Date", placeholder: "2026-06-08" },
    { key: "time", label: "Time", placeholder: "9:00 AM" },
    { key: "passengerCount", label: "Number of passengers", placeholder: "3" },
    { key: "notes", label: "Notes", placeholder: "Light baggage" }
  ],
  tour: [
    { key: "preferredRoute", label: "Preferred route", placeholder: "Heritage and Faith Walk" },
    { key: "date", label: "Date", placeholder: "2026-06-08" },
    { key: "groupSize", label: "Group size", placeholder: "6" },
    { key: "guidePreference", label: "Guide preference", placeholder: "Heritage storyteller" },
    { key: "notes", label: "Notes", placeholder: "Student-friendly story focus" }
  ]
};

export default function RequestsScreen() {
  const { requests, createRequest, validateRequestDetails } = useRequests();
  const [selectedType, setSelectedType] = useState<RequestType>("food_pasabay");
  const [details, setDetails] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmation, setConfirmation] = useState<string | undefined>();
  const fields = useMemo(() => fieldsByType[selectedType], [selectedType]);

  function updateField(key: string, value: string) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function submitRequest() {
    const result = validateRequestDetails(selectedType, details);
    setErrors(result.errors);
    setConfirmation(undefined);

    if (!result.valid) {
      return;
    }

    const request = createRequest({
      type: selectedType,
      details,
      title: `${requestTypeLabels[selectedType]} inquiry`
    });
    setDetails({});
    setConfirmation(`${request.title} submitted. Open the status card below to view the timeline.`);
  }

  return (
    <AppScreen accessibilityLabel="Tourist request center">
      <View style={styles.hero}>
        <Text style={styles.title}>Requests</Text>
        <Text style={styles.body}>This MVP creates demo inquiries only. No payment, dispatch, or confirmed booking is processed.</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Request type" />
        <View style={styles.typeGrid}>
          {requestTypes.map((type) => {
            const active = selectedType === type;
            return (
              <Pressable
                accessibilityRole="button"
                key={type}
                onPress={() => {
                  setSelectedType(type);
                  setDetails({});
                  setErrors({});
                  setConfirmation(undefined);
                }}
                style={[styles.typeButton, active && styles.typeButtonActive]}
              >
                <Text style={[styles.typeText, active && styles.typeTextActive]}>{requestTypeLabels[type]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title={`${requestTypeLabels[selectedType]} form`} />
        {fields.map((field) => (
          <View key={field.key} style={styles.field}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              accessibilityLabel={field.label}
              onChangeText={(value) => updateField(field.key, value)}
              placeholder={field.placeholder}
              placeholderTextColor={colors.mutedText}
              style={styles.input}
              value={details[field.key] ?? ""}
            />
            <InlineError message={errors[field.key]} />
          </View>
        ))}
        {confirmation ? <Text style={styles.confirmation}>{confirmation}</Text> : null}
        <PrimaryButton onPress={submitRequest}>Submit inquiry</PrimaryButton>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Request history" action={`${requests.length} saved`} />
        {requests.length > 0 ? (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} onPress={() => router.push(`/request/${request.id}`)} />
          ))
        ) : (
          <EmptyState title="No requests yet" message="Submit a demo inquiry to see its status timeline here." />
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
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  typeButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  typeButtonActive: {
    backgroundColor: colors.heritage,
    borderColor: colors.heritage
  },
  typeText: {
    color: colors.heritage,
    ...typography.label
  },
  typeTextActive: {
    color: colors.white
  },
  field: {
    gap: spacing.xs
  },
  label: {
    color: colors.text,
    ...typography.label
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    ...typography.body
  },
  confirmation: {
    color: colors.heritage,
    ...typography.body
  }
});
