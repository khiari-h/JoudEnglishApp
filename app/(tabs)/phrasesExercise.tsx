import { useRoute } from "@react-navigation/native";
import PhrasesExercise from "@/src/screens/exercises/phrases";

export default function PhrasesExerciseScreen() {
  const route = useRoute();
  return <PhrasesExercise route={route} />;
}
