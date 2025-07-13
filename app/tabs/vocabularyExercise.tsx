import { useRoute } from "@react-navigation/native";


export default function VocabularyExerciseScreen() {
  const route = useRoute();
  return <VocabularyExercise route={route} />;
}
