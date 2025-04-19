import { useRoute } from "@react-navigation/native";
import WordGames from "@/src/screens/exercises/word-games";

export default function WordGamesExerciseScreen() {
  const route = useRoute();
  return <WordGames route={route} />;
}