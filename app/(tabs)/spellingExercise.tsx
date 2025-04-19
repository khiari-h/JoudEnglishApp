import { useRoute } from "@react-navigation/native";
import Spelling from "@/src/screens/exercises/spelling";

export default function SpellingExerciseScreen() {
  const route = useRoute();
  return <Spelling route={route} />;
}