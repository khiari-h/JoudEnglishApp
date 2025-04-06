import { useRoute } from "@react-navigation/native";
import ExerciceSelection from "@/src/screens/ExerciseSelection";

export default function ExerciceSelectionScreen() {
  const route = useRoute();
  return <ExerciceSelection route={route} />;
}