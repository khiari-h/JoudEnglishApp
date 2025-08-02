import { useFonts } from "expo-font";
import { hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "../src/contexts/AppProvider";
import useRouteActivityTracker from "../src/hooks/useRouteActivityTracker";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useRouteActivityTracker();

  useEffect(() => {
    if (loaded) {
      hideAsync().catch(err =>
        console.warn("[RootLayout] hideAsync failed:", err)
      );
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        {/* AppProvider inclut ThemeProvider + SettingsProvider + ProgressProvider */}
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </AppProvider>
    </SafeAreaProvider>
  );
}
