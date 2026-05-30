import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { demoQrCodes, destinations, getQrCheckInResult } from "@lakbay/shared";

import { AppScreen } from "@/components/AppScreen";
import { InlineError } from "@/components/InlineError";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionHeader } from "@/components/SectionHeader";
import { colors, radius, spacing, typography } from "@/constants/theme";
import { useLocalPass } from "@/features/localpass/localpass-context";

export default function ScanScreen() {
  const { state, addCheckIn } = useLocalPass();
  const [qrInput, setQrInput] = useState("");
  const [message, setMessage] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  function submitQr(value = qrInput) {
    const normalized = value.trim();
    setError(undefined);
    setMessage(undefined);

    if (!normalized) {
      setError("Enter a demo QR code to unlock a Tayabas story.");
      return;
    }

    const result = getQrCheckInResult(normalized, state.checkIns, destinations);
    if (result.status === "invalid") {
      setError("That QR code is not recognized. Try one of the demo QR options below.");
      return;
    }

    if (result.status === "duplicate") {
      setMessage(`Already visited: ${result.destination.name}. No additional points were added.`);
      return;
    }

    addCheckIn({
      id: `checkin-${result.destination.id}-${Date.now()}`,
      destinationId: result.destination.id,
      qrCode: normalized,
      pointsAwarded: result.pointsAwarded,
      checkedInAt: new Date().toISOString()
    });
    setQrInput(normalized);
    setMessage(`Story unlocked: ${result.destination.name}. You earned ${result.pointsAwarded} LocalPass points.`);
  }

  return (
    <AppScreen accessibilityLabel="Scan QR LocalPass check in">
      <View style={styles.hero}>
        <Text style={styles.title}>Scan</Text>
        <Text style={styles.body}>
          Lakbay LocalPass uses QR scanning only to unlock Tayabas stories and record demo check ins. You can also use manual demo QR entry.
        </Text>
      </View>

      <View style={styles.cameraPanel}>
        <Text style={styles.cameraTitle}>Camera-ready QR area</Text>
        <Text style={styles.cameraText}>Native camera scanning can be added here later. For this MVP, manual demo QR entry works now.</Text>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Manual demo QR" />
        <TextInput
          accessibilityLabel="Demo QR code input"
          autoCapitalize="characters"
          onChangeText={setQrInput}
          placeholder="LLP:TAYABAS:BASILICA"
          placeholderTextColor={colors.mutedText}
          style={styles.input}
          value={qrInput}
        />
        <InlineError message={error} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <PrimaryButton onPress={() => submitQr()}>Check in</PrimaryButton>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Demo QR options" />
        <View style={styles.qrList}>
          {demoQrCodes.map((code) => (
            <Pressable
              accessibilityRole="button"
              key={code}
              onPress={() => {
                setQrInput(code);
                submitQr(code);
              }}
              style={styles.qrButton}
            >
              <Text style={styles.qrText}>{code}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Check-in history" action={`${state.checkIns.length} visits`} />
        {state.checkIns.length > 0 ? (
          state.checkIns.map((checkIn) => {
            const destination = destinations.find((item) => item.id === checkIn.destinationId);
            return (
              <View key={checkIn.id} style={styles.historyItem}>
                <Text style={styles.historyTitle}>{destination?.name ?? checkIn.destinationId}</Text>
                <Text style={styles.historyMeta}>
                  {checkIn.pointsAwarded} points · {new Date(checkIn.checkedInAt).toLocaleString()}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.body}>No check-ins yet. Try a demo QR code above.</Text>
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
  cameraPanel: {
    backgroundColor: colors.heritage,
    borderRadius: radius.lg,
    gap: spacing.sm,
    minHeight: 180,
    padding: spacing.lg
  },
  cameraTitle: {
    color: colors.white,
    ...typography.heading
  },
  cameraText: {
    color: colors.white,
    opacity: 0.88,
    ...typography.body
  },
  section: {
    gap: spacing.md
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
  message: {
    color: colors.heritage,
    ...typography.body
  },
  qrList: {
    gap: spacing.sm
  },
  qrButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md
  },
  qrText: {
    color: colors.heritage,
    ...typography.label
  },
  historyItem: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md
  },
  historyTitle: {
    color: colors.text,
    ...typography.label
  },
  historyMeta: {
    color: colors.mutedText,
    ...typography.label
  }
});
