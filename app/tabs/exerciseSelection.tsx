// app/(tabs)/exerciseSelection.tsx
import { useRoute } from "@react-navigation/native";


export default function ExerciseSelectionScreen() {
  const route = useRoute();
  // ❌ SUPPRIMÉ : console.log("Route in ExerciseSelectionScreen:", route);

  return <ExerciseSelection route={route} />;
}
