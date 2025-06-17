import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProgressProvider } from "../src/contexts/ProgressContext";
import useRouteActivityTracker from "../src/hooks/useRouteActivityTracking"; // ← AJOUT

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useRouteActivityTracker(); // ← AJOUT - Une seule ligne !

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
      <ProgressProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </ProgressProvider>
    </SafeAreaProvider>
  );
}