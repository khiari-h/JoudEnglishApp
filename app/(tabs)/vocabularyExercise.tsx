import { useRoute } from "@react-navigation/native";
import VocabularyExercise from "../../src/screens/exercises/vocabulary";

export default function VocabularyExerciseScreen() {
  const route = useRoute();
  return <VocabularyExercise route={route} />;
}
