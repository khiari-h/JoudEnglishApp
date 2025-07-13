import { useRoute } from "@react-navigation/native";


export default function PhrasesExerciseScreen() {
  const route = useRoute();
  return <PhrasesExercise route={route} />;
}
