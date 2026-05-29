import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, layout, spacing, typography } from "@/constants/theme";

export default function RequestsScreen() {
  return (
    <ScrollView
      accessibilityLabel="Requests route verification screen"
      contentContainerStyle={styles.content}
    >
      <View accessible accessibilityRole="summary" style={styles.panel}>
        <Text style={styles.title}>Requests</Text>
        <Text style={styles.body}>
          The requests tab is ready for tourist service inquiries and status tracking.
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
