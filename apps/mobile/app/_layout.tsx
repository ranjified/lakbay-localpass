import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants/theme";
import { LocalPassProvider } from "@/features/localpass/localpass-context";

export default function RootLayout() {
  return (
    <LocalPassProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false
        }}
      />
      <StatusBar style="dark" />
    </LocalPassProvider>
  );
}
