import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Masque l'écran de démarrage une fois les polices chargées
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Attendre le chargement des polices avant de rendre le contenu
  }

  return (
    <>
      <Stack>
        {/* Gère la navigation vers les onglets */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Écran Not Found */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
