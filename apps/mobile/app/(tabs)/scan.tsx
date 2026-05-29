import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, layout, spacing, typography } from "@/constants/theme";

export default function ScanScreen() {
  return (
    <ScrollView
      accessibilityLabel="Scan route verification screen"
      contentContainerStyle={styles.content}
    >
      <View accessible accessibilityRole="summary" style={styles.panel}>
        <Text style={styles.title}>Scan</Text>
        <Text style={styles.body}>
          The scan tab is ready for QR check-ins and manual demo code entry.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    flexGrow: 1,
    padding: layout.screenPadding
  },
  panel: {
    gap: spacing.md,
    paddingVertical: spacing.xl
  },
  title: {
    color: colors.text,
    ...typography.title
  },
  body: {
    color: colors.mutedText,
    ...typography.body
  }
});
