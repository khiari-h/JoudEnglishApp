import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";

import "react-native-reanimated";



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