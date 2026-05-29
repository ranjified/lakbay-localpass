import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, layout, spacing, typography } from "@/constants/theme";

export default function ExploreScreen() {
  return (
    <ScrollView
      accessibilityLabel="Explore route verification screen"
      contentContainerStyle={styles.content}
    >
      <View accessible accessibilityRole="summary" style={styles.panel}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.body}>
          The explore tab is ready for destinations, routes, and saved trip planning.
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
