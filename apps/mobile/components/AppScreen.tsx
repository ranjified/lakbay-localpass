import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { ScrollViewProps, ViewStyle } from "react-native";

import { colors, layout, spacing } from "@/constants/theme";

type AppScreenProps = PropsWithChildren<
  ScrollViewProps & {
    contentStyle?: ViewStyle;
  }
>;

export function AppScreen({ children, contentStyle, ...props }: AppScreenProps) {
  return (
    <ScrollView
      {...props}
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={[styles.content, contentStyle]}
    >
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background
  },
  content: {
    flexGrow: 1,
    padding: layout.screenPadding
  },
  inner: {
    gap: spacing.xl
  }
});
