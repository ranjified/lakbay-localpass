import type { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors, layout, radius, spacing, typography } from "@/constants/theme";

type ButtonProps = PropsWithChildren<{
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}>;

export function SecondaryButton({ children, onPress, disabled, accessibilityLabel }: ButtonProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && !disabled && styles.pressed]}
    >
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: layout.tapTarget,
    paddingHorizontal: spacing.lg
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    opacity: 0.76
  },
  label: {
    color: colors.heritage,
    ...typography.label
  }
});
