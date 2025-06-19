// app/(tabs)/exerciseSelection.tsx
import { useRoute } from "@react-navigation/native";
import ExerciseSelection from "../../src/screens/ExerciseSelection";

export default function ExerciseSelectionScreen() {
  const route = useRoute();
  // ❌ SUPPRIMÉ : console.log("Route in ExerciseSelectionScreen:", route);

  return <ExerciseSelection route={route} />;
}
