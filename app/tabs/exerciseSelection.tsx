// app/(tabs)/exerciseSelection.tsx
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useCurrentLevel } from "../../src/contexts/CurrentLevelContext";
import ExerciseSelection from "../../src/screens/ExerciseSelection";

export default function ExerciseSelectionScreen() {
  const route = useRoute();
  const router = useRouter();
  const { currentLevel } = useCurrentLevel();

  useEffect(() => {
    // Si le paramètre 'level' est absent, on redirige automatiquement
    // @ts-ignore
    if (!route?.params?.level && currentLevel) {
      router.replace(`/tabs/exerciseSelection?level=${currentLevel}`);
    }
  }, [route, currentLevel, router]);

  return <ExerciseSelection route={route} />;
}
