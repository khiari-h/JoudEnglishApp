import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "../src/contexts/AppProvider"; // ← CHANGÉ: AppProvider au lieu de ProgressProvider
import useRouteActivityTracker from "../src/hooks/useRouteActivityTracker";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useRouteActivityTracker();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        {/* ← CHANGÉ: AppProvider qui inclut ThemeProvider + SettingsProvider + ProgressProvider */}
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </AppProvider>
    </SafeAreaProvider>
  );
}