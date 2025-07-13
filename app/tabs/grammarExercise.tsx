import { useRoute } from "@react-navigation/native";


export default function GrammarExerciseScreen() {
  const route = useRoute();
  return <GrammarExercise route={route} />;
}
