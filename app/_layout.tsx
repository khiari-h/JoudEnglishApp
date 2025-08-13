import { useFonts } from "expo-font";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppProvider from "../src/contexts/AppProvider";
import { LockProvider, useLock } from "../src/contexts/LockContext";
import LockScreen from "../src/screens/Lock/LockScreen";
import useRouteActivityTracker from "../src/hooks/useRouteActivityTracker";

// Keep native splash visible until fonts and app context are ready
try {
  // Calling multiple times is safe; SDK will no-op after first
  preventAutoHideAsync();
} catch (e) {
  // no-op
}

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
    return null; // Splash reste visible pendant le chargement des polices
  }

  return (
    <SafeAreaProvider>
      <LockProvider>
        <AppProvider>
          {/* AppProvider inclut ThemeProvider + SettingsProvider + ProgressProvider */}
          <LockGate>
            <Stack screenOptions={{ headerShown: false }} />
          </LockGate>
          <StatusBar style="auto" />
        </AppProvider>
      </LockProvider>
    </SafeAreaProvider>
  );
}

function LockGate({ children }: { children: React.ReactNode }) {
  const { isEnabled, isLocked, isLoading } = useLock();
  if (isLoading) return null; // keep splash
  if (isEnabled && isLocked) return <LockScreen />;
  return children as any;
}
