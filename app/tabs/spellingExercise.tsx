import { useRoute } from "@react-navigation/native";


export default function SpellingExerciseScreen() {
  const route = useRoute();
  return <Spelling route={route} />;
}
