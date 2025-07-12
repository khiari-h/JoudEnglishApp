import { useRoute } from "@react-navigation/native";
import GrammarExercise from "../../src/screens/exercises/grammar";

export default function GrammarExerciseScreen() {
  const route = useRoute();
  return <GrammarExercise route={route} />;
}
