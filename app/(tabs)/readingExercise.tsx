import { useRoute } from "@react-navigation/native";
import Reading from "@/src/screens/exercises/reading";

export default function ReadingExerciseScreen() {
  const route = useRoute();
  return <Reading route={route} />;
}