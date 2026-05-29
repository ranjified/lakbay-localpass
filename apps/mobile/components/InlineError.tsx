import { StyleSheet, Text } from "react-native";

import { colors, typography } from "@/constants/theme";

export function InlineError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <Text accessibilityRole="alert" style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    ...typography.label
  }
});
